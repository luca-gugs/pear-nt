import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import PopUpButton from "~/components/PopUpButton";
import { api } from "~/utils/api";
import Nav from "../../components/Nav";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  // user for checking if active user is looking at own profile
  // const user = useUser();

  const { data } = api.posts.getById.useQuery({
    id,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>{/* <title>{data}</title> */}</Head>

      {/* Page Content */}
      <main className="relative	 min-h-screen">
        <Nav />
        <>
          <div className="relative flex h-full min-h-screen w-full flex-col flex-wrap bg-emerald-50 p-4 pt-[95px] lg:px-20 lg:py-6 lg:pt-[100px]">
            <PostFullSize
              description={data.post.content}
              title={data.post.content.slice(0, 30)}
              ticketNumber={data.post.id}
            />
          </div>
          <PopUpButton />
        </>
      </main>
    </>
  );
};

import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import PostFullSize from "~/components/PostFullSize";

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("No post id");
  //this allows us to prefetch the data and hydrate it through server side props
  await helpers.posts.getById.prefetch({ id });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
