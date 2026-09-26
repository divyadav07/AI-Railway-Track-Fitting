import { healthColor } from "../dashboard/StatusPill.jsx";

export function healthBarColor(value) {
  if (value < 40) return "bg-brand-crit";
  if (value < 70) return "bg-brand-warn";
  return "bg-brand-ok";
}

export default function AssetHealthBar({ value, showLabel = true, className = "" }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        {showLabel && (
          <span className={`text-[0.8rem] font-medium ${healthColor(value)}`}>{value}%</span>
        )}
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-brand-off">
        <div className={`h-full rounded-full ${healthBarColor(value)}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
