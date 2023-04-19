import React from "react";

interface PostFullSizeProps {
  ticketNumber: string;
  title: string;
  description: string;
}

const PostFullSize: React.FC<PostFullSizeProps> = ({ title, description }) => {
  return (
    <div className="w-full rounded-md bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center">
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      {/* <p className="text-gray-600"> */}
      <pre className="whitespace-pre-wrap font-sans leading-9">
        {description}
      </pre>
      {/* </p> */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mr-1 h-4 w-4 fill-current text-gray-600"
          >
            {/* Add icon SVG path here */}
          </svg>
          <span className="text-sm text-gray-600">Assignee: John Doe</span>
        </div>
        <button className="rounded-md bg-blue-500 px-3 py-1 text-sm font-semibold text-white">
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default PostFullSize;
