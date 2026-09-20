import { ShieldCheck, TrainFront, Sparkles, Activity, TrendingUp } from "lucide-react";
import Logo from "./Logo";

// Decorative dotted background used inside the info panels.
function DotsGrid() {
  return (
    <div className="mb-1 grid grid-cols-3 gap-1 opacity-40">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-white" />
      ))}
    </div>
  );
}

// Blue marketing panel shown beside the login form.
export function LoginInfoPanel() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-b from-[#0b1830] via-[#0a1526] to-[#050a14] p-7 text-white">
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(56,132,255,0.25),transparent_60%)]" />
      </div>

      <div className="relative z-10">
        <DotsGrid />
        <div className="mt-4">
          <Logo />
        </div>
        <h2 className="mt-10 text-[26px] font-bold leading-snug">
          AI Powered
          <br />
          <span className="text-sky-400">Railway Fitting</span>
        </h2>
        <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-slate-300">
          Smart inspection. Accurate detection. Safer journeys.
        </p>
      </div>

      <div className="relative z-10 my-8 flex flex-1 items-center justify-center">
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-2xl border border-sky-400/40 bg-sky-400/10 shadow-[0_0_40px_rgba(56,189,255,0.35)]" />
          <span className="relative z-10 grid h-14 w-24 place-items-center text-sm font-bold tracking-wide text-sky-300">
            AI
          </span>
          <TrainFront className="absolute -bottom-6 -left-10 h-16 w-16 text-slate-100 drop-shadow-[0_0_20px_rgba(56,189,255,0.5)]" />
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-3 rounded-xl bg-white/5 p-3.5 backdrop-blur">
        <ShieldCheck className="h-5 w-5 shrink-0 text-sky-300" />
        <p className="text-[12px] leading-snug text-slate-200">
          Building the future of railway maintenance with Artificial Intelligence.
        </p>
      </div>

      <div className="relative z-10 mt-5 flex justify-center gap-1.5">
        <span className="h-1.5 w-4 rounded-full bg-sky-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
      </div>
    </div>
  );
}

// Blue marketing panel shown beside the sign-up form.
export function SignupInfoPanel() {
  const items = [
    { icon: Sparkles, title: "AI Powered Detection", desc: "Detect track issues with high accuracy" },
    { icon: Activity, title: "Real-time Monitoring", desc: "Monitor track conditions in real-time" },
    { icon: TrendingUp, title: "Better Maintenance", desc: "Predict issues and plan maintenance better" },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[#0a1526] p-7 text-white">
      <img
        src="https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=1200&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1526]/95 via-[#0a1526]/70 to-[#0a1526]/95" />

      <div className="relative z-10">
        <DotsGrid />
        <div className="mt-4">
          <Logo />
        </div>
        <p className="mt-9 text-[13px] text-slate-300">Join us in</p>
        <h2 className="text-[26px] font-bold leading-snug text-sky-400">
          Building Smarter
          <br />
          Railways
        </h2>
      </div>

      <div className="relative z-10 mt-10 flex flex-col gap-5">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10">
              <Icon className="h-4 w-4 text-sky-300" />
            </span>
            <div>
              <p className="text-[13.5px] font-semibold text-white">{title}</p>
              <p className="text-[12px] leading-snug text-slate-300">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
