import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { api } from "~/utils/api";
import { UserDocs } from "@prisma/client";

const DialogDemo = ({
  name,
  status,
  keyId,
  userDoc,
}: {
  userDoc: UserDocs;
  name: string;
  status: string;
  keyId: string;
}) => {
  const [newStatus, setNewStatus] = useState("");
  console.log("keys: ", name, status, keyId);
  console.log("userDoc, userDoc: ", userDoc);
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.docs.update.useMutation({
    onSuccess: (result) => {
      void ctx.docs.getByUser.invalidate();

      console.log("SUCCESS: ", result);
      //   setUserDoc(result);
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

  const handleDocUpload = (e: any) => {
    if (typeof newStatus == "string") {
      userDoc.payStubOneStatus = newStatus;
      mutate({
        userDoc: { ...userDoc, payStubOneStatus: newStatus },
        ownerId: userDoc.ownerId,
      });
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="other-shadow inline-flex h-[35px] items-center justify-center rounded-[4px]  border-none bg-white px-[15px] font-medium leading-none text-violet11 shadow-blackA7 outline-none hover:bg-mauve3">
          Review
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Review Document
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-mauve11">
            Make changes to your profile here. Click save when you&aposre done.
          </Dialog.Description>
          <div className="flex gap-x-4">
            <div
              onClick={() => setNewStatus("missing")}
              className={`w-full rounded-full border-2 border-solid border-red-400  text-center ${
                newStatus !== "missing" ? "bg-white" : "bg-red-200"
              } px-4 py-2 text-xl font-bold`}
            >
              Reject
            </div>

            <div
              onClick={() => setNewStatus("Approved")}
              className={`w-full rounded-full border-2 border-solid border-green-400  text-center ${
                newStatus !== "Approved" ? "bg-white" : "bg-green-200"
              } px-4 py-2 text-xl font-bold`}
            >
              Approve
            </div>
          </div>

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={handleDocUpload}
                className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
