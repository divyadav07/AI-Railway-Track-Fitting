import { TrainFront } from "lucide-react";

export default function Logo({ variant = "dark", className = "" }) {
  const textColor = variant === "dark" ? "text-white" : "text-ink-900";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-signal-500">
        <TrainFront size={17} className="text-ink-950" strokeWidth={2} />
      </span>
      <span className={`font-display text-[1.2rem] leading-none tracking-tight ${textColor}`}>
        RailSentry
      </span>
    </div>
  );
}
