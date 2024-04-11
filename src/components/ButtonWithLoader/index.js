import React from "react";

const ButtonWithLoader = ({
  isLoading,
  className,
  disabled,
  onClick,
  children,
  bgColor = "bg-customGreen",
  spinnerColor = "border-white",
}) => {
  return (
    <button
      className={`${bgColor} hover:${bgColor} text-white font-bold mt-[20px] py-2 px-4 rounded w-full flex justify-center items-center text-[22px] ${className}`}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <svg
            className={`animate-spin h-5 w-5 border-2 ${spinnerColor} border-opacity-50 border-t-transparent rounded-full`}
            viewBox="0 0 24 24"
          ></svg>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonWithLoader;
