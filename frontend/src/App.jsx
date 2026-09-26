import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import InspectorDashboard from "./pages/dashboard/InspectorDashboard.jsx";
import AssetsPage from "./pages/assets/AssetsPage.jsx";
import AssetDetailPage from "./pages/assets/AssetDetailPage.jsx";
import InspectionsPage from "./pages/inspections/InspectionsPage.jsx";
import InspectionDetailPage from "./pages/inspections/InspectionDetailPage.jsx";
import NewInspectionPage from "./pages/inspections/NewInspectionPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin */}
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/admin/assets" element={<AssetsPage role="admin" />} />
      <Route path="/dashboard/admin/assets/:id" element={<AssetDetailPage role="admin" />} />
      <Route path="/dashboard/admin/inspections" element={<InspectionsPage role="admin" />} />
      <Route path="/dashboard/admin/inspections/:id" element={<InspectionDetailPage role="admin" />} />

      {/* Inspector */}
      <Route path="/dashboard/inspector" element={<InspectorDashboard />} />
      <Route path="/dashboard/inspector/assets" element={<AssetsPage role="inspector" />} />
      <Route path="/dashboard/inspector/assets/:id" element={<AssetDetailPage role="inspector" />} />
      <Route path="/dashboard/inspector/inspections" element={<InspectionsPage role="inspector" />} />
      <Route path="/dashboard/inspector/inspections/new" element={<NewInspectionPage />} />
      <Route path="/dashboard/inspector/inspections/:id" element={<InspectionDetailPage role="inspector" />} />
    </Routes>
  );
}
