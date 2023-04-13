import { NextPage } from "next";
import React from "react";
import Nav from "~/components/Nav";
import RequestForm from "~/components/RequestForm";

const RequestPage: NextPage = () => {
  return (
    <div className="relative h-screen">
      <Nav />
      <div className="relativeflex h-full w-full flex-col bg-emerald-50 p-4 md:flex-row lg:px-20 lg:py-6">
        <RequestForm />
      </div>
    </div>
  );
};

export default RequestPage;
