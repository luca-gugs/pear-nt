import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import LoadingSpinner from "~/components/LoadingSpinner";
import PopUpButton from "~/components/PopUpButton";
import { api } from "~/utils/api";
import Nav from "../components/Nav";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  // user for checking if active user is looking at own profile
  // const user = useUser();
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;

  console.log("dataL ", data);

  return (
    <>
      <Head>
        <title>{data?.username}</title>
      </Head>

      {/* Page Content */}
      <main className="relative	 min-h-screen">
        <Nav />
        <>
          <div className="relative flex h-full min-h-screen w-full flex-col flex-wrap bg-emerald-50 p-4 pt-[95px] md:flex-row lg:px-20 lg:py-6 lg:pt-[100px]">
            {/* {isLoading ? <LoadingSpinner /> : !data ? <h2>404</h2> : ""} */}
            {data?.username && <h1 className="text-3xl">{data?.username}</h1>}
          </div>
          <PopUpButton />
        </>
      </main>
    </>
  );
};
// import { createContext } from "server/context";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

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

export default ProfilePage;
