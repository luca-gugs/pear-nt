import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import filterUserForClient from "~/server/helpers/filterUserForClient";
import { Post, UserDocs } from "@prisma/client";

// const addUserDataToPosts = async (posts: Post[]) => {
//   const users = (
//     await clerkClient.users.getUserList({
//       userId: posts.map((post) => post.ownerId),
//       limit: 20,
//     })
//   ).map(filterUserForClient);

//   return posts.map((post) => {
//     const owner = users.find((user) => user.id === post.ownerId);
//     if (!owner)
//       throw new TRPCError({
//         code: "INTERNAL_SERVER_ERROR",
//         message: "Author For Post Not found",
//       });
//     return {
//       post,
//       owner,
//     };
//   });
// };

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

export const docsRouter = createTRPCRouter({
  //important to note that publicProcedures could be called by anyone
  getAll: publicProcedure.query(async ({ ctx, input }) => {
    // if (input.username !== ctx.userId) {
    //   throw new TRPCError({ code: "FORBIDDEN" });
    // }

    const userDocs = await ctx.prisma.userDocs.findMany();
    console.log("userDocs", userDocs);

    if (!userDocs) throw new TRPCError({ code: "NOT_FOUND" });

    return userDocs;
    //   return (await addUserDataToPosts([post]))[0];
  }),

  getByUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.username !== ctx.userId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const userDoc = await ctx.prisma.userDocs.findUnique({
        where: { ownerId: input.username },
      });

      if (!userDoc) throw new TRPCError({ code: "NOT_FOUND" });

      return userDoc;
      //   return (await addUserDataToPosts([post]))[0];
    }),

  create: privateProcedure
    .input(
      z.object({
        ownerName: z.string().min(1).optional(),
        email: z.string().email(),
        type: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ownerId = ctx.userId;

      const { success } = await ratelimit.limit(ownerId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const user = await ctx.prisma.userDocs.create({
        data: {
          ownerId: ownerId,
          ownerName: input.ownerName,
          email: input.email,
          type: input.type,
        },
      });

      return user;
    }),

  update: privateProcedure
    .input(
      z.object({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // userDoc: z.any(),
        userDoc: z.object({}),
        ownerId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log("USERDOC: ", input.userDoc);
      const ownerId = ctx.userId;

      const { success } = await ratelimit.limit(ownerId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const updateUser = await ctx.prisma.userDocs.update({
        where: {
          ownerId: input.ownerId,
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: input.userDoc,
      });

      return updateUser;
    }),
});
