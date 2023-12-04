import axios from "axios";
import { devLog } from "../utils/errorUtils";

// Set baseURL
const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001/api"
    : import.meta.env.VITE_REACT_APP_API_URL;

// Create axios instance
export const userAPI = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

export const APIInterceptors = () => {
  // Intercepts requests
  userAPI.interceptors.request.use(
    (config) => {
      devLog("A request has been made");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Intercepts responses
  userAPI.interceptors.response.use(
    (response) => {
      devLog("A response has been received");

      return response;
    },
    (error) => {
      devLog("Error response has been received", error.response);
      if (error.response.status === 401) {
        devLog("401 error: Token is no longer valid");
        window.location.href = "/user-logout";
      }
      if (error.response.status === 404) {
        return;
      }
      return Promise.reject(error);
    }
  );
};
