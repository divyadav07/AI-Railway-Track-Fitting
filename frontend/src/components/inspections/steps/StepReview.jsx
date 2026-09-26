import { MapPin } from "lucide-react";
import AIResultsPanel from "../AIResultsPanel.jsx";
import { healthColor } from "../../dashboard/StatusPill.jsx";
import { imageSlotLabels } from "../../../data/inspectionsData.js";

export default function StepReview({ asset, images, result, remarks, onRemarksChange }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
        <h3 className="text-[0.95rem] font-semibold text-brand-text">Summary</h3>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[0.95rem] font-medium text-brand-text">
              {asset.type} · {asset.id}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[0.8rem] text-brand-sub">
              <MapPin size={12} /> {asset.location}
            </div>
          </div>
          <div className={`rounded-xl border border-current/20 bg-current/5 px-4 py-2 text-center ${healthColor(result.healthScore)}`}>
            <div className="text-[1.2rem] font-semibold leading-none">{result.healthScore}%</div>
            <div className="mt-0.5 text-[0.65rem] opacity-80">Health score</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-5 gap-2.5">
          {imageSlotLabels.map((label) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="aspect-square w-full overflow-hidden rounded-lg border border-brand-border">
                {images[label] && (
                  <img src={images[label].previewUrl} alt={label} className="h-full w-full object-cover" />
                )}
              </div>
              <span className="text-[0.65rem] text-brand-sub">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <AIResultsPanel result={result} />

      <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
        <label htmlFor="remarks" className="field-label">Inspector remarks</label>
        <textarea
          id="remarks"
          rows={4}
          value={remarks}
          onChange={(e) => onRemarksChange(e.target.value)}
          placeholder="Add any observations not captured by the AI analysis…"
          className="field-input resize-none"
        />
      </div>
    </div>
  );
}
