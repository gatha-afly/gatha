import axios from "axios";

// Set baseURL
const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

// Create axios instance
const userAPI = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

// Intercepts requests
userAPI.interceptors.request.use(
  (config) => {
    console.log("A request has been made");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepts responses
userAPI.interceptors.response.use(
  (response) => {
    console.log("A response has been received");
    return response;
  },
  (error) => {
    console.error("Error response has been received", error.response);
    if (error.response.status === 401) {
      console.log("We hit 401, token is not valid anymore");
    }
    return Promise.reject(error);
  }
);

export default userAPI;
