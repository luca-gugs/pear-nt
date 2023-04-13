import { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForCLient = (user: User) => {
  console.log(user.username, user.firstName);
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
    const posts = await ctx.prisma.post.findMany({
      take: 20,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.ownerId),
        limit: 20,
      })
    ).map(filterUserForCLient);
    console.log("key", users);

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
});
