import { useState } from "react";
import { Bell, ShieldCheck, ScanEye, Save } from "lucide-react";
import AppShell from "../components/AppShell";
import { useAuth } from "../context/AuthContext";
import { roleLabel } from "../components/RoleSelect";

// On/off switch used for the notification options.
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-mint-600" : "bg-ink-200"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white dark:bg-ink-800 shadow transition ${
          checked ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

// Settings page (UI only): profile, notifications and AI confidence threshold. Nothing is saved to the backend yet.
export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.Name || "");
  const [email, setEmail] = useState(user?.Email || "");
  const [notifyCritical, setNotifyCritical] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(80);
  const [saved, setSaved] = useState(false);

  // Shows a "Saved!" confirmation for 2 seconds (no API call yet).
  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="font-display text-[1.7rem] font-semibold leading-tight text-ink dark:text-white">Settings</h1>
        <p className="mt-0.5 text-[13.5px] text-ink-500 dark:text-ink-400">
          Manage your profile, alert preferences, and AI detection sensitivity.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4.5 w-4.5 text-mint-700 dark:text-mint-300" />
            <h2 className="font-display text-[17px] font-medium text-ink-900 dark:text-white">Profile</h2>
          </div>
          <div className="space-y-3.5">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink-700 dark:text-ink-200">Full Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2.5 text-[13.5px] text-ink-800 dark:text-ink-100 outline-none focus:border-mint-600 focus:ring-2 focus:ring-mint/20"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink-700 dark:text-ink-200">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2.5 text-[13.5px] text-ink-800 dark:text-ink-100 outline-none focus:border-mint-600 focus:ring-2 focus:ring-mint/20"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink-700 dark:text-ink-200">Role</span>
              <input
                value={user?.Role ? roleLabel(user.Role) : ""}
                disabled
                className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-900 px-3 py-2.5 text-[13.5px] text-ink-500 dark:text-ink-400"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-mint-700 dark:text-mint-300" />
              <h2 className="font-display text-[17px] font-medium text-ink-900 dark:text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13.5px] font-medium text-ink-800 dark:text-ink-100">Critical alerts</p>
                  <p className="text-[12px] text-ink-500 dark:text-ink-400">Notify immediately when an asset turns critical</p>
                </div>
                <Toggle checked={notifyCritical} onChange={setNotifyCritical} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13.5px] font-medium text-ink-800 dark:text-ink-100">Weekly summary</p>
                  <p className="text-[12px] text-ink-500 dark:text-ink-400">Email a digest of inspections every Monday</p>
                </div>
                <Toggle checked={notifyWeekly} onChange={setNotifyWeekly} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <ScanEye className="h-4.5 w-4.5 text-mint-700 dark:text-mint-300" />
              <h2 className="font-display text-[17px] font-medium text-ink-900 dark:text-white">AI Detection</h2>
            </div>
            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-[13px] font-medium text-ink-700 dark:text-ink-200">
                Minimum confidence threshold
                <span className="font-semibold text-ink-500 dark:text-ink-400">{confidenceThreshold}%</span>
              </span>
              <input
                type="range"
                min={50}
                max={99}
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-mint-600"
              />
              <span className="mt-1 block text-[11.5px] text-ink-400">
                Defects detected below this confidence are hidden from reports.
              </span>
            </label>
          </div>
        </div>

        <div className="lg:col-span-2">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg bg-mint px-5 py-2.5 text-[13.5px] font-semibold text-ink-dark shadow-sm shadow-mint/20 transition hover:bg-mint-deep"
          >
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </form>
    </AppShell>
  );
}
