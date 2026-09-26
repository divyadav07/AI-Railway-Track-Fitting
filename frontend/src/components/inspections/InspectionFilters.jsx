import { Search } from "lucide-react";

export default function InspectionFilters({
  query,
  onQueryChange,
  inspector,
  onInspectorChange,
  status,
  onStatusChange,
  date,
  onDateChange,
  inspectors,
  statuses,
  showInspector = true,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 sm:min-w-[220px]">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-sub" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by inspection ID or asset…"
          className="w-full rounded-lg border border-brand-border bg-white py-2.5 pl-10 pr-4 text-[0.87rem] text-brand-text placeholder:text-brand-sub/70 outline-none transition-colors focus:border-brand-mint"
        />
      </div>

      {showInspector && (
        <select
          value={inspector}
          onChange={(e) => onInspectorChange(e.target.value)}
          className="rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-[0.85rem] text-brand-text outline-none focus:border-brand-mint"
        >
          <option value="all">All inspectors</option>
          {inspectors.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      )}

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-[0.85rem] text-brand-text outline-none focus:border-brand-mint"
      >
        <option value="all">All statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-[0.85rem] text-brand-text outline-none focus:border-brand-mint"
      />
    </div>
  );
}
