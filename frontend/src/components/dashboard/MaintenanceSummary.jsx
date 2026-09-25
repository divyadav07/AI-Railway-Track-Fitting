import { Wrench } from "lucide-react";

const toneText = {
  warn: "text-brand-warn",
  info: "text-brand-info",
  ok: "text-brand-ok",
};

export default function MaintenanceSummary({ data }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="flex items-center gap-2 text-[0.95rem] font-semibold text-brand-text">
        <Wrench size={16} className="text-brand-sub" strokeWidth={1.9} />
        Maintenance Summary
      </h3>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {data.map((d) => (
          <div key={d.key} className="rounded-xl border border-brand-border/70 p-3.5 text-center">
            <div className={`text-[1.3rem] font-semibold ${toneText[d.tone]}`}>{d.value}</div>
            <div className="mt-1 text-[0.75rem] text-brand-sub">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
