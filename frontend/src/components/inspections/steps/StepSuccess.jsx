import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { healthColor } from "../../dashboard/StatusPill.jsx";

export default function StepSuccess({ inspectionId, asset, healthScore }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-brand-border bg-brand-card px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-okBg">
        <CheckCircle2 size={26} className="text-brand-ok" strokeWidth={1.8} />
      </span>

      <h3 className="mt-5 text-[1.2rem] font-semibold text-brand-text">Inspection submitted</h3>
      <p className="mt-1.5 max-w-sm text-[0.88rem] text-brand-sub">
        {inspectionId} for {asset.type} {asset.id} has been logged with a health score of{" "}
        <span className={`font-medium ${healthColor(healthScore)}`}>{healthScore}%</span>.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to={`/dashboard/inspector/inspections/${inspectionId.replace("#", "")}`} className="btn-primary">
          View Inspection
        </Link>
        <Link to="/dashboard/inspector/inspections" className="btn-outline">
          Back to My Inspections
        </Link>
      </div>
    </div>
  );
}
