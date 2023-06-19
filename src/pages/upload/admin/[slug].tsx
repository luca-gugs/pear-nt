import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import superjson from "superjson";
import DocStatusCard from "~/components/DocStatusCard";
import LoadingSpinner from "~/components/LoadingSpinner";
import Nav from "~/components/Nav";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

const UserUploadHome: NextPage<{ username: string }> = ({ username }) => {
  const { data, error, isLoading } = api.docs.getByUser.useQuery({
    username,
  });

  return (
    <>
      <Head>{/* <title>{data?.username}</title> */}</Head>

      {/* Page Content */}
      <main className="relative	 min-h-screen">
        <Nav isHome={true} />
        <>
          <div className="relative flex h-full min-h-screen w-full flex-col flex-wrap items-center justify-center bg-emerald-50 p-4 pt-[95px] lg:px-20 lg:py-6 lg:pt-[100px]">
            {isLoading ? (
              <LoadingSpinner />
            ) : data ? (
              <>
                <DocStatusCard admin={true} userDoc={data} />
              </>
            ) : error ? (
              <>Sorry We Couldn&apos;t find what you were looking for</>
            ) : (
              <>Unknown Error</>
            )}
          </div>
          {/* <PopUpButton /> */}
        </>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("No slug");
  //this allows us to prefetch the data and hydrate it through server side props
  await helpers.profile.getUserByUsername.prefetch({ username: slug });
  await helpers.docs.getByUser.prefetch({ username: slug });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      username: slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default UserUploadHome;
