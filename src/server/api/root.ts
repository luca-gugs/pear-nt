import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { postsRouter } from "./routers/posts";
import { profileRouter } from "./routers/profile";
import { docsRouter } from "./routers/docs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  posts: postsRouter,
  profile: profileRouter,
  docs: docsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
