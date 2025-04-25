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

export const getAllBookings = async () => {
    return await axiosInstance.get("/api/bookings");
}

export const updatedBooking = async (bookingId, bookingData) => {
    return await axiosInstance.put(`/api/bookings/${bookingId}`, bookingData);
}

export const getScheduleById = async (scheduleId) => {
    return await axiosInstance.get(`/api/schedules/${scheduleId}`);
}