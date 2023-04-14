import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

const CreatePostWizard = () => {
  const { user } = useUser();
  const { push } = useRouter();

  const [input, setInput] = useState("");
  const [slidingOff, setSlidingOff] = useState(false);
  const [slidingIn, setSlidingIn] = useState(false);

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
      setSlidingOff(true);
      setTimeout(() => {
        setSlidingIn(true);
      }, 500);
      //   push("/");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        // toast.error(errorMessage[0]);
      } else {
        // toast.error("Failed to post! Please try again later.");
      }
    },
  });

  if (!user) return null;

  return (
    <>
      <div className="relative">
        <div
          className={`z-10 flex h-[18rem] w-[30rem] rounded bg-white px-8 py-6 text-start shadow-md ${
            slidingOff ? "opacity-0 transition-opacity duration-500" : ""
          }`}
        >
          <textarea
            placeholder="Let Us know what issues you are having"
            className="z-10 h-full w-full grow resize-none bg-white text-start outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (input !== "") {
                  mutate({ content: input });
                }
              }
            }}
            disabled={isPosting}
          />
          {isPosting && (
            <div className="flex items-center justify-center">
              {/* <LoadingSpinner size={20} /> */}loading
            </div>
          )}
        </div>
        <div className="z-1 absolute top-0">
          <h3
            className={`${
              slidingIn
                ? "opacity-100 transition-opacity duration-500"
                : "opacity-0 transition-opacity duration-500"
            } `}
          >
            Thanks for reaching out we will follow up as soon as we can
          </h3>
          <p>
            Click here to go to your dashboard to track the status of your
            requests or update it with additional concerns, we will send you an
            email once we get to work.
          </p>
          <br />
          <p>
            Something else on your mind...click here to create another request
          </p>
        </div>
        {input !== "" && !isPosting && (
          <button
            className="absolute ml-2 mt-2"
            onClick={() => mutate({ content: input })}
          >
            Submit Request
          </button>
        )}
      </div>
    </>
  );
};

export default CreatePostWizard;
