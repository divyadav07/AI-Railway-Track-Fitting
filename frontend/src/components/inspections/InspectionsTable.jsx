import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import StatusPill, { healthColor } from "../dashboard/StatusPill.jsx";

export default function InspectionsTable({ data, basePath, showInspector = true }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-brand-border text-[0.75rem] text-brand-sub">
              <th className="py-2.5 font-medium">Inspection ID</th>
              <th className="py-2.5 font-medium">Asset</th>
              <th className="py-2.5 font-medium">Location</th>
              {showInspector && <th className="py-2.5 font-medium">Inspector</th>}
              <th className="py-2.5 font-medium">Date</th>
              <th className="py-2.5 font-medium">Health</th>
              <th className="py-2.5 font-medium">Status</th>
              <th className="py-2.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-brand-border/60 last:border-0">
                <td className="py-3 font-medium text-brand-text">{row.id}</td>
                <td className="py-3 text-brand-text/80">{row.assetType} · {row.assetId}</td>
                <td className="py-3 text-brand-text/80">{row.location}</td>
                {showInspector && <td className="py-3 text-brand-text/80">{row.inspector}</td>}
                <td className="py-3 text-brand-text/80">{row.date}</td>
                <td className={`py-3 font-medium ${healthColor(row.healthScore)}`}>{row.healthScore}%</td>
                <td className="py-3"><StatusPill status={row.status} /></td>
                <td className="py-3">
                  <Link
                    to={`${basePath}/${row.id.replace("#", "")}`}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-border text-brand-info transition-colors hover:bg-brand-infoBg"
                    aria-label="View inspection"
                    title="View"
                  >
                    <Eye size={14} />
                  </Link>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={showInspector ? 8 : 7} className="py-10 text-center text-[0.85rem] text-brand-sub">
                  No inspections match your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
