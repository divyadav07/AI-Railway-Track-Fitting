import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Route guard: renders the page only when a user is logged in, otherwise redirects to /login.
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
