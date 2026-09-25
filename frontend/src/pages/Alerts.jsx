import { AlertTriangle, AlertCircle, Info, BellRing } from "lucide-react";
import AppShell from "../components/AppShell";

// No alerts endpoint on the backend yet - starts empty (0) instead of sample data.
const ALERTS = [];

// Icon + colours per alert severity.
const SEVERITY_STYLES = {
  critical: {
    icon: AlertTriangle,
    tint: "border-rust-200 dark:border-rust-500/30 bg-rust-50 dark:bg-rust-500/10 text-rust-700 dark:text-rust-300",
    iconTint: "text-rust-500",
  },
  warning: {
    icon: AlertCircle,
    tint: "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300",
    iconTint: "text-amber-500",
  },
  info: {
    icon: Info,
    tint: "border-mist-200 dark:border-mist-500/30 bg-mist-50 dark:bg-mist-500/10 text-mist-700 dark:text-mist-300",
    iconTint: "text-mist-500",
  },
};

// Alerts page. No alerts endpoint on the backend yet, so this starts empty (0).
export default function Alerts() {
  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[1.7rem] font-semibold leading-tight text-ink dark:text-white">Alerts</h1>
          <p className="mt-0.5 text-[13.5px] text-ink-500 dark:text-ink-400">
            Critical health scores, detected defects, and upcoming maintenance.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-lg bg-mint-50 dark:bg-mint-500/10 px-3 py-2 text-[13px] font-semibold text-mint-800 dark:text-mint-300">
          <BellRing className="h-4 w-4" />
          {ALERTS.length} active
        </span>
      </div>

      <div className="space-y-3">
        {ALERTS.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 py-16 text-ink-400">
            <BellRing className="h-8 w-8" />
            <p className="text-[13.5px]">No alerts right now.</p>
          </div>
        ) : (
          ALERTS.map((alert) => {
            const style = SEVERITY_STYLES[alert.Severity] || SEVERITY_STYLES.info;
            const Icon = style.icon;
            return (
              <div
                key={alert.ID}
                className={`flex items-start gap-3 rounded-2xl border bg-white dark:bg-ink-800 p-4 shadow-sm ${style.tint}`}
              >
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconTint}`} />
                <div className="flex-1">
                  <p className="text-[13.5px] font-semibold text-ink-900 dark:text-white">{alert.Title}</p>
                  <p className="text-[13px] text-ink-600 dark:text-ink-300">{alert.Message}</p>
                  <p className="mt-1 text-[11.5px] text-ink-400">{alert.Date}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AppShell>
  );
}
