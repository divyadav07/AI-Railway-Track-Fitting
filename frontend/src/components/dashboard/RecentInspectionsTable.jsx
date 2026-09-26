import { Link } from "react-router-dom";
import StatusPill from "./StatusPill.jsx";

export default function RecentInspectionsTable({ data }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="text-[0.95rem] font-semibold text-brand-text">Recent Inspections</h3>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-brand-border text-[0.75rem] text-brand-sub">
              <th className="py-2.5 font-medium">Inspection ID</th>
              <th className="py-2.5 font-medium">Asset</th>
              <th className="py-2.5 font-medium">Inspector</th>
              <th className="py-2.5 font-medium">Date</th>
              <th className="py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-brand-border/60 last:border-0">
                <td className="py-3 font-medium text-brand-text">
                  <Link to={`/dashboard/admin/inspections/${row.id.replace("#", "")}`} className="hover:text-brand-info">
                    {row.id}
                  </Link>
                </td>
                <td className="py-3 text-brand-text/80">{row.asset}</td>
                <td className="py-3 text-brand-text/80">{row.inspector}</td>
                <td className="py-3 text-brand-text/80">{row.date}</td>
                <td className="py-3">
                  <StatusPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
