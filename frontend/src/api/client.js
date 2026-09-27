// ---------------------------------------------------------------------------
// Real API client for the TrackSentry backend. No mock data lives here —
// every function performs an actual HTTP request to the Express/MySQL
// backend in ../../../backend. The backend must be running (see the
// project README for setup) and reachable at API_BASE (see below).
// ---------------------------------------------------------------------------

// In dev, Vite proxies "/api" straight to the backend (see vite.config.js),
// which sidesteps CORS entirely since the browser only ever talks to the
// Vite server. Override with VITE_API_BASE_URL if you point the frontend at
// a backend that isn't proxied (e.g. a deployed API).
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const TOKEN_KEY = "tracksentry_token";

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* localStorage unavailable — ignore */
  }
}

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request(path, { method = "GET", body, auth = true, params } = {}) {
  let url = `${API_BASE}${path}`;

  if (params) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        search.append(key, value);
      }
    });
    const qs = search.toString();
    if (qs) url += `?${qs}`;
  }

  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getStoredToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    // The backend is unreachable (not running, wrong port, network down…)
    throw new ApiError(
      "Could not reach the server. Make sure the backend is running.",
      0,
      null
    );
  }

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    if (res.status === 401) {
      // Token missing/expired — clear it so the app doesn't keep retrying
      // with a dead token.
      setToken(null);
    }
    const message = data?.message || `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, data);
  }

  return data;
}

export const apiGet = (path, params) => request(path, { method: "GET", params });
export const apiPost = (path, body, opts = {}) => request(path, { method: "POST", body, ...opts });
export const apiPut = (path, body, opts = {}) => request(path, { method: "PUT", body, ...opts });
export const apiDelete = (path, opts = {}) => request(path, { method: "DELETE", ...opts });
