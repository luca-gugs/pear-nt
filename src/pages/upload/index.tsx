import { SignUp, useUser } from "@clerk/nextjs";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Nav from "~/components/Nav";
import { api } from "~/utils/api";

const UploadHome: NextPage<{ id?: string }> = (context) => {
  const { user } = useUser();
  const router = useRouter();
  console.log("user:", user);

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
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push("upload/auth");
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
            <SignUp redirectUrl="/upload/auth" afterSignUpUrl="/upload/auth" />
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
