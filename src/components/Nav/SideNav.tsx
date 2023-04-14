import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";

const SideNav = () => {
  const user = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger menu */}
      <div
        className="fixed left-0 top-0 z-50 cursor-pointer bg-black p-4 text-white"
        onClick={toggleNav}
      >
        <div
          className={`flex h-12 w-8 items-center justify-center ${
            isOpen ? "rotate-90" : ""
          } transition-transform duration-300`}
        >
          <span className="sr-only">Toggle Navigation</span>
          {/* Hamburger icon */}
          <div className="h-[0.175rem] w-6 bg-white"></div>
          <div className="mt-1 h-[0.175rem] w-6 bg-white"></div>
          <div className="mt-2 h-[0.175rem] w-6 bg-white"></div>
        </div>
      </div>
      {/* Side nav */}
      <nav
        className={`fixed left-0 top-0 z-40 h-full w-64 transform bg-black px-6 py-8 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Nav content */}
        <ul className="pt-16 text-white">
          {!user.isSignedIn && <SignInButton />}
          {!!user.isSignedIn && <SignOutButton />}
          {/* <li className="mb-4">
            <a href="#home">Home</a>
          </li>
          <li className="mb-4">
            <a href="#about">About</a>
          </li>
          <li className="mb-4">
            <a href="#services">Services</a>
          </li>
          <li className="mb-4">
            <a href="#contact">Contact</a>
          </li> */}
        </ul>
      </nav>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-30 h-full w-full bg-black opacity-50"
          onClick={toggleNav}
        ></div>
      )}
    </div>
  );
};

export default SideNav;
