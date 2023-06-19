import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import ProfileIcon from "../Atoms/ProfileIcon/index";
import SideNav from "./SideNav";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = ({ isHome = false }) => {
  const router = useRouter();
  const user = useUser();
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  console.log("rj: ", router);

  return (
    <nav className="fixed top-0 z-[100] w-full bg-white shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link
              href="/"
              className="ml-16 text-[2.5rem] font-bold text-gray-800 md:ml-16 lg:ml-0"
            >
              {/* Gideon */}
              {router.pathname.includes("upload")
                ? "EasyDoc"
                : router.pathname.includes("repair")
                ? "Gideon"
                : "EasyLife"}
            </Link>
            {router.pathname.includes("upload") && (
              <p className="ml-8">Document Uploads for the rest of us</p>
            )}
          </div>
          <div className="block md:block">
            <div className="ml-10 flex items-center space-x-4">
              {!user.isSignedIn && !isHome && (
                <SignInButton mode="modal">
                  <button className="rounded-md bg-black px-6 py-3 font-bold text-white shadow-md transition duration-300 hover:shadow-lg">
                    Sign In
                  </button>
                </SignInButton>
              )}
              {!!user.isSignedIn && (
                <SignOutButton
                  signOutCallback={() => {
                    router.reload();
                  }}
                />
              )}
              {user?.user?.id && (
                <Link href={`/upload/${user?.user?.id}`}>
                  <ProfileIcon />
                </Link>
              )}

              {!isHome && <SideNav isHome={isHome} />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
