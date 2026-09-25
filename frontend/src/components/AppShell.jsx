import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
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
import Logo from "./Logo";
import { roleLabel } from "./RoleSelect";

// Alert badge counts start at 0 until a real alerts endpoint exists on the backend.
const ALERTS_COUNT = 0;

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assets", label: "Assets", icon: Boxes },
  { to: "/inspections", label: "Inspection", icon: ScanEye },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/alerts", label: "Alerts", icon: BellRing, badge: ALERTS_COUNT },
  { to: "/users", label: "Users", icon: UsersIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

// Left navigation menu (links to each page) plus the current user's role at the bottom.
function SidebarContent({ onNavigate, user }) {
  return (
    <>
      <div className="px-5 py-6">
        <Logo tone="light" to="/dashboard" />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-[13.5px] font-medium transition ${
                isActive
                  ? "border-mint/35 bg-mint/[0.08] text-mint"
                  : "border-transparent text-white/55 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon className="h-4.5 w-4.5" />
            <span className="flex-1">{label}</span>
            {badge ? (
              <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-rust px-1 text-[10.5px] font-bold text-white">
                {badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-light px-3.5 py-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-mint to-mint-deep text-[13px] font-semibold text-ink-dark">
          {(user?.Name || "U").charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white">{roleLabel(user?.Role)}</p>
          <p className="truncate text-[12.5px] text-white/50">{user?.Name || "Guest"}</p>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-medium text-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
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
      <div className="flex min-h-screen bg-fog dark:bg-ink">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-ink lg:flex">
          <SidebarContent user={user} />
        </aside>

        {/* Mobile sidebar drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-ink-dark/60"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative flex h-full w-64 flex-col bg-ink">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-lg text-white/60 hover:bg-white/10"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <SidebarContent user={user} onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-ink-200 dark:border-ink-700 bg-fog/90 dark:bg-ink/90 px-4 py-3 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-white/5 lg:hidden"
              >
                <Menu className="h-4.5 w-4.5" />
              </button>
              <h1 className="hidden font-display text-[1.15rem] font-medium text-ink dark:text-white md:block">
                {activeLabel}
              </h1>
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden max-w-md flex-1 items-center rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-900 px-3.5 py-2 text-ink-500 dark:text-ink-400 focus-within:border-mint-600 focus-within:ring-2 focus-within:ring-mint/20 sm:flex"
            >
              <Search className="h-4 w-4 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assets, track, location, QR code..."
                className="w-full bg-transparent px-2.5 text-[13px] text-ink-700 dark:text-ink-200 outline-none placeholder:text-ink-400"
              />
            </form>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-lg border border-ink-200 dark:border-ink-700 px-3 py-2 text-[12.5px] font-medium text-ink-600 dark:text-ink-300 lg:flex">
                <span>{dateLabel}</span>
                <span className="text-ink-300">|</span>
                <span>{timeLabel}</span>
              </div>

              <button
                onClick={() => navigate("/alerts")}
                aria-label="Notifications"
                className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 transition hover:bg-ink-50 dark:hover:bg-white/5"
              >
                <BellRing className="h-4.5 w-4.5" />
                {ALERTS_COUNT > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4.5 min-w-[18px] place-items-center rounded-full bg-rust px-1 text-[10px] font-bold text-white">
                    {ALERTS_COUNT}
                  </span>
                )}
              </button>

              <button
                onClick={() => setDarkMode((d) => !d)}
                aria-label="Toggle theme"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 transition hover:bg-ink-50 dark:hover:bg-white/5"
              >
                {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg border border-transparent py-1 pl-1 pr-2 transition hover:border-ink-200 hover:bg-ink-50 dark:hover:bg-white/5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-200 dark:bg-ink-700 text-[12px] font-semibold text-ink-600 dark:text-ink-200">
                    {(user?.Name || "U").charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-[12.5px] font-semibold leading-tight text-ink-800 dark:text-ink-100">
                      {roleLabel(user?.Role)}
                    </span>
                    <span className="block text-[11px] leading-tight text-ink-400">
                      {user?.Name || "Guest"}
                    </span>
                  </span>
                  <ChevronDown className="hidden h-3.5 w-3.5 text-ink-400 sm:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 py-1 shadow-lg">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/settings");
                      }}
                      className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[13px] text-ink-600 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-white/5"
                    >
                      <SettingsIcon className="h-4 w-4" />
                      Settings
                    </button>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[13px] text-rust-600 hover:bg-rust-50 dark:text-rust-300 dark:hover:bg-rust-500/10"
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
