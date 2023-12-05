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

      // Exception for user login 401 error
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.error === "Incorrect password."
      ) {
        devLog("Ignoring incorrect password 401 in the interceptor");
        return Promise.reject(error);
      }

      // Handle other 401 errors
      if (error.response && error.response.status === 401) {
        devLog("401 error: Token is no longer valid");
        window.location.href = "/user-logout";
      }

      // Handle other errors
      return Promise.reject(error);
    }
  );
};
