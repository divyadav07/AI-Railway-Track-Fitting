import { useState } from "react";
import { Bell, ShieldCheck, ScanEye, Save } from "lucide-react";
import AppShell from "../components/AppShell";
import { useAuth } from "../context/AuthContext";

// On/off switch used for the notification options.
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-blue-600" : "bg-slate-200"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white dark:bg-slate-800 shadow transition ${
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
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-0.5 text-[13.5px] text-slate-500 dark:text-slate-400">
          Manage your profile, alert preferences, and AI detection sensitivity.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4.5 w-4.5 text-blue-600" />
            <h2 className="text-[14.5px] font-semibold text-slate-900 dark:text-white">Profile</h2>
          </div>
          <div className="space-y-3.5">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-200">Full Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-[13.5px] text-slate-800 dark:text-slate-100 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-200">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-[13.5px] text-slate-800 dark:text-slate-100 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-200">Role</span>
              <input
                value={user?.Role || ""}
                disabled
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2.5 text-[13.5px] text-slate-500 dark:text-slate-400"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="text-[14.5px] font-semibold text-slate-900 dark:text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13.5px] font-medium text-slate-800 dark:text-slate-100">Critical alerts</p>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400">Notify immediately when an asset turns critical</p>
                </div>
                <Toggle checked={notifyCritical} onChange={setNotifyCritical} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13.5px] font-medium text-slate-800 dark:text-slate-100">Weekly summary</p>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400">Email a digest of inspections every Monday</p>
                </div>
                <Toggle checked={notifyWeekly} onChange={setNotifyWeekly} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <ScanEye className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="text-[14.5px] font-semibold text-slate-900 dark:text-white">AI Detection</h2>
            </div>
            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-[13px] font-medium text-slate-700 dark:text-slate-200">
                Minimum confidence threshold
                <span className="font-semibold text-slate-500 dark:text-slate-400">{confidenceThreshold}%</span>
              </span>
              <input
                type="range"
                min={50}
                max={99}
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="mt-1 block text-[11.5px] text-slate-400">
                Defects detected below this confidence are hidden from reports.
              </span>
            </label>
          </div>
        </div>

        <div className="lg:col-span-2">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </form>
    </AppShell>
  );
}
