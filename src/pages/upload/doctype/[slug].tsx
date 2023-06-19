import { useUser } from "@clerk/nextjs";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { UploadDropzone } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import superjson from "superjson";
import LoadingSpinner from "~/components/LoadingSpinner";
import Nav from "~/components/Nav";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import type { OurFileRouter } from "~/server/uploadthing";
import { api } from "~/utils/api";

const UploadDocTypePage: NextPage<{ doctype: { slug: string } }> = ({
  doctype,
}) => {
  const user = useUser();
  const [reuploadNeeded, setReuploadNeeded] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const slug = doctype?.slug;
  const ctx = api.useContext();

  const { data, error, isLoading } = api.docs.getByUser.useQuery({
    username: user?.user?.id || "",
  });

  const { mutate, isLoading: isPosting } = api.docs.update.useMutation({
    onSuccess: (result) => {
      setIsLoading(true);
      console.log("SUCCESS: ", result);
      toast.success("Document Uploaded Successfully");
      void ctx.docs.getByUser.invalidate();
      setReuploadNeeded(false);
      setIsLoading(false);
    },

    onError: (e) => {
      if (
        e.message.includes("Unique constraint failed on the (not available)")
      ) {
        toast.error("Unable To Complete Upload");
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
              {isLoading || loading || !slug ? (
                <LoadingSpinner />
              ) : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              (data && slug && !data[slug]) ||
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (data && slug && reuploadNeeded) ? (
                <>
                  <UploadDropzone<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        data[`${slug}Status`] = "In Review";
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        data[slug] = res[0]?.fileUrl;
                        console.log("DATA: ", data);
                        mutate({
                          userDoc: data,
                          ownerId: data.ownerId,
                        });
                        toast.success("Document Saved to Storage");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(
                        "Something Went wrong saving document to state"
                      );
                    }}
                  />
                </>
              ) : // eslint-disable-next-line
              data && slug && (data as any)[slug] && !reuploadNeeded ? (
                <div className="flex items-center">
                  <Link
                    target="blank"
                    className="text-[20rem]"
                    // eslint-disable-next-line
                    href={(data as any)[slug]}
                  >
                    <Image
                      height={400}
                      width={400}
                      src="/file.png"
                      alt="file-uploade-icon"
                    />
                  </Link>
                  <div className="flex flex-col space-y-10">
                    {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore */}
                    <Link target="blank" href={`${data[slug]}`}>
                      <div className="other-shadow rounded-full border-2 border-solid bg-zinc-50 px-4 py-2 text-xl font-semibold">
                        View Document
                      </div>
                    </Link>
                    <div
                      onClick={() => setReuploadNeeded(true)}
                      className="other-shadow rounded-full border-2 border-solid bg-zinc-50 px-4 py-2 text-xl font-semibold"
                    >
                      Replace Document
                    </div>
                    <div className="other-shadow rounded-full border-2 border-solid bg-zinc-50 px-4 py-2 text-xl font-semibold">
                      Speak w/ a document specialist
                    </div>
                  </div>
                </div>
              ) : null}
            </main>
          </div>
        </>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params;
  //   await helpers.profile.getUserByUsername.prefetch({ username: slug });
  return {
    props: {
      doctype: slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default UploadDocTypePage;
