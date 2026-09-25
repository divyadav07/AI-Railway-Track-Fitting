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
  Healthy: "border-mint-200 dark:border-mint-500/30 bg-mint-50 dark:bg-mint-500/10 text-mint-800 dark:text-mint-300",
  "Needs Inspection": "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Critical: "border-rust-200 dark:border-rust-500/30 bg-rust-50 dark:bg-rust-500/10 text-rust-700 dark:text-rust-300",
  // Legacy values from older rows still render sensibly.
  Active: "border-mint-200 dark:border-mint-500/30 bg-mint-50 dark:bg-mint-500/10 text-mint-800 dark:text-mint-300",
  "Needs Repair": "border-rust-200 dark:border-rust-500/30 bg-rust-50 dark:bg-rust-500/10 text-rust-700 dark:text-rust-300",
  "Under Maintenance": "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Decommissioned: "border-ink-200 dark:border-ink-700 bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300",
};

// Coloured pill showing an asset's Status (Healthy / Needs Inspection / Critical).
export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "border-ink-200 dark:border-ink-700 bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300";
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
  if (value >= 75) return { bar: "bg-mint-500", text: "text-mint-800 dark:text-mint-300" };
  if (value >= 45) return { bar: "bg-amber-500", text: "text-amber-700 dark:text-amber-300" };
  return { bar: "bg-rust-500", text: "text-rust-700 dark:text-rust-300" };
}

// Progress bar + percentage for an asset's CurrentHealth (0-100).
export function HealthBar({ value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  const { bar, text } = healthColor(v);
  return (
    <div className="flex min-w-[110px] items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${v}%` }} />
      </div>
      <span className={`text-[12px] font-semibold ${text}`}>{v}%</span>
    </div>
  );
}
