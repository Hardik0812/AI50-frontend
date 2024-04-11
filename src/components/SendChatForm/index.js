import React, { useState } from "react";
import { PaperClipIcon, SendIcon } from "../../assets";

const SendChatForm = ({ isRunning, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("Input value", inputValue);
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input bg-customGray">
      <div>
        {isRunning ? (
          <p className="text-[#B4B4B4] font-normal text-xl">
            Running... <span className="text-customGreen">Stop</span>{" "}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center ">
        <div className="relative inputWithIcon w-full mr-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <PaperClipIcon />
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10 p-4 border bg-white text-2xl rounded-lg focus:outline-none w-full focus:border-customGreen"
            placeholder="Enter a Prompt Here..."
          />
        </div>
        <button
          type="submit"
          className={`rounded-2xl p-3 ${
            !inputValue || isRunning ? "bg-gray-400" : "bg-customGreen"
          }`}
          disabled={!inputValue || isRunning}
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
};

export default SendChatForm;
