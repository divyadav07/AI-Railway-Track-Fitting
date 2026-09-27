import { Routes, Route } from "react-router-dom";
import { Wrench, Bell, FileBarChart } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import InspectorDashboard from "./pages/dashboard/InspectorDashboard.jsx";
import UsersPage from "./pages/dashboard/UsersPage.jsx";
import SettingsPage from "./pages/dashboard/SettingsPage.jsx";
import ComingSoonPage from "./pages/dashboard/ComingSoonPage.jsx";
import AssetsPage from "./pages/assets/AssetsPage.jsx";
import AssetDetailPage from "./pages/assets/AssetDetailPage.jsx";
import InspectionsPage from "./pages/inspections/InspectionsPage.jsx";
import InspectionDetailPage from "./pages/inspections/InspectionDetailPage.jsx";
import NewInspectionPage from "./pages/inspections/NewInspectionPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin */}
      <Route path="/dashboard/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/admin/assets" element={<ProtectedRoute role="admin"><AssetsPage role="admin" /></ProtectedRoute>} />
      <Route path="/dashboard/admin/assets/:id" element={<ProtectedRoute role="admin"><AssetDetailPage role="admin" /></ProtectedRoute>} />
      <Route path="/dashboard/admin/inspections" element={<ProtectedRoute role="admin"><InspectionsPage role="admin" /></ProtectedRoute>} />
      <Route path="/dashboard/admin/inspections/:id" element={<ProtectedRoute role="admin"><InspectionDetailPage role="admin" /></ProtectedRoute>} />
      <Route path="/dashboard/admin/users" element={<ProtectedRoute role="admin"><UsersPage /></ProtectedRoute>} />
      <Route path="/dashboard/admin/settings" element={<ProtectedRoute role="admin"><SettingsPage role="admin" /></ProtectedRoute>} />
      <Route
        path="/dashboard/admin/maintenance"
        element={
          <ProtectedRoute role="admin">
            <ComingSoonPage
              role="admin"
              icon={Wrench}
              title="Maintenance"
              description="There's no maintenance table or API on the backend yet, so this section has nothing to show. It'll come to life once that's added."
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/alerts"
        element={
          <ProtectedRoute role="admin">
            <ComingSoonPage
              role="admin"
              icon={Bell}
              title="Alerts"
              description="There's no alerts table or API on the backend yet, so this section has nothing to show. It'll come to life once that's added."
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/reports"
        element={
          <ProtectedRoute role="admin">
            <ComingSoonPage
              role="admin"
              icon={FileBarChart}
              title="Reports"
              description="There's no reporting endpoint on the backend yet, so this section has nothing to show. It'll come to life once that's added."
            />
          </ProtectedRoute>
        }
      />

      {/* Inspector */}
      <Route path="/dashboard/inspector" element={<ProtectedRoute role="inspector"><InspectorDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/inspector/assets" element={<ProtectedRoute role="inspector"><AssetsPage role="inspector" /></ProtectedRoute>} />
      <Route path="/dashboard/inspector/assets/:id" element={<ProtectedRoute role="inspector"><AssetDetailPage role="inspector" /></ProtectedRoute>} />
      <Route path="/dashboard/inspector/inspections" element={<ProtectedRoute role="inspector"><InspectionsPage role="inspector" /></ProtectedRoute>} />
      <Route path="/dashboard/inspector/inspections/new" element={<ProtectedRoute role="inspector"><NewInspectionPage /></ProtectedRoute>} />
      <Route path="/dashboard/inspector/inspections/:id" element={<ProtectedRoute role="inspector"><InspectionDetailPage role="inspector" /></ProtectedRoute>} />
      <Route path="/dashboard/inspector/settings" element={<ProtectedRoute role="inspector"><SettingsPage role="inspector" /></ProtectedRoute>} />
      <Route
        path="/dashboard/inspector/alerts"
        element={
          <ProtectedRoute role="inspector">
            <ComingSoonPage
              role="inspector"
              icon={Bell}
              title="Alerts"
              description="There's no alerts table or API on the backend yet, so this section has nothing to show. It'll come to life once that's added."
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
