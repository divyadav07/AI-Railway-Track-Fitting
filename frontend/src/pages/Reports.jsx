import { useState } from "react";
import { AlertTriangle, Download, Printer, FileText, Loader2 } from "lucide-react";
import AppShell from "../components/AppShell";
import LineTrendChart from "../components/LineTrendChart";
import { PREDICTIVE_MAINTENANCE, MOCK_INSPECTIONS } from "../data/mockData";

// Text colour per risk level.
const RISK_STYLES = {
  High: "text-red-600",
  Medium: "text-amber-600",
  Poor: "text-red-600",
  Low: "text-emerald-600",
};

// Reports page (sample data): predictive-maintenance summary and a printable inspection report. No backend endpoint yet.
export default function Reports() {
  const [assetId, setAssetId] = useState(PREDICTIVE_MAINTENANCE.AssetID);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(true);

  const inspection = MOCK_INSPECTIONS.find((i) => i.AssetID === assetId) || MOCK_INSPECTIONS[2];

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
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Reports</h1>
        <p className="mt-0.5 text-[13.5px] text-slate-500 dark:text-slate-400">
          Predictive maintenance insights and downloadable inspection reports.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <h2 className="mb-3 text-[14.5px] font-semibold text-slate-900 dark:text-white">
            Prediction for {PREDICTIVE_MAINTENANCE.AssetID}
          </h2>
          <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] font-medium text-red-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            {PREDICTIVE_MAINTENANCE.Prediction}
          </div>

          <p className="mb-2 text-[12.5px] font-semibold uppercase tracking-wide text-slate-400">
            Risk Factors
          </p>
          <ul className="mb-5 space-y-2">
            {PREDICTIVE_MAINTENANCE.RiskFactors.map((r) => (
              <li key={r.label} className="flex items-center justify-between text-[13.5px]">
                <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                <span className={`font-semibold ${RISK_STYLES[r.level] || "text-slate-500 dark:text-slate-400"}`}>{r.level}</span>
              </li>
            ))}
          </ul>

          <p className="mb-2 text-[12.5px] font-semibold uppercase tracking-wide text-slate-400">
            Health Score Trend
          </p>
          <LineTrendChart
            points={PREDICTIVE_MAINTENANCE.HealthTrend.map((d) => ({ x: d.date, y: d.actual }))}
            points2={PREDICTIVE_MAINTENANCE.HealthTrend.map((d) => ({ x: d.date, y: d.predicted }))}
            height={170}
          />
          <div className="mt-2 flex gap-4 text-[11.5px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-600" /> Actual
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Predicted
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[14.5px] font-semibold text-slate-900 dark:text-white">Generate Report</h2>
            <select
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-[12.5px] text-slate-700 dark:text-slate-200 outline-none focus:border-blue-400"
            >
              {MOCK_INSPECTIONS.map((i) => (
                <option key={i.ID} value={i.AssetID}>
                  {i.AssetID}
                </option>
              ))}
            </select>
          </div>

          {generating ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-slate-500 dark:text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p className="text-[13px]">Compiling inspection report…</p>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-100">Inspection Report</span>
              </div>
              <div className="grid grid-cols-2 gap-y-1.5 text-[12.5px] text-slate-600 dark:text-slate-300">
                <span>Asset ID: {inspection.AssetID}</span>
                <span className="text-right font-semibold text-slate-800 dark:text-slate-100">
                  Health: {inspection.HealthScore}%
                </span>
                <span>Track No.: {inspection.TrackNumber}</span>
                <span className="text-right font-semibold text-red-600">{inspection.Status}</span>
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
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-600 py-2.5 text-[13px] font-semibold text-white hover:bg-red-700"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
            <button
              disabled={!generated}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 disabled:opacity-50"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
