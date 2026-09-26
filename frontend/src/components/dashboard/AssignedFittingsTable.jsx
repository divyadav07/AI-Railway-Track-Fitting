import { Link } from "react-router-dom";
import { ScanLine } from "lucide-react";
import StatusPill from "./StatusPill.jsx";

export default function AssignedFittingsTable({ data }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[0.95rem] font-semibold text-brand-text">Assigned Fittings</h3>
        <span className="text-[0.78rem] text-brand-sub">{data.length} open</span>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-brand-border text-[0.75rem] text-brand-sub">
              <th className="py-2.5 font-medium">Asset ID</th>
              <th className="py-2.5 font-medium">Fitting Type</th>
              <th className="py-2.5 font-medium">Location</th>
              <th className="py-2.5 font-medium">Last Inspected</th>
              <th className="py-2.5 font-medium">Priority</th>
              <th className="py-2.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-brand-border/60 last:border-0">
                <td className="py-3 font-medium text-brand-text">{row.id}</td>
                <td className="py-3 text-brand-text/80">{row.type}</td>
                <td className="py-3 text-brand-text/80">{row.location}</td>
                <td className="py-3 text-brand-text/80">{row.lastInspected}</td>
                <td className="py-3">
                  <StatusPill status={row.priority} />
                </td>
                <td className="py-3">
                  <Link
                    to="/dashboard/inspector/inspections/new"
                    state={{ asset: row }}
                    className="flex items-center gap-1.5 rounded-md border border-brand-border px-3 py-1 text-[0.78rem] font-medium text-brand-info transition-colors hover:bg-brand-infoBg"
                  >
                    <ScanLine size={13} />
                    Inspect
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
