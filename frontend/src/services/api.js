import axios from "axios";

// Points at your Express backend: app.use("/api", userRouter)
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Keep this key in sync with AuthContext.jsx (STORAGE_KEY).
const STORAGE_KEY = "ai_railway_user";

// Returns the JWT saved at login (inside the session in localStorage), or null.
function getStoredToken() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw)?.token || null;
  } catch {
    return null;
  }
}

// Shared axios instance used by every service file.
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// The backend's authMiddleware protects /getAssets, /addAsset, /getUsers, etc.
// and expects `Authorization: Bearer <token>`. Attach it automatically so
// every service call is authenticated once the user has logged in.
api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is missing/expired, the backend replies 401. Clear the stale
// session so the app falls back to the login screen instead of looping on
// failed requests.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY);
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
