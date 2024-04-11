import { useState } from "react";

export const useChat = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return { messages, sendMessage };
};
