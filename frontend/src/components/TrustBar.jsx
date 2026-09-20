import { ScanEye, Target, ShieldCheck, TrainFront } from "lucide-react";

// Feature highlights shown under the login/sign-up card.
const FEATURES = [
  { icon: ScanEye, title: "AI Vision", desc: "Smart image analysis" },
  { icon: Target, title: "High Accuracy", desc: "Detects even minor faults" },
  { icon: ShieldCheck, title: "Secure & Reliable", desc: "Your data is protected" },
  { icon: TrainFront, title: "Built for Railways", desc: "Designed for real-world use" },
];

// Row of four feature highlights (AI Vision, High Accuracy, ...).
export default function TrustBar() {
  return (
    <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-4 rounded-2xl bg-black/30 p-5 backdrop-blur-sm sm:grid-cols-4">
      {FEATURES.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10">
            <Icon className="h-4 w-4 text-sky-300" />
          </span>

          <div>
            <p className="text-[12.5px] font-semibold text-white">{title}</p>
            <p className="text-[11px] text-slate-300">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}