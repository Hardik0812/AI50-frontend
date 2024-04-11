import React, { useState } from "react";

const InputWithIcon = React.forwardRef(
  (
    {
      icon: Icon,
      placeholder,
      type = "text",
      customClass = "",
      mainDiv = "",
      error,
      bgColor,
      ...props
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);
    const toggleShowPassword = () => {
      setInputType((currentType) =>
        currentType === "password" ? "text" : "password"
      );
    };

    return (
      <>
        <div className={`relative mt-5 inputWithIcon ${mainDiv}`}>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            {Icon && <Icon />}
          </span>

          <input
            ref={ref}
            type={inputType}
            className={`pl-10 pr-4 py-3 border text-[22px] ${
              error ? "border-red-500" : "border-[#312E36] "
            } ${
              bgColor || "bg-transparent"
            } rounded-lg focus:outline-none w-full ${
              error ? "focus:border-red-500" : "focus:border-customGreen"
            } ${customClass}`}
            placeholder={placeholder}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[16px] text-customGreen"
              aria-label={
                inputType === "password" ? "Show password" : "Hide password"
              }
            >
              {inputType === "password" ? "Show" : "Hide"}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-base mt-0">{error}</p>}
      </>
    );
  }
);

export default InputWithIcon;
