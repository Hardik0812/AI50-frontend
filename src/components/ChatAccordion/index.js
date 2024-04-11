import React, { useState } from "react";
import { CircleMinusIcon, CirclePlusIcon } from "../../assets";

const ChatAccordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="border border-[#ddd] p-3 rounded-lg">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full hover:bg-gray-100 px-2 rounded-lg text-lg  "
      >
        <span className="text-lg font-medium">{title}</span>
        {accordionOpen ? <CircleMinusIcon /> : <CirclePlusIcon />}
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm  ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100 p-2 mt-2 border-t-2"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <p className="overflow-hidden text-base">{answer}</p>
      </div>
    </div>
  );
};

export default ChatAccordion;
