import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import PopUpButton from "~/components/PopUpButton";
import PostView from "~/components/PostView";
import { api } from "~/utils/api";
import Nav from "../components/Nav";
import LoadingSpinner from "~/components/LoadingSpinner";

const Home: NextPage = () => {
  const user = useUser();
  const { data } = api.posts.getAll.useQuery();
  // console.log("user: ", user?.user?.id);
  // let data = false;
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-screen">
        <Nav />

        <div className="relative flex h-full w-full flex-col bg-emerald-50 p-4 pt-[95px] md:flex-row lg:px-20 lg:py-6 lg:pt-[100px]">
          {data ? (
            data?.map((fullPost) => {
              return <PostView {...fullPost} key={fullPost.post.id} />;
            })
          ) : (
            <div className="flex h-[80%] w-full items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
        <PopUpButton />
      </main>
    </>
  );
};

export default Home;
