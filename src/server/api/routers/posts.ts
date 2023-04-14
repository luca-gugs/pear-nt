import { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const filterUserForCLient = (user: User) => {
  return {
    id: user.id,
    username: user.username
      ? `@${user.username}`
      : user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.emailAddresses[0]?.emailAddress,
    email: user.emailAddresses[0]?.emailAddress,
    profilePicture: user?.profileImageUrl,
  };
};

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  // prefix: "@upstash/ratelimit",
});

export const postsRouter = createTRPCRouter({
  //important to note that publicProcedures could be called by anyone
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.ownerId),
        limit: 20,
      })
    ).map(filterUserForCLient);

    return posts.map((post) => {
      const owner = users.find((user) => user.id === post.ownerId);
      if (!owner)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author For Post Not found",
        });
      return {
        post,
        owner,
      };
    });
    // return ctx.prisma.post.findMany();
  }),
  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ownerId = ctx.userId;

      const { success } = await ratelimit.limit(ownerId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.post.create({
        data: {
          ownerId: ownerId,
          content: input.content,
        },
      });

      return post;
    }),
});
