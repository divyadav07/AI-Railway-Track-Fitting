import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth.js";
import { getStoredToken, setToken as persistToken } from "../api/client.js";

const AuthContext = createContext(null);
const USER_KEY = "tracksentry_user";

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistUser(user) {
  try {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => readStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep state in sync if the token disappears (e.g. the API client cleared
  // it after a 401 from an expired session).
  useEffect(() => {
    const interval = setInterval(() => {
      const current = getStoredToken();
      if (!current && token) {
        setTokenState(null);
        setUser(null);
        persistUser(null);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [token]);

  const login = useCallback(async ({ email, password, role }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginRequest({ email, password, role });
      persistToken(res.token);
      setTokenState(res.token);
      setUser(res.data);
      persistUser(res.data);
      return res.data;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      return await registerRequest(payload);
    } catch (err) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    persistToken(null);
    setTokenState(null);
    setUser(null);
    persistUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      clearError: () => setError(null),
    }),
    [user, token, loading, error, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
