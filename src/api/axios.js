import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Your backend base URL
  timeout: 10000, // Optional timeout setting
});

// Add a request interceptor to include the accessToken in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // If access token exists, add it to the Authorization header
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
