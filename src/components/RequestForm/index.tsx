import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "~/utils/api";

const RequestForm = () => {
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const { push } = useRouter();

  const { mutate } = api.posts.create.useMutation();

  const handleSubmit = () => {
    console.log("messaage ", message);
    mutate({ content: message });
    setMessage("");
    // push("/");
  };

  return (
    <form
      className="mx-auto max-w-lg rounded bg-white px-8 py-6 shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-6 text-2xl font-semibold">Contact Us</h2>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="name"
        >
          Full Address (street, apt, city, state, zip)
        </label>
        <input
          className="w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:border-indigo-500 focus:outline-none"
          id="name"
          type="text"
          placeholder="2 Willow Lane, Sausalito, CA, 94965"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="message"
        >
          Request
        </label>
        <textarea
          className="h-32 w-full resize-none appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:border-indigo-500 focus:outline-none"
          id="message"
          placeholder="Share as much as possible about the current issue you are having, how long it has been effecting you, and how soon you expect this to be resolved"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <button
        className="focus:shadow-outline rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-600 focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default RequestForm;
