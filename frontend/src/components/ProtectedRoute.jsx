import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ role, children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = (user?.Role || "").toLowerCase();
  if (role && userRole && userRole !== role) {
    return <Navigate to={`/dashboard/${userRole === "admin" ? "admin" : "inspector"}`} replace />;
  }

  return children;
}
