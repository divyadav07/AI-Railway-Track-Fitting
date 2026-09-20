import { TrainFront } from "lucide-react";

// App logo (train icon + "AI RAILWAY TRACK FITTING" text).
export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10">
        <TrainFront className="h-5 w-5 text-sky-300" />
      </span>
      <span className="text-[15px] font-semibold leading-tight text-white">
        AI <span className="text-sky-400">RAILWAY</span>
        <br />
        <span className="text-[10px] font-medium tracking-[0.2em] text-slate-300">
          TRACK FITTING
        </span>
      </span>
    </div>
  );
}
