import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, User, CalendarClock, ImageOff } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StatusPill, { healthColor } from "../../components/dashboard/StatusPill.jsx";
import AIResultsPanel from "../../components/inspections/AIResultsPanel.jsx";
import { getInspectionById } from "../../data/inspectionsData.js";

export default function InspectionDetailPage({ role }) {
  const { id } = useParams();
  const inspection = getInspectionById(`#${id}`);

  if (!inspection) {
    return (
      <DashboardLayout role={role}>
        <p className="text-[0.9rem] text-brand-sub">
          Inspection #{id} was not found.{" "}
          <Link to={`/dashboard/${role}/inspections`} className="text-brand-info underline">
            Back to Inspections
          </Link>
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={role}>
      <Link
        to={`/dashboard/${role}/inspections`}
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-brand-sub transition-colors hover:text-brand-text"
      >
        <ArrowLeft size={15} /> Back to Inspections
      </Link>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[1.4rem] font-semibold leading-tight text-brand-text">
              Inspection {inspection.id}
            </h1>
            <StatusPill status={inspection.status} />
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.85rem] text-brand-sub">
            <span>
              Asset{" "}
              <Link to={`/dashboard/${role}/assets/${inspection.assetId}`} className="font-medium text-brand-info hover:underline">
                {inspection.assetId}
              </Link>{" "}
              · {inspection.assetType}
            </span>
            <span className="flex items-center gap-1"><MapPin size={13} /> {inspection.location}</span>
            <span className="flex items-center gap-1"><User size={13} /> {inspection.inspector}</span>
            <span className="flex items-center gap-1"><CalendarClock size={13} /> {inspection.date} · {inspection.time}</span>
          </div>
        </div>

        <div className={`shrink-0 rounded-xl border px-4 py-2.5 text-center ${healthColor(inspection.healthScore)} border-current/20 bg-current/5`}>
          <div className="text-[1.4rem] font-semibold leading-none">{inspection.healthScore}%</div>
          <div className="mt-0.5 text-[0.68rem] opacity-80">Health score</div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {/* Images */}
        <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
          <h3 className="text-[0.95rem] font-semibold text-brand-text">Inspection Images</h3>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {inspection.images.map((img) => (
              <div key={img.label} className="flex flex-col items-center gap-1.5">
                <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-brand-border bg-brand-off">
                  <ImageOff size={18} className="text-brand-sub" strokeWidth={1.6} />
                </div>
                <span className="text-[0.7rem] text-brand-sub">{img.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[0.72rem] text-brand-sub">
            Placeholder tiles — real captured images will render here once wired to your media storage.
          </p>
        </div>

        <AIResultsPanel result={inspection.aiResult} />
      </div>

      {/* Remarks */}
      <div className="mt-6 rounded-2xl border border-brand-border bg-brand-card p-5">
        <h3 className="text-[0.95rem] font-semibold text-brand-text">Inspector Remarks</h3>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-brand-text/75">{inspection.remarks}</p>
      </div>
    </DashboardLayout>
  );
}
