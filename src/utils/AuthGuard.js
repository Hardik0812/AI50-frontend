import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default AuthGuard;
