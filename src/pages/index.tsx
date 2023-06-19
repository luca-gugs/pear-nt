import { type NextPage } from "next";
import ProjectList from "~/components/ProjectList";
import { api } from "~/utils/api";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  return (
    <main className="relative	 min-h-screen bg-emerald-50">
      <Nav isHome={true} />
      <>
        <div className="flex h-[100vh] w-full justify-center px-4 pt-[10rem] md:px-10 lg:px-20 ">
          <div className="w-full max-w-[50rem]">
            <ProjectList />
          </div>
        </div>
      </>
    </main>
  );
};

export default Home;
