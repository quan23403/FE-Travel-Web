import axios from "axios";
import router from "@/router"; // Import your router instance
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Xóa accessToken khi bị lỗi 401
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // Điều hướng về trang đăng nhập/home
      router.push({ name: 'home' }).then(() => {
        window.location.reload();
      });

      // Có thể thêm thông báo nếu muốn, ví dụ alert hoặc toast
      alert("Vui lòng đăng nhập lại.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
