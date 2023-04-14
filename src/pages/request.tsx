import { NextPage } from "next";
import React, { useState } from "react";
import Nav from "~/components/Nav";
import RequestForm from "~/components/RequestForm";

const RequestPage: NextPage = () => {
  const [isSlideOff, setIsSlideOff] = useState(false);

  const handleButtonClick = () => {
    setIsSlideOff(true);
  };

  return (
    <div className="relative h-screen">
      <Nav />
      <div className="relative flex h-full w-full flex-col flex-wrap items-center justify-center bg-emerald-50 p-4 pt-[95px] lg:px-20 lg:py-6 lg:pt-[100px]">
        <RequestForm />
      </div>
    </div>
  );
};

export default RequestPage;
