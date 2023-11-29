import axios from "axios";

// Set baseURL
const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001/api"
    : import.meta.env.VITE_REACT_APP_API_URL;

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
    console.log("Error response has been received", error.response);
    if (error.response.status === 403) {
      console.log("We hit 403, token is not valid anymore");
      window.location = "/user-logout";
    }
    return Promise.reject(error);
  }
);

export default userAPI;
/* Export */
