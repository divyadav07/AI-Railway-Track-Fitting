import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/Topbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function initialsOf(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function DashboardLayout({ children, role = "admin" }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user } = useAuth();

  const displayUser = {
    name: user?.Name || (role === "admin" ? "Admin" : "Inspector"),
    role: role === "admin" ? "Administrator" : "Inspector",
    initials: initialsOf(user?.Name),
  };

  return (
    <div className="min-h-screen bg-brand-off font-display">
      <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} role={role} />

      <div className="lg:pl-[248px]">
        <Topbar user={displayUser} onMenuClick={() => setMobileNavOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
