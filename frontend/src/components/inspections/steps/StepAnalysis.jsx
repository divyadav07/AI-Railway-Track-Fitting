import { Sparkles, Loader2 } from "lucide-react";
import AIResultsPanel from "../AIResultsPanel.jsx";
import { healthColor } from "../../dashboard/StatusPill.jsx";

export default function StepAnalysis({ result, loading, onRun }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
        <div className="flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:justify-between sm:py-2 sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-info/10">
              <Sparkles size={19} className="text-brand-info" strokeWidth={1.9} />
            </span>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-brand-text">AI defect analysis</h3>
              <p className="text-[0.82rem] text-brand-sub">
                Runs the uploaded images through the fitting, rust, crack, and bolt detection model.
              </p>
            </div>
          </div>

          <button onClick={onRun} disabled={loading} className="btn-primary shrink-0 disabled:opacity-60">
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Analyzing…
              </>
            ) : result ? (
              "Re-run analysis"
            ) : (
              "Run AI Analysis"
            )}
          </button>
        </div>
      </div>

      {result && (
        <>
          <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
            <h3 className="text-[0.95rem] font-semibold text-brand-text">Predicted fitting health</h3>
            <div className={`mt-2 text-[2rem] font-semibold leading-none ${healthColor(result.healthScore)}`}>
              {result.healthScore}%
            </div>
          </div>
          <AIResultsPanel result={result} />
        </>
      )}
    </div>
  );
}
