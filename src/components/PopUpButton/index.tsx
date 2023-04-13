import React, { useState } from "react";

const PopUpButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  //   const [hovering, setHovering] = useState(fal)

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="fixed bottom-10 right-10">
      <button
        onClick={handleButtonClick}
        className="flex h-12 w-12 transform-gpu items-center justify-center rounded-full bg-slate-800 transition duration-300 hover:scale-150"
      >
        <img src="./whiteplus.png" />
      </button>
      {isClicked && (
        <div className="absolute bottom-[5rem] left-[-6rem] flex w-40 flex-col items-end justify-end rounded-md bg-slate-800 p-2 pt-3 text-white">
          {[
            { text: "Send Request", link: "/request" },
            { text: "Pay Rent", link: "#" },
            { text: "Call Us", link: "#" },
          ].map((supportLink) => {
            return (
              <a
                key={supportLink.text}
                href={supportLink.link}
                className="relative mb-1 inline-block text-lg text-white after:absolute after:inset-x-0 after:bottom-0 after:h-0 after:w-0 after:bg-white hover:after:h-[0.125rem] hover:after:w-full hover:after:transition-all hover:after:duration-300"
              >
                {supportLink.text}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PopUpButton;
