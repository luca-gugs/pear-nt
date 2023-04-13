import React, { useState } from "react";

const RequestForm = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: {
    preventDefault: () => void;
    target: { name: { value: any }; email: { value: any }; reset: () => void };
  }) => {
    event.preventDefault();
    // Do something with the form data, e.g. submit to API or update state
    console.log("Form submitted:", {
      name: event.target.name.value,
      email: event.target.email.value,
      message: message,
    });
    // Reset form fields
    event.target.reset();
    setMessage("");
  };

  return (
    <form
      className="mx-auto max-w-lg rounded bg-white px-8 py-6 shadow-md"
      onSubmit={handleSubmit as any}
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
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:border-indigo-500 focus:outline-none"
          id="email"
          type="email"
          placeholder="Email Address"
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
          onChange={handleMessageChange}
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
