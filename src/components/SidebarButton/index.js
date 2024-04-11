import React from "react";

const SidebarButton = ({
  className = "bg-customGreen text-xl mt-5 p-3  rounded inline-flex justify-center items-center w-full ",
  icon: Icon,
  text,
  onClick,
}) => (
  <button className={className} onClick={onClick}>
    {Icon && <Icon />}
    {text}
  </button>
);

export default React.memo(SidebarButton);
