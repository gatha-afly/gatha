import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const userAPI = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
  (config) => {
    console.log("A response has been received");
    return config;
  },
  (error) => {
    console.log("Error response has been received", error.response);
    if (error.response.status === 401) {
      console.log("We hit 401, token is not valid anymore");
    }
    return Promise.reject(error);
  }
);

export default userAPI;
