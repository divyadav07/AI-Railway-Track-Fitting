import { CheckCircle2, AlertOctagon, Layers } from "lucide-react";

const rows = [
  { key: "fitting", label: "Fitting Type Match", always: true },
  { key: "rust", label: "Rust" },
  { key: "crack", label: "Crack" },
  { key: "missingBolt", label: "Missing Bolt" },
];

export default function AIResultsPanel({ result }) {
  if (!result) return null;

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="text-[0.95rem] font-semibold text-brand-text">AI Analysis Results</h3>

      <div className="mt-4 space-y-3">
        {rows.map(({ key, label, always }) => {
          const r = result[key];
          if (!r) return null;
          const detected = always ? true : r.detected;
          const isDefect = !always && r.detected;

          return (
            <div
              key={key}
              className={`flex items-center justify-between gap-4 rounded-xl border p-3.5 ${
                isDefect ? "border-brand-crit/30 bg-brand-critBg" : "border-brand-border/70"
              }`}
            >
              <div className="flex items-center gap-3">
                {always ? (
                  <Layers size={17} className="text-brand-info" strokeWidth={1.9} />
                ) : isDefect ? (
                  <AlertOctagon size={17} className="text-brand-crit" strokeWidth={1.9} />
                ) : (
                  <CheckCircle2 size={17} className="text-brand-ok" strokeWidth={1.9} />
                )}
                <div>
                  <div className="text-[0.87rem] font-medium text-brand-text">{label}</div>
                  <div className="text-[0.75rem] text-brand-sub">
                    {always ? r.label : isDefect ? "Detected" : "Not detected"}
                  </div>
                </div>
              </div>

              <div className="w-28 shrink-0 text-right">
                <div className="text-[0.8rem] font-medium text-brand-text">{r.confidence}%</div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-brand-off">
                  <div
                    className={`h-full rounded-full ${
                      isDefect ? "bg-brand-crit" : always ? "bg-brand-info" : "bg-brand-ok"
                    }`}
                    style={{ width: `${r.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
