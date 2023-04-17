import { SignInButton, useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import React, { useState } from "react";
import Nav from "~/components/Nav";
import RequestForm from "~/components/RequestForm";
import CreatePostWizard from "~/components/RequestForm/beta";

const RequestPage: NextPage = () => {
  const user = useUser();

  return (
    <div className="relative h-screen">
      <Nav />
      <div className="relative flex h-full w-full flex-col flex-wrap items-center justify-center bg-emerald-50 p-4 pt-[95px] lg:px-20 lg:py-6 lg:pt-[100px]">
        {user.isSignedIn || !user.isLoaded ? (
          <CreatePostWizard />
        ) : (
          <>
            {/* Sign In To Post <SignInButton /> */}
            <SignInButton mode="modal">
              <button className="rounded-md bg-black px-6 py-3 font-bold text-white shadow-md transition duration-300 hover:shadow-lg">
                Sign In
              </button>
            </SignInButton>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestPage;
