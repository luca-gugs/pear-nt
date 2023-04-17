import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import ProfileIcon from "../ProfileIcon/index";
import SideNav from "./SideNav";
import Link from "next/link";

const Nav = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="fixed top-0 z-[100] w-full bg-white shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-20">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="ml-16 text-[2.5rem] font-bold text-gray-800 md:ml-16 lg:ml-0"
            >
              Gideon
            </Link>
          </div>
          <div className="block md:block">
            <div className="ml-10 flex items-center space-x-4">
              {/* <div className="group relative">
                <a
                  href="#"
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  Dropdown 1
                </a>
                <div className="invisible absolute left-0 mt-2 w-32 space-y-2 bg-white text-gray-700 opacity-0 transition duration-150 ease-in-out group-hover:block">
                  <a href="#" className="block px-4 py-2">
                    Item 1
                  </a>
                  <a href="#" className="block px-4 py-2">
                    Item 2
                  </a>
                  <a href="#" className="block px-4 py-2">
                    Item 3
                  </a>
                </div>
              </div>
              <div className="group relative">
                <a
                  href="#"
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  Dropdown 2
                </a>
                <div className="invisible absolute left-0 mt-2 w-32 space-y-2 bg-white text-gray-700 opacity-0 transition duration-150 ease-in-out group-hover:block">
                  <a href="#" className="block px-4 py-2">
                    Item 1
                  </a>
                  <a href="#" className="block px-4 py-2">
                    Item 2
                  </a>
                  <a href="#" className="block px-4 py-2">
                    Item 3
                  </a>
                </div>
              </div>
              <div className="group relative">
                <a
                  href="#"
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  Dropdown 3
                </a>
                <div className="invisible absolute left-0 mt-2 w-32 space-y-2 bg-white text-gray-700 opacity-0 transition duration-150 ease-in-out group-hover:block">
                  <a href="#" className="block px-4 py-2">
                    Item 1
                  </a>
                </div>
              </div> */}
              {!user.isSignedIn && (
                <SignInButton mode="modal">
                  <button className="rounded-md bg-black px-6 py-3 font-bold text-white shadow-md transition duration-300 hover:shadow-lg">
                    Sign In
                  </button>
                </SignInButton>
              )}
              {!!user.isSignedIn && <SignOutButton />}
              <ProfileIcon />

              <SideNav />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
