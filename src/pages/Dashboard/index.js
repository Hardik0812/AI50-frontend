import React from "react";

import { useAuth } from "../../hooks/useAuth";
import ChatDefaultQuestion from "../../components/ChatDefaultQuestion";
import { useSelector } from "react-redux";
import ChatMessage from "../../components/ChatMessage";
import Notifications from "../Notifications";

const Dashboard = () => {
  useAuth();
  const selectedChatHistory = useSelector(
    (state) => state.chat.selectedChatHistory
  );

  return !selectedChatHistory ? <ChatDefaultQuestion /> : <ChatMessage />;
};

export default Dashboard;
