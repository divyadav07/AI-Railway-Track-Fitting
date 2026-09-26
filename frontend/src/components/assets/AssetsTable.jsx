import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, QrCode, ScanLine } from "lucide-react";
import StatusPill from "../dashboard/StatusPill.jsx";
import AssetHealthBar from "./AssetHealthBar.jsx";

export default function AssetsTable({ data, role, basePath, onEdit, onDelete, onShowQR }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-brand-border text-[0.75rem] text-brand-sub">
              <th className="py-2.5 font-medium">Asset ID</th>
              <th className="py-2.5 font-medium">Fitting Type</th>
              <th className="py-2.5 font-medium">Location</th>
              <th className="py-2.5 font-medium">Health</th>
              <th className="py-2.5 font-medium">Status</th>
              <th className="py-2.5 font-medium">Last Inspected</th>
              <th className="py-2.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-brand-border/60 last:border-0">
                <td className="py-3 font-medium text-brand-text">{row.id}</td>
                <td className="py-3 text-brand-text/80">{row.type}</td>
                <td className="py-3 text-brand-text/80">{row.location}</td>
                <td className="py-3 w-32">
                  <AssetHealthBar value={row.health} />
                </td>
                <td className="py-3">
                  <StatusPill status={row.status} />
                </td>
                <td className="py-3 text-brand-text/80">{row.lastInspected}</td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`${basePath}/${row.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-border text-brand-info transition-colors hover:bg-brand-infoBg"
                      aria-label="View asset"
                      title="View"
                    >
                      <Eye size={14} />
                    </Link>

                    {role === "admin" ? (
                      <>
                        <button
                          onClick={() => onEdit(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-border text-brand-text/70 transition-colors hover:bg-brand-off"
                          aria-label="Edit asset"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => onShowQR(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-border text-brand-text/70 transition-colors hover:bg-brand-off"
                          aria-label="QR code"
                          title="QR code"
                        >
                          <QrCode size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-border text-brand-crit transition-colors hover:bg-brand-critBg"
                          aria-label="Delete asset"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    ) : (
                      <Link
                        to={`/dashboard/inspector/inspections/new`}
                        state={{ asset: row }}
                        className="flex items-center gap-1.5 rounded-md border border-brand-border px-3 py-1.5 text-[0.78rem] font-medium text-brand-mintDark transition-colors hover:bg-brand-mint/10"
                      >
                        <ScanLine size={13} />
                        Start Inspection
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[0.85rem] text-brand-sub">
                  No assets match your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
