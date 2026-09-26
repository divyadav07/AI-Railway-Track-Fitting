import { useState, useMemo } from "react";
import { Search, MapPin, Check } from "lucide-react";
import StatusPill, { healthColor } from "../../dashboard/StatusPill.jsx";
import { assets } from "../../../data/assetsData.js";

export default function StepAsset({ selected, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return assets;
    return assets.filter(
      (a) => a.id.toLowerCase().includes(q) || a.location.toLowerCase().includes(q) || a.type.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="text-[0.95rem] font-semibold text-brand-text">Select the fitting to inspect</h3>
      <p className="mt-1 text-[0.82rem] text-brand-sub">
        Scan the QR code on site or search by asset ID / location below.
      </p>

      <div className="relative mt-4">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-sub" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search asset ID, location, or type…"
          className="w-full rounded-lg border border-brand-border bg-white py-2.5 pl-10 pr-4 text-[0.87rem] text-brand-text placeholder:text-brand-sub/70 outline-none transition-colors focus:border-brand-mint"
        />
      </div>

      <div className="mt-4 max-h-[420px] space-y-2.5 overflow-y-auto pr-1">
        {filtered.map((a) => {
          const active = selected?.id === a.id;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onSelect(a)}
              className={`flex w-full items-center justify-between gap-4 rounded-xl border p-3.5 text-left transition-colors ${
                active ? "border-brand-mint bg-brand-mint/[0.06]" : "border-brand-border hover:border-brand-mint/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.78rem] font-medium ${
                    active ? "bg-brand-mint text-brand-bg" : "bg-brand-off text-brand-sub"
                  }`}
                >
                  {active ? <Check size={15} strokeWidth={3} /> : a.id}
                </span>
                <div>
                  <div className="text-[0.87rem] font-medium text-brand-text">
                    {a.type} · {a.id}
                  </div>
                  <div className="flex items-center gap-1 text-[0.75rem] text-brand-sub">
                    <MapPin size={11} /> {a.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[0.8rem] font-medium ${healthColor(a.health)}`}>{a.health}%</span>
                <StatusPill status={a.status} />
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-[0.85rem] text-brand-sub">No assets match your search.</p>
        )}
      </div>
    </div>
  );
}
