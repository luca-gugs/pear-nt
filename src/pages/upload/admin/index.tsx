import { SignUp, useUser } from "@clerk/nextjs";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Nav from "~/components/Nav";
import { api } from "~/utils/api";

const UploadAdminPage: NextPage<{ id?: string }> = (context) => {
  const { user } = useUser();
  const { data, isLoading } = api.docs.getAll.useQuery();
  console.log("keys: ", data, isLoading);

  return (
    <>
      <Head>{/* <title>{data}</title> */}</Head>

      <main className="relative	 min-h-screen">
        <Nav isHome={true} />
        <>
          <div className="relative flex h-full min-h-screen w-full flex-col flex-wrap items-center justify-center bg-emerald-50 p-4 pt-[95px] lg:px-20 lg:py-6 lg:pt-[100px]">
            {data &&
              data.map(({ ownerName, ownerId, email }) => {
                return (
                  <Link
                    href={`/upload/admin/${ownerId}`}
                    className="other-shadow flex items-center justify-between rounded-full bg-white p-4 font-bold"
                    key={email}
                  >
                    <p className="ml-2 text-lg">{ownerName}</p>
                    {/* {status === "missing" ? (
                  <div className="rounded-full border-2 border-solid  border-red-400 bg-red-200 px-4 py-2 text-sm font-bold">
                    Missing
                  </div>
                ) : status === "In Review" ? (
                  <div className="rounded-full border-2 border-solid  border-yellow-400 bg-yellow-200 px-4 py-2 text-sm font-bold">
                    In Review
                  </div>
                ) : status === "Approved" ? (
                  <div className="rounded-full border-2 border-solid  border-green-400 bg-green-200 px-4 py-2 text-sm font-bold">
                    Approved
                  </div>
                ) : (
                  <div>error</div>
                )} */}
                  </Link>
                );
              })}
          </div>
        </>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  //   const helpers = createServerSideHelpers({
  //     router: appRouter,
  //     ctx: { prisma, userId: null },
  //     transformer: superjson, // optional - adds superjson serialization
  //   });

  //   const id = context.params?.id;

  //   if (typeof id !== "string") throw new Error("No post id");
  //   //this allows us to prefetch the data and hydrate it through server side props
  //   await helpers.posts.getById.prefetch({ id });

  return {
    props: {
      context,
    },
  };
};

export default UploadAdminPage;
