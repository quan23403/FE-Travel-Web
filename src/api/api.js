import axiosInstance from "./axios";

export const login = async (credentials) => {
    return await axiosInstance.post("/api/login", credentials);
}

export const register = async (credentials) => {
    return await axiosInstance.post("/api/register", credentials);
}

export const createTour = async (tourData) => {
    return await axiosInstance.post("/api/tour", tourData);
}

export const updateTour = async (tourId, tourData) => {
    return await axiosInstance.post(`/api/tour/${tourId}`, tourData);
}

export const uploadImageTours = async (imageData, tourId) => {
    return await axiosInstance.post(`/api/uploadFile/${tourId}`, imageData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const getAllTours = async () => {
    return await axiosInstance.get("/api/tour");
}

export const getTourById = async (tourId) => {
    return await axiosInstance.get(`/api/tour/${tourId}`);
}

export const getAllBookings = async (pageNumber, pageSize) => {
    return await axiosInstance.get("/api/bookings", {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            }
        });
}

export const updatedBooking = async (bookingId, bookingData) => {
    return await axiosInstance.put(`/api/bookings/${bookingId}`, bookingData);
}

export const createSchedule = async (scheduleData) => {
    return await axiosInstance.post("/api/schedules", scheduleData);
}

export const getAllSchedules = async () => {
    return await axiosInstance.get("/api/schedules");
}

export const getScheduleById = async (scheduleId) => {
    return await axiosInstance.get(`/api/schedules/${scheduleId}`);
}

export const createBooking = async (bookingData) => {
    return await axiosInstance.post("/api/bookings", bookingData);
}

export const initVnpayPayment = async (vnpayPaymentData) => {
    return await axiosInstance.post("/api/payment/initPayment", vnpayPaymentData);
}

export const getUrlLoginWithGoogle = async () => {
    return await axiosInstance.get("/api/google/login-url");
}

export const callBackGoogle = async (code) => {
    return await axiosInstance.get(`/api/google/callback?code=${code}`);
}

export const historyBooking = async () => {
    return await axiosInstance.get(`/api/bookings/history`);
}

export const createFeedback = async (feedbackData) => {
    return await axiosInstance.post(`/api/feedback`, feedbackData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const getFeedbackByTourId = async (tourId) => {
    return await axiosInstance.get(`/api/feedback/tour/${tourId}`);
}

export const getAllUsers = async () => {
    return await axiosInstance.get("/api/users");
}

export const updateUser = async (userId, userData) => {
    return await axiosInstance.put(`/api/users/${userId}`, userData);
}

export const createUserByAdmin = async (userData) => {
    return await axiosInstance.post("/api/users/by-admin", userData);
}

export const topBookings = async () => {
    return await axiosInstance.get("/api/tour/top-bookings");
}