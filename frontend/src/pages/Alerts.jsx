import { AlertTriangle, AlertCircle, Info, BellRing } from "lucide-react";
import AppShell from "../components/AppShell";
import { MOCK_ALERTS } from "../data/mockData";

// Icon + colours per alert severity.
const SEVERITY_STYLES = {
  critical: {
    icon: AlertTriangle,
    tint: "border-red-200 bg-red-50 text-red-700",
    iconTint: "text-red-500",
  },
  warning: {
    icon: AlertCircle,
    tint: "border-amber-200 bg-amber-50 text-amber-700",
    iconTint: "text-amber-500",
  },
  info: {
    icon: Info,
    tint: "border-blue-200 bg-blue-50 text-blue-700",
    iconTint: "text-blue-500",
  },
};

// Alerts page. Uses sample data (MOCK_ALERTS) - the backend has no alerts endpoint yet.
export default function Alerts() {
  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Alerts</h1>
          <p className="mt-0.5 text-[13.5px] text-slate-500 dark:text-slate-400">
            Critical health scores, detected defects, and upcoming maintenance.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-2 text-[13px] font-semibold text-blue-700">
          <BellRing className="h-4 w-4" />
          {MOCK_ALERTS.length} active
        </span>
      </div>

      <div className="space-y-3">
        {MOCK_ALERTS.map((alert) => {
          const style = SEVERITY_STYLES[alert.Severity] || SEVERITY_STYLES.info;
          const Icon = style.icon;
          return (
            <div
              key={alert.ID}
              className={`flex items-start gap-3 rounded-2xl border bg-white dark:bg-slate-800 p-4 shadow-sm ${style.tint}`}
            >
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconTint}`} />
              <div className="flex-1">
                <p className="text-[13.5px] font-semibold text-slate-900 dark:text-white">{alert.Title}</p>
                <p className="text-[13px] text-slate-600 dark:text-slate-300">{alert.Message}</p>
                <p className="mt-1 text-[11.5px] text-slate-400">{alert.Date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
