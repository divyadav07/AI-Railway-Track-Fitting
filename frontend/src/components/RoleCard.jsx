import { ShieldCheck, HardHat } from "lucide-react";

const icons = {
  admin: ShieldCheck,
  inspector: HardHat,
};

export default function RoleCard({ roleKey, label, sub, active, onClick }) {
  const Icon = icons[roleKey];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-4 text-center transition-all duration-200 ${
        active
          ? "border-signal-500 bg-signal-500/[0.08] shadow-glow"
          : "border-sand-300 bg-white hover:border-ink-900/20 hover:bg-sand-50"
      }`}
    >
      <Icon
        size={20}
        strokeWidth={1.75}
        className={active ? "text-signal-600" : "text-ink-900/50 group-hover:text-ink-900/70"}
      />
      <div>
        <div className={`text-[0.9rem] font-medium ${active ? "text-ink-950" : "text-ink-900"}`}>
          {label}
        </div>
        {sub && <div className="mt-0.5 text-[0.72rem] text-ink-900/45">{sub}</div>}
      </div>
    </button>
  );
}
