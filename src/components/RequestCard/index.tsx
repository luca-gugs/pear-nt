import React from "react";
import { trimContent } from "../../utils/helpers";

export type RequestCardProps = {
  key: any;
  content: string;
};
const RequestCard = ({ key, content }: RequestCardProps) => {
  return (
    <div className="my-2 h-fit w-full rounded-lg bg-white p-4 shadow-md md:m-2 md:h-[288px] md:w-[18rem]">
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold">
          {content.slice(0, 35) + "..."}
        </h3>
        <p className="text-gray-600">{trimContent(content)}</p>
      </div>
    </div>
  );
};

export default RequestCard;
