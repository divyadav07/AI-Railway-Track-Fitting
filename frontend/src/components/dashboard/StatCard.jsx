import { ArrowUp, ArrowDown, Layers, CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";

const toneStyles = {
  info: { bg: "bg-brand-infoBg", fg: "text-brand-info" },
  ok: { bg: "bg-brand-okBg", fg: "text-brand-ok" },
  warn: { bg: "bg-brand-warnBg", fg: "text-brand-warn" },
  crit: { bg: "bg-brand-critBg", fg: "text-brand-crit" },
};

const toneIcon = {
  info: Layers,
  ok: CheckCircle2,
  warn: AlertTriangle,
  crit: AlertOctagon,
};

export function StatCard({ label, value, delta, trend, tone }) {
  const { bg, fg } = toneStyles[tone];
  const Icon = toneIcon[tone];
  const TrendIcon = trend === "up" ? ArrowUp : ArrowDown;
  const trendColor = trend === "up" ? "text-brand-ok" : "text-brand-crit";

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}>
          <Icon size={18} className={fg} strokeWidth={2} />
        </span>
        <span className="text-[0.85rem] text-brand-sub">{label}</span>
      </div>

      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="text-[1.7rem] font-semibold leading-none text-brand-text">
          {value.toLocaleString()}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[0.78rem]">
        <span className={`flex items-center gap-0.5 font-medium ${trendColor}`}>
          <TrendIcon size={13} strokeWidth={2.5} />
          {delta}%
        </span>
        <span className="text-brand-sub">vs last month</span>
      </div>
    </div>
  );
}

export function AverageHealthCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-okBg">
          <CheckCircle2 size={18} className="text-brand-ok" strokeWidth={2} />
        </span>
        <span className="text-[0.85rem] text-brand-sub">Average Asset Health</span>
      </div>

      <div className="mt-3 text-[1.7rem] font-semibold leading-none text-brand-text">{value}%</div>

      <div className="mt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-off">
          <div className="h-full rounded-full bg-brand-ok" style={{ width: `${value}%` }} />
        </div>
        <div className="mt-1.5 text-[0.78rem] text-brand-sub">{label}</div>
      </div>
    </div>
  );
}
