import axios from "axios";
import { Toast } from "../../utils/Toasts";

export class AuthService {
  static axiosInstance = axios.create({
    baseURL: "https://ai50-backend.azurewebsites.net/api/v1",
    // baseURL: "http://127.0.0.1:5000/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  static async get(url) {
    try {
      const response = await this.axiosInstance.get(url);
      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return Promise.reject(error);
    }
  }

  static async post(url, body) {
    try {
      const response = await this.axiosInstance.post(url, body);
      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return Promise.reject(error);
    }
  }

  static async getWithAuth(url, config = {}) {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await this.axiosInstance.get(url, {
        ...config,
        headers,
      });
      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return Promise.reject(error);
    }
  }

  static handleErrors(error) {
    if (error.response && error.response.status === 403) {
      Toast.error(
        "Access forbidden: You do not have permission to access this resource."
      );
    } else if (error.response) {
      const errorMessage =
        error.response.data.message ||
        "Something went wrong, please try again.";
      Toast.error(errorMessage);
    } else {
      Toast.error("Network error, please try again.");
    }
  }
}
