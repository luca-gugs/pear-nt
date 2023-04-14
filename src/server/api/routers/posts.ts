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

export const postsRouter = createTRPCRouter({
  //important to note that publicProcedures could be called by anyone
  getAll: publicProcedure.query(async ({ ctx }) => {
    console.log("ALPHA");
    const posts = await ctx.prisma.post.findMany({
      take: 20,
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
        content: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ownerId = ctx.userId;

      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.post.create({
        data: {
          ownerId: ownerId,
          content: input.content,
        },
      });
      console.log("post:", post);

      return post;
    }),
});
