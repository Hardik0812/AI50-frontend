import React, { useState } from "react";
import { DoenArrowIcon } from "../../assets";

const SidebarAccordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <div className="">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full hover:bg-gray-100 px-2 rounded-lg"
      >
        <span className="text-2xl font-semibold">{title}</span>
        <DoenArrowIcon className={`${accordionOpen ? "!rotate-180" : ""}`} />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
};

export default SidebarAccordion;
