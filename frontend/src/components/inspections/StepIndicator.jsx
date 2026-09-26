import { Check } from "lucide-react";

export default function StepIndicator({ steps, currentIndex }) {
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-medium transition-colors ${
                  done
                    ? "bg-brand-mint text-brand-bg"
                    : active
                    ? "border-2 border-brand-mint text-brand-mint"
                    : "border border-brand-border text-brand-sub"
                }`}
              >
                {done ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={`hidden text-[0.72rem] sm:block ${
                  active ? "font-medium text-brand-text" : "text-brand-sub"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-2 h-px flex-1 ${done ? "bg-brand-mint" : "bg-brand-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
