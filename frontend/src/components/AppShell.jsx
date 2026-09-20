import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  TrainFront,
  Boxes,
  ScanEye,
  FileBarChart,
  BellRing,
  Users as UsersIcon,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Search,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
// Sample alert count used for the sidebar/bell badges - the backend has no
// alerts endpoint yet, so this is frontend-only placeholder data (see data/mockData.js).
import { MOCK_RECENT_ALERTS } from "../data/mockData";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assets", label: "Assets", icon: Boxes },
  { to: "/inspections", label: "Inspection", icon: ScanEye },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/alerts", label: "Alerts", icon: BellRing, badge: MOCK_RECENT_ALERTS.length },
  { to: "/users", label: "Users", icon: UsersIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

// Left navigation menu (links to each page) plus the current user's role at the bottom.
function SidebarContent({ onNavigate, user }) {
  return (
    <>
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-600">
          <TrainFront className="h-5 w-5 text-white" />
        </span>
        <span className="text-[13.5px] font-semibold leading-tight text-white">
          AI <span className="text-blue-400">RAILWAY</span>
          <br />
          <span className="text-[9px] font-medium tracking-[0.18em] text-slate-400">
            TRACK FITTING
          </span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-900/40"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon className="h-4.5 w-4.5" />
            <span className="flex-1">{label}</span>
            {badge ? (
              <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-red-500 px-1 text-[10.5px] font-bold text-white">
                {badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 mb-4 flex items-center gap-3 rounded-2xl bg-white/5 px-3.5 py-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600 text-[13px] font-semibold text-white">
          {(user?.Name || "U").charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white">{user?.Role || "Inspector"}</p>
          <p className="truncate text-[12.5px] text-slate-300">{user?.Name || "Guest"}</p>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Online
        </span>
      </div>
    </>
  );
}

const THEME_KEY = "ai_railway_theme";

// Reads the saved light/dark choice from localStorage. Falls back to the OS-level
// preference (prefers-color-scheme) the very first time, so the app doesn't default
// to light mode for someone whose system is set to dark.
function getInitialDarkMode() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;
  } catch {
    // localStorage unavailable (e.g. private browsing) - fall through to OS preference.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

// Hook returning the current Date, refreshed every 30 seconds (drives the header clock).
function useLiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

// Page layout used by every logged-in page: sidebar, top bar (search, alerts, profile menu,
// logout) and the page content passed in as `children`.
export default function AppShell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [search, setSearch] = useState("");
  const now = useLiveClock();

  // Remembers the chosen theme across page loads/navigation (every page remounts
  // AppShell, so without this the toggle would silently reset to light on every visit).
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
    } catch {
      // Ignore storage errors - theme just won't persist for this session.
    }
  }, [darkMode]);

  const activeLabel =
    NAV_ITEMS.find((n) => n.to === window.location.pathname)?.label || "Dashboard";

  const dateLabel = now.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeLabel = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Header search: sends the typed text to the Assets page, which filters its table with it.
  const handleSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    // Assets.jsx picks this up from location.state on mount.
    navigate("/assets", { state: { search: q } });
  };

  return (
    // Tailwind's `dark:` utilities only activate inside an ancestor with the literal
    // class "dark" (tailwind.config.js sets darkMode: "class" for this). Toggling this
    // class is what switches every dark:* class below on/off.
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-800 bg-[#0b1120] lg:flex">
          <SidebarContent user={user} />
        </aside>

        {/* Mobile sidebar drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-slate-900/50"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative flex h-full w-64 flex-col bg-[#0b1120]">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/10"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <SidebarContent user={user} onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-4 py-3 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 lg:hidden"
              >
                <Menu className="h-4.5 w-4.5" />
              </button>
              <h1 className="hidden text-[15px] font-semibold text-slate-900 dark:text-white md:block">
                {activeLabel}
              </h1>
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden max-w-md flex-1 items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 text-slate-500 dark:text-slate-400 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 sm:flex"
            >
              <Search className="h-4 w-4 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assets, track, location, QR code..."
                className="w-full bg-transparent px-2.5 text-[13px] text-slate-700 dark:text-slate-200 outline-none placeholder:text-slate-400"
              />
            </form>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-[12.5px] font-medium text-slate-600 dark:text-slate-300 lg:flex">
                <span>{dateLabel}</span>
                <span className="text-slate-300">|</span>
                <span>{timeLabel}</span>
              </div>

              <button
                onClick={() => navigate("/alerts")}
                aria-label="Notifications"
                className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-700/60"
              >
                <BellRing className="h-4.5 w-4.5" />
                {MOCK_RECENT_ALERTS.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4.5 min-w-[18px] place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {MOCK_RECENT_ALERTS.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setDarkMode((d) => !d)}
                aria-label="Toggle theme"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-700/60"
              >
                {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-xl border border-transparent py-1 pl-1 pr-2 transition hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-200 text-[12px] font-semibold text-slate-600 dark:text-slate-300">
                    {(user?.Name || "U").charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-[12.5px] font-semibold leading-tight text-slate-800 dark:text-slate-100">
                      {user?.Role || "Inspector"}
                    </span>
                    <span className="block text-[11px] leading-tight text-slate-400">
                      {user?.Name || "Guest"}
                    </span>
                  </span>
                  <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-1 shadow-lg">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/settings");
                      }}
                      className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[13px] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60"
                    >
                      <SettingsIcon className="h-4 w-4" />
                      Settings
                    </button>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[13px] text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
