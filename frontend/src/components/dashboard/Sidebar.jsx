import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Camera,
  Wrench,
  Bell,
  Users,
  FileBarChart,
  Settings,
  LogOut,
  TrainFront,
} from "lucide-react";

const navItems = [
  { to: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/assets", label: "Assets", icon: Boxes },
  { to: "/dashboard/inspections", label: "Inspections", icon: Camera },
  { to: "/dashboard/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/dashboard/alerts", label: "Alerts", icon: Bell, badge: 3 },
  { to: "/dashboard/users", label: "Users", icon: Users },
  { to: "/dashboard/reports", label: "Reports", icon: FileBarChart },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col bg-brand-bg transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:z-30`}
      >
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mint/15">
          <TrainFront size={20} className="text-brand-mint" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-[1.05rem] font-semibold leading-tight text-white">
            RailSentry
          </div>
          <div className="truncate text-[0.72rem] text-white/45">Track Fitting Inspection</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-2 flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon, badge, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center justify-between rounded-lg px-3.5 py-2.5 text-[0.87rem] transition-colors duration-150 ${
                isActive
                  ? "bg-brand-mint text-brand-bg font-medium"
                  : "text-white/60 hover:bg-white/[0.06] hover:text-white/90"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-3">
                  <Icon size={17} strokeWidth={1.9} />
                  {label}
                </span>
                {badge ? (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.68rem] font-medium ${
                      isActive ? "bg-brand-bg text-brand-mint" : "bg-brand-crit text-white"
                    }`}
                  >
                    {badge}
                  </span>
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/[0.08] px-3 py-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-[0.87rem] text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white/90">
          <LogOut size={17} strokeWidth={1.9} />
          Logout
        </button>
      </div>
      </aside>
    </>
  );
}
