import axios from "axios";

const api = axios.create({
  baseURL: "https://room-reservation-system-t8gs.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
export default api;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expiresAtUtc");
      localStorage.removeItem("user");

      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);
