import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, signUp as signUpApi } from "../services/authService";

const AuthContext = createContext(null);
const STORAGE_KEY = "ai_railway_user";

// Reads the saved login session ({ ...profile, token }) from localStorage, or null if none/corrupt.
function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Pulls a readable message out of an axios error / backend error shape.
function extractErrorMessage(err, fallback) {
  return err?.response?.data?.message || err?.message || fallback;
}

// Holds the logged-in user and exposes login / signup / logout to the whole app.
// The session (profile + JWT) is mirrored to localStorage so a page refresh keeps you logged in.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep localStorage in sync with the user state (save on login, clear on logout).
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // POST /api/login. On success stores the profile and the JWT token together; the
  // token is later attached to every protected request by services/api.js.
  const login = async ({ Email, Password, Role }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi({ Email, Password, Role });
      // backend returns { status, token, message, data: {ID, Name, Email, Phone, Role} }
      // Keep the JWT alongside the profile so api.js can attach it as a
      // Bearer token on every subsequent (protected) request.
      const loggedInUser = { ...res.data, token: res.token };
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      const message = extractErrorMessage(err, "Login failed. Please try again.");
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // POST /api/signUp. Creates the account only - the user still has to log in afterwards.
  const signup = async ({ Name, Email, Phone, Password, Role }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signUpApi({ Name, Email, Phone, Password, Role });
      return res;
    } catch (err) {
      const message = extractErrorMessage(err, "Sign up failed. Please try again.");
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Clears the session (state + localStorage); ProtectedRoute then redirects to /login.
  const logout = () => setUser(null);

  const value = { user, loading, error, setError, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to read the auth state from any component: const { user, login, logout } = useAuth().
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
