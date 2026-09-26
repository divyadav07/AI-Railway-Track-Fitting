import { Bell } from "lucide-react";

const dotTone = { crit: "bg-brand-crit", warn: "bg-brand-warn", info: "bg-brand-info" };

export default function AlertsPanel({ data }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="flex items-center gap-2 text-[0.95rem] font-semibold text-brand-text">
        <Bell size={16} className="text-brand-sub" strokeWidth={1.9} />
        Important Alerts
      </h3>

      <ul className="mt-4 space-y-4">
        {data.map((a) => (
          <li key={a.id} className="flex items-start gap-3">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotTone[a.tone]}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[0.85rem] font-medium text-brand-text">{a.title}</span>
                <span className="shrink-0 text-[0.72rem] text-brand-sub">{a.time}</span>
              </div>
              <p className="mt-0.5 text-[0.78rem] text-brand-sub">{a.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
