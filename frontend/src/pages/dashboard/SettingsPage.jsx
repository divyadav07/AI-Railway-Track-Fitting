import { Settings as SettingsIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[0.75rem] font-medium uppercase tracking-wide text-brand-sub">{label}</div>
      <div className="mt-1 text-[0.95rem] text-brand-text">{value || "—"}</div>
    </div>
  );
}

export default function SettingsPage({ role = "admin" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <DashboardLayout role={role}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-bg">
          <SettingsIcon size={19} className="text-brand-mint" strokeWidth={1.9} />
        </span>
        <div>
          <h1 className="text-[1.4rem] font-semibold leading-tight text-brand-text">Settings</h1>
          <p className="text-[0.85rem] text-brand-sub">Your account details</p>
        </div>
      </div>

      <div className="mt-6 max-w-lg rounded-2xl border border-brand-border bg-brand-card p-6">
        <h2 className="text-[0.95rem] font-semibold text-brand-text">Profile</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Name" value={user?.Name} />
          <Field label="Role" value={user?.Role} />
          <Field label="Email" value={user?.Email} />
          <Field label="Phone" value={user?.Phone} />
        </div>
        <p className="mt-5 text-[0.78rem] text-brand-sub">
          Editing profile details and changing your password isn't wired up to the
          backend yet — there's no update-profile endpoint on the server for this
          to save to.
        </p>
      </div>

      <div className="mt-6 max-w-lg rounded-2xl border border-brand-border bg-brand-card p-6">
        <h2 className="text-[0.95rem] font-semibold text-brand-text">Session</h2>
        <p className="mt-2 text-[0.85rem] text-brand-sub">Sign out of RailSentry on this device.</p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 rounded-lg border border-brand-border px-4 py-2.5 text-[0.85rem] font-medium text-brand-text transition-colors hover:bg-brand-off"
        >
          <LogOut size={16} strokeWidth={1.9} />
          Log out
        </button>
      </div>
    </DashboardLayout>
  );
}
