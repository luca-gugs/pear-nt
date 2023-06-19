import { UserDocs } from "@prisma/client";
import Link from "next/link";
import React from "react";
import DocApprovalModal from "../DocApprovalModal";

type DocStatusCardProps = {
  userDoc: UserDocs;
  admin?: boolean;
};
const DocStatusCard = ({ userDoc, admin = false }: DocStatusCardProps) => {
  const {
    payStubOneStatus,
    payStubTwoStatus,
    bankStmntOneStatus,
    bankStmntTwoStatus,
    bankStmntThreeStatus,
  } = userDoc;

  const docsArray = [
    {
      name: "Pay Stub One",
      keyId: "payStubOne",
      status: payStubOneStatus,
    },
    {
      name: "Pay Stub Two",
      keyId: "payStubTwo",
      status: payStubTwoStatus,
    },
    {
      name: "Bank Statement One",
      keyId: "bankStmntOne",
      status: bankStmntOneStatus,
    },
    {
      name: "Bank Statement Two",
      keyId: "bankStmntTwo",
      status: bankStmntTwoStatus,
    },
    {
      name: "Bank Statement Three",
      keyId: "bankStmntThree",
      status: bankStmntThreeStatus,
    },
  ];
  return (
    <div className="relative">
      <div className="shadow-longer z-2 absolute top-[-2rem] w-fit rounded-md bg-zinc-100 p-4">
        <h3 className="text-3xl">{userDoc.ownerName}'s Documents 🗄️</h3>
      </div>
      <div className="shadow-shorter z-1 ml-8 w-[40rem] rounded-md bg-slate-50 px-10 pb-8 pt-[4rem]">
        <h3 className="mb-6 text-xl">
          {!admin
            ? "Your close to completing your journey to financial empowerment, just a few more things we need from you. Select a document to begin the upload process."
            : "Select a doc to start reviewing"}
        </h3>
        <hr className="mt-2 h-[2px] bg-slate-200" />
        <div className="mt-4 flex flex-col gap-y-4">
          {docsArray.map(({ name, status, keyId }, idx) => {
            console.log('key: ', keyId)
            return (
              <div className="flex w-full items-center">
                <Link
                  // target={"blank"}
                  href={`/upload/doctype/${keyId}`}
                  className="other-shadow flex w-full items-center justify-between rounded-full p-4 font-bold"
                  key={name}
                >
                  <p className="ml-2 text-lg">{name}</p>
                  {status === "missing" ? (
                    <div className="rounded-full border-2 border-solid  border-red-400 bg-red-200 px-4 py-2 text-sm font-bold">
                      Missing
                    </div>
                  ) : status === "In Review" ? (
                    <div className="rounded-full border-2 border-solid  border-yellow-400 bg-yellow-200 px-4 py-2 text-sm font-bold">
                      In Review
                    </div>
                  ) : status === "Approved" ? (
                    <div className="rounded-full border-2 border-solid  border-green-400 bg-green-200 px-4 py-2 text-sm font-bold">
                      Approved
                    </div>
                  ) : (
                    <div>error</div>
                  )}
                </Link>
                {admin && status == 'In Review' && <DocApprovalModal userDoc={userDoc} name={name} status={status} keyId={keyId} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocStatusCard;
