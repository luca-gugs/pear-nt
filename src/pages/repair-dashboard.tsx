import { type NextPage } from "next";
import LoadingSpinner from "~/components/LoadingSpinner";
import PopUpButton from "~/components/PopUpButton";
import PostView from "~/components/PostView";
import { api } from "~/utils/api";
import Nav from "../components/Nav";

const RepairDashboard: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  return (
    <main className="relative	 min-h-screen">
      <Nav />
      <>
        <div className="relative flex h-full min-h-screen w-full flex-col flex-wrap bg-emerald-50 p-4 pt-[95px] md:flex-row lg:px-20 lg:py-6 lg:pt-[100px]">
          {!isLoading && data && data.length > 0 ? (
            data?.map((fullPost) => {
              return <PostView {...fullPost} key={fullPost.post.id} />;
            })
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
        <PopUpButton />
      </>
    </main>
  );
};

export default RepairDashboard;
