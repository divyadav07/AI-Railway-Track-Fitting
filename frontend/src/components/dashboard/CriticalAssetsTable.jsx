import StatusPill, { healthColor } from "./StatusPill.jsx";

export default function CriticalAssetsTable({ data }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="text-[0.95rem] font-semibold text-brand-text">Critical Assets</h3>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-brand-border text-[0.75rem] text-brand-sub">
              <th className="py-2.5 font-medium">Asset ID</th>
              <th className="py-2.5 font-medium">Fitting Type</th>
              <th className="py-2.5 font-medium">Location</th>
              <th className="py-2.5 font-medium">Health</th>
              <th className="py-2.5 font-medium">Status</th>
              <th className="py-2.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-brand-border/60 last:border-0">
                <td className="py-3 font-medium text-brand-text">{row.id}</td>
                <td className="py-3 text-brand-text/80">{row.type}</td>
                <td className="py-3 text-brand-text/80">{row.location}</td>
                <td className={`py-3 font-medium ${healthColor(row.health)}`}>{row.health}%</td>
                <td className="py-3">
                  <StatusPill status={row.status} />
                </td>
                <td className="py-3">
                  <button className="rounded-md border border-brand-border px-3 py-1 text-[0.78rem] font-medium text-brand-info transition-colors hover:bg-brand-infoBg">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
