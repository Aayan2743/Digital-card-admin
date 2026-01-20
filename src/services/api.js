import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST: Attach JWT
========================= */
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* =========================
   RESPONSE: Handle JWT errors
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorCode = error.response?.data?.error;

    if (
      status === 401 &&
      ["TOKEN_EXPIRED", "TOKEN_INVALID", "TOKEN_MISSING"].includes(errorCode)
    ) {
      // 🔐 Clear auth data
      localStorage.clear();
      sessionStorage.clear();

      // 🚪 Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
