import { useState } from "react";
import { AlertTriangle, Download, Printer, FileText, Loader2 } from "lucide-react";
import AppShell from "../components/AppShell";
import LineTrendChart from "../components/LineTrendChart";

// No predictive-maintenance or inspection-history endpoint on the backend yet -
// everything below starts at 0 / empty instead of sample data.
const INSPECTIONS = [];
const PREDICTION = {
  AssetID: null,
  Prediction: null,
  RiskFactors: [],
  HealthTrend: [],
};

// Text colour per risk level.
const RISK_STYLES = {
  High: "text-rust-600 dark:text-rust-300",
  Medium: "text-amber-600 dark:text-amber-300",
  Poor: "text-rust-600 dark:text-rust-300",
  Low: "text-mint-700 dark:text-mint-300",
};

// Reports page (sample data): predictive-maintenance summary and a printable inspection report. No backend endpoint yet.
export default function Reports() {
  const [assetId, setAssetId] = useState(PREDICTION.AssetID);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const inspection = INSPECTIONS.find((i) => i.AssetID === assetId) || null;

  // Fake "generating report" delay (1.2s) to simulate compiling a report.
  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1200);
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="font-display text-[1.7rem] font-semibold leading-tight text-ink dark:text-white">Reports</h1>
        <p className="mt-0.5 text-[13.5px] text-ink-500 dark:text-ink-400">
          Predictive maintenance insights and downloadable inspection reports.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-sm">
          <h2 className="mb-3 text-[14.5px] font-semibold text-ink-900 dark:text-white">
            Prediction {PREDICTION.AssetID ? `for ${PREDICTION.AssetID}` : ""}
          </h2>

          {!PREDICTION.Prediction && PREDICTION.RiskFactors.length === 0 ? (
            <p className="py-10 text-center text-[13px] text-ink-400">
              Predictive maintenance is not wired up yet.
            </p>
          ) : (
            <>
              <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-rust-200 dark:border-rust-500/30 bg-rust-50 dark:bg-rust-500/10 px-3.5 py-3 text-[13px] font-medium text-rust-700 dark:text-rust-300">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                {PREDICTION.Prediction}
              </div>

              <p className="mb-2 text-[12.5px] font-semibold text-ink-400">
                Risk Factors
              </p>
              <ul className="mb-5 space-y-2">
                {PREDICTION.RiskFactors.map((r) => (
                  <li key={r.label} className="flex items-center justify-between text-[13.5px]">
                    <span className="text-ink-600 dark:text-ink-300">{r.label}</span>
                    <span className={`font-semibold ${RISK_STYLES[r.level] || "text-ink-500 dark:text-ink-400"}`}>{r.level}</span>
                  </li>
                ))}
              </ul>

              <p className="mb-2 text-[12.5px] font-semibold text-ink-400">
                Health Score Trend
              </p>
              <LineTrendChart
                points={PREDICTION.HealthTrend.map((d) => ({ x: d.date, y: d.actual }))}
                points2={PREDICTION.HealthTrend.map((d) => ({ x: d.date, y: d.predicted }))}
                height={170}
              />
              <div className="mt-2 flex gap-4 text-[11.5px] text-ink-500 dark:text-ink-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-mint-600" /> Actual
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rust-500" /> Predicted
                </span>
              </div>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-[17px] font-medium text-ink-900 dark:text-white">Generate Report</h2>
            <select
              value={assetId || ""}
              onChange={(e) => setAssetId(e.target.value)}
              disabled={INSPECTIONS.length === 0}
              className="rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-2.5 py-1.5 text-[12.5px] text-ink-700 dark:text-ink-200 outline-none focus:border-mint-600 disabled:opacity-50"
            >
              {INSPECTIONS.length === 0 ? (
                <option value="">No assets yet</option>
              ) : (
                INSPECTIONS.map((i) => (
                  <option key={i.ID} value={i.AssetID}>
                    {i.AssetID}
                  </option>
                ))
              )}
            </select>
          </div>

          {generating ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-ink-500 dark:text-ink-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p className="text-[13px]">Compiling inspection report…</p>
            </div>
          ) : !inspection ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ink-200 dark:border-ink-700 py-16 text-ink-400">
              <FileText className="h-6 w-6" />
              <p className="text-[13px]">No inspection data yet.</p>
            </div>
          ) : (
            <div className="rounded-lg border border-ink-200 dark:border-ink-700 p-4">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-mint-700 dark:text-mint-300" />
                <span className="text-[13.5px] font-semibold text-ink-800 dark:text-ink-100">Inspection Report</span>
              </div>
              <div className="grid grid-cols-2 gap-y-1.5 text-[12.5px] text-ink-600 dark:text-ink-300">
                <span>Asset ID: {inspection.AssetID}</span>
                <span className="text-right font-semibold text-ink-800 dark:text-ink-100">
                  Health: {inspection.HealthScore}%
                </span>
                <span>Track No.: {inspection.TrackNumber}</span>
                <span className="text-right font-semibold text-rust-600 dark:text-rust-300">{inspection.Status}</span>
                <span>Location: {inspection.Location}</span>
                <span />
                <span>Inspector: {inspection.Inspector}</span>
                <span />
                <span>Date: {inspection.Date}</span>
                <span />
              </div>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleGenerate}
              disabled={!inspection}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-mint py-2.5 text-[13px] font-semibold text-ink-dark hover:bg-mint-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
            <button
              disabled={!generated}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink-200 dark:border-ink-700 py-2.5 text-[13px] font-medium text-ink-700 dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-ink-700/60 disabled:opacity-50"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
