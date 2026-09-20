// These must match the Status values the backend filters on in
// dashboard.model.js ('Healthy' / 'Needs Inspection' / 'Critical'); otherwise
// the dashboard counters would never see assets created from this UI.
export const STATUS_OPTIONS = ["Healthy", "Needs Inspection", "Critical"];

// Suggested fitting types offered in the Add/Edit asset form (free text is still allowed).
export const FITTING_TYPE_OPTIONS = [
  "Rail Clip",
  "Sleeper",
  "Fish Plate",
  "Bolt",
  "Rail Pad",
  "Fastener",
];

// Badge colours per status.
const STATUS_STYLES = {
  Healthy: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Needs Inspection": "border-amber-200 bg-amber-50 text-amber-700",
  Critical: "border-red-200 bg-red-50 text-red-700",
  // Legacy values from older rows still render sensibly.
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Needs Repair": "border-red-200 bg-red-50 text-red-700",
  "Under Maintenance": "border-amber-200 bg-amber-50 text-amber-700",
  Decommissioned: "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
};

// Coloured pill showing an asset's Status (Healthy / Needs Inspection / Critical).
export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] font-medium ${style}`}
    >
      {status || "Unknown"}
    </span>
  );
}

// Maps a health % to a colour: 75+ green, 45-74 amber, below 45 red.
function healthColor(value) {
  if (value >= 75) return { bar: "bg-emerald-500", text: "text-emerald-700" };
  if (value >= 45) return { bar: "bg-amber-500", text: "text-amber-700" };
  return { bar: "bg-red-500", text: "text-red-700" };
}

// Progress bar + percentage for an asset's CurrentHealth (0-100).
export function HealthBar({ value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  const { bar, text } = healthColor(v);
  return (
    <div className="flex min-w-[110px] items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${v}%` }} />
      </div>
      <span className={`text-[12px] font-semibold ${text}`}>{v}%</span>
    </div>
  );
}
