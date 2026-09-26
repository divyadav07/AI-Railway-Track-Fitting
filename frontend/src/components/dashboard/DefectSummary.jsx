import { Flame, Zap, Bolt, CircleDot, ArrowUp, ArrowDown } from "lucide-react";

const icons = { rust: Flame, cracks: Zap, bolts: Bolt, other: CircleDot };

export default function DefectSummary({ data }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="text-[0.95rem] font-semibold text-brand-text">Defect Summary</h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map((d) => {
          const Icon = icons[d.key];
          const TrendIcon = d.trend === "up" ? ArrowUp : ArrowDown;
          const trendColor = d.trend === "up" ? "text-brand-crit" : "text-brand-ok";
          return (
            <div key={d.key} className="rounded-xl border border-brand-border/70 p-3.5">
              <Icon size={18} className="text-brand-sub" strokeWidth={1.8} />
              <div className="mt-2 text-[1.15rem] font-semibold text-brand-text">{d.value}</div>
              <div className="text-[0.75rem] text-brand-sub">{d.label}</div>
              <div className={`mt-1 flex items-center gap-0.5 text-[0.72rem] font-medium ${trendColor}`}>
                <TrendIcon size={11} strokeWidth={2.5} />
                {d.delta}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
