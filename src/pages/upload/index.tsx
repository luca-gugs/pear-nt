import { SignUp, useUser } from "@clerk/nextjs";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Nav from "~/components/Nav";
import { api } from "~/utils/api";

const UploadHome: NextPage<{ id?: string }> = (context) => {
  const { user } = useUser();

  console.log("user:", user);

  //   if (!data) return <div>404</div>;
  const { mutate, isLoading: isPosting } = api.docs.create.useMutation({
    onSuccess: () => {
      console.log("SUCCESS");
    },
    onError: (e) => {
      console.log("ERROR: ", e.message);
      if (
        e.message.includes("Unique constraint failed on the (not available)")
      ) {
        // toast.error("You already have a ticket open");
      }
    },
  });

  useEffect(() => {
    if (user) {
      const { firstName, lastName, primaryEmailAddress } = user;
      const type = "unknown";
      const name = `${firstName || "FIRST"} ${lastName || "LAST"}`;
      if (typeof primaryEmailAddress?.emailAddress == "string") {
        mutate({
          ownerName: name,
          email: primaryEmailAddress?.emailAddress,
          type,
        });
      }
    }
  }, [user]);

  console.log("user: ", user);
  return (
    <>
      <Head>{/* <title>{data}</title> */}</Head>

      <main className="relative	 min-h-screen">
        <Nav isHome={true} />
        <>
          <div className="relative flex h-full min-h-screen w-full flex-col flex-wrap items-center justify-center bg-emerald-50 p-4 pt-[95px] lg:px-20 lg:py-6 lg:pt-[100px]">
            {/* <SignUp
              redirectUrl={`/upload/${user?.id}`}
              afterSignUpUrl={`/upload/${user?.id}`}
            /> */}
          </div>
        </>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: {
      context,
    },
  };
};

export default UploadHome;
