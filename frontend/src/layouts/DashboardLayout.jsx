import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/Topbar.jsx";

const users = {
  admin: { name: "Admin", role: "Administrator", initials: "AD" },
  inspector: { name: "Rahul Sharma", role: "Inspector", initials: "RS" },
};

export default function DashboardLayout({ children, role = "admin" }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-off font-display">
      <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} role={role} />

      <div className="lg:pl-[248px]">
        <Topbar user={users[role]} onMenuClick={() => setMobileNavOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
