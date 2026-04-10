import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI;

// Create API client
export const api = axios.create({
  baseURL: API_URL,
});

// Add Interceptor

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
