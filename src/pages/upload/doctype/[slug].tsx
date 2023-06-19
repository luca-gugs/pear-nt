import { useUser } from "@clerk/nextjs";
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
import { UploadButton, UploadDropzone } from "@uploadthing/react";

import type { OurFileRouter } from "~/server/uploadthing";
// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const UploadDocTypePage: NextPage<{ doctype: any }> = ({ doctype }) => {
  const user = useUser();
  const [userDoc, setUserDoc] = useState<any>();

  const { data, error, isLoading } = api.docs.getByUser.useQuery({
    username: user?.user?.id || "",
  });



  useEffect(() => {
    setUserDoc(data);
  }, [data]);


  const { mutate, isLoading: isPosting } = api.docs.update.useMutation({
    onSuccess: (result) => {
      console.log("SUCCESS: ", result);
      setUserDoc(result);
    },
    onError: (e) => {
      // console.log("ERROR: ", e.message);
      if (
        e.message.includes("Unique constraint failed on the (not available)")
      ) {
        // toast.error("You already have a ticket open");
      }
    },
  });




  return (
    <>
      <Head>{/* <title>{data?.username}</title> */}</Head>

      <main className="relative	 min-h-screen">
        <Nav isHome={true} />
        <>
          <div className="relative flex h-full min-h-screen w-full flex-col flex-wrap items-center justify-center bg-emerald-50 p-4 pt-[95px] lg:px-20 lg:py-6 lg:pt-[100px]">
            <main className="flex flex-col items-center  p-24">
              {userDoc && doctype.slug && !userDoc[doctype.slug] ? (
                <>
                  <UploadDropzone<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={async (res) => {
                      // Do something with the response
                      if (res) {
                        // console.log("Files: ", res, res[0]);
                        // console.log("userDoc: ", userDoc);
                        // console.log("docType: ", doctype.slug);
                        // mutate({});
                        userDoc[`${doctype.slug}Status`] = "In Review";
                        userDoc[doctype.slug] = res[0]?.fileUrl;
                        mutate({
                          userDoc,
                          ownerId: userDoc.ownerId,
                        });
                        alert("Upload Completed");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <h3 className="max-w-[40rem] text-2xl">
                    Looks Like We've Already got something on file for this doc,
                    click it to see what you've submitted
                  </h3>
                 {userDoc && userDoc[doctype.slug] && <Link target='blank' className="text-[20rem]" href={userDoc[doctype.slug]}>
                    <Image
                      height={400}
                      width={400}
                      src="/file.png"
                      alt="file-uploade-icon"
                    />
                  </Link>}
                </div>
              )}
              {/* <button onClick={handleDocUpload}>hey now</button> */}
            </main>
          </div>
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

  const slug = context.params;

  //   if (typeof slug !== "string") throw new Error("No slug");
  //this allows us to prefetch the data and hydrate it through server side props
  //   await helpers.profile.getUserByUsername.prefetch({ username: slug });
  return {
    props: {
      //   trpcState: helpers.dehydrate(),
      //   username: slug,
      doctype: slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default UploadDocTypePage;
