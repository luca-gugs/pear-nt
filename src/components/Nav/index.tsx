import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React from "react";

const Nav = () => {
  const user = useUser();

  return (
    <nav className="sticky top-0 bg-white shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-20">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#" className="text-[2.5rem] font-bold text-gray-800">
              Gideon
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
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
              {!user.isSignedIn && <SignInButton />}
              {!!user.isSignedIn && <SignOutButton />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
