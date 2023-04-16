import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import PopUpButton from "~/components/PopUpButton";
import { api } from "~/utils/api";
import Nav from "../../components/Nav";

const Home: NextPage = () => {
  //   const user = useUser();
  //   const { data, isLoading } = api.posts.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Post Page</title>
      </Head>

      {/* Page Content */}
      <main className="relative	 min-h-screen">
        <Nav />
        <>
          <div className="relative flex h-full min-h-screen w-full flex-col flex-wrap bg-emerald-50 p-4 pt-[95px] md:flex-row lg:px-20 lg:py-6 lg:pt-[100px]">
            Post View
          </div>
          <PopUpButton />
        </>
      </main>
    </>
  );
};

export default Home;
