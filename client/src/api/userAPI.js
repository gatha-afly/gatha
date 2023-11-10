import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const userAPI = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default userAPI;
