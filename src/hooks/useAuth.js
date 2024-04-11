import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);
};

const useUnauth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
};

export { useAuth, useUnauth };
