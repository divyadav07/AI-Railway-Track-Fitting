import { useMemo, useState } from "react";
import {
  QrCode,
  ScanLine,
  Download,
  Printer,
  Camera,
  RotateCw,
  Image as ImageIcon,
  ScanEye,
  Loader2,
  CheckCircle2,
  History,
  Sparkles,
} from "lucide-react";
import AppShell from "../components/AppShell";
import { StatusBadge } from "../components/AssetBadges";
import DonutChart from "../components/DonutChart";
import {
  MOCK_INSPECTIONS,
  DETECTED_DEFECT_PRESETS,
  HEALTH_SCORE_BREAKDOWN,
} from "../data/mockData";

// The three steps of the new-inspection wizard.
const STEPS = [
  { key: "qr", label: "QR Code", icon: QrCode },
  { key: "capture", label: "Image Capture", icon: Camera },
  { key: "detect", label: "AI Defect Detection", icon: ScanEye },
];

// Wizard step 1: identify the asset by generating or scanning its QR code (simulated).
function QrStep({ assetId, onScanned }) {
  const [mode, setMode] = useState("generate");
  const [scanning, setScanning] = useState(false);

  // Simulates a QR scan taking ~1.4s, then tells the wizard the asset was identified.
  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScanned();
    }, 1400);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setMode("generate")}
            className={`rounded-lg px-3 py-1.5 text-[13px] font-medium ${
              mode === "generate" ? "bg-blue-50 text-blue-700" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/60"
            }`}
          >
            Generate QR Code
          </button>
          <button
            onClick={() => setMode("scan")}
            className={`rounded-lg px-3 py-1.5 text-[13px] font-medium ${
              mode === "scan" ? "bg-blue-50 text-blue-700" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/60"
            }`}
          >
            Scan QR Code
          </button>
        </div>

        {mode === "generate" ? (
          <>
            <label className="mb-4 block">
              <span className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-200">Asset ID</span>
              <input
                value={assetId}
                readOnly
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2.5 text-[13.5px] text-slate-700 dark:text-slate-200"
              />
            </label>
            <div className="mb-4 grid h-48 place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 dark:bg-slate-900">
              <QrCode className="h-24 w-24 text-slate-800 dark:text-slate-100" strokeWidth={1.1} />
            </div>
            <div className="flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700">
                <Download className="h-4 w-4" /> Download
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60">
                <Printer className="h-4 w-4" /> Print
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="relative mb-4 grid h-48 place-items-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900">
              <ScanLine className={`h-16 w-16 text-emerald-400 ${scanning ? "animate-pulse" : ""}`} />
              <span className="absolute bottom-3 text-[12px] text-slate-300">
                {scanning ? "Scanning…" : "Point camera at the fitting's QR code"}
              </span>
            </div>
            <button
              onClick={handleScan}
              disabled={scanning}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
            >
              {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
              {scanning ? "Scanning…" : "Simulate Scan"}
            </button>
          </>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-5 text-[13px] text-slate-600 dark:text-slate-300">
        <h3 className="mb-2 text-[13.5px] font-semibold text-slate-800 dark:text-slate-100">How it works</h3>
        <ol className="list-decimal space-y-1.5 pl-4">
          <li>Generate a QR code for a track fitting when it's installed and print it onto a durable tag.</li>
          <li>During field inspections, scan the tag to instantly pull up the asset's full history.</li>
          <li>Once identified, move on to capturing a clear image of the fitting for AI analysis.</li>
        </ol>
      </div>
    </div>
  );
}

// Wizard step 2: capture/upload a photo of the fitting.
function CaptureStep({ image, onCapture }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-900" style={{ minHeight: 320 }}>
        {image ? (
          <img src={image} alt="Captured fitting" className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full min-h-[320px] place-items-center text-slate-400">
            <div className="text-center">
              <ImageIcon className="mx-auto h-10 w-10" />
              <p className="mt-2 text-[13px]">Capture a clear image of the fitting</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center gap-4 sm:flex-col sm:justify-start">
        <button
          onClick={() =>
            onCapture(
              "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800&auto=format&fit=crop"
            )
          }
          className="flex flex-col items-center gap-1.5 text-slate-600 dark:text-slate-300"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:border-blue-300">
            <Camera className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </span>
          <span className="text-[11.5px] font-medium">Capture</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200">
            <RotateCw className="h-4 w-4" />
          </span>
          <span className="text-[11px]">Flip</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200">
            <ImageIcon className="h-4 w-4" />
          </span>
          <span className="text-[11px]">Gallery</span>
        </button>
      </div>
    </div>
  );
}

// Wizard step 3: run (simulated) AI defect detection on the photo and list the defects found.
function DetectStep({ image, running, defects, onRun }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-900" style={{ minHeight: 320 }}>
        {image && <img src={image} alt="Analyzed fitting" className="h-full w-full object-cover opacity-90" />}
        {running && (
          <div className="absolute inset-0 grid place-items-center bg-slate-900/60">
            <div className="flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2.5 text-[13px] font-medium text-slate-700 dark:text-slate-200">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              Running YOLOv8 detection…
            </div>
          </div>
        )}
        {!running && defects.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {defects.map((d) => (
              <span
                key={d.label}
                className="rounded-md px-2 py-1 text-[11px] font-semibold text-white shadow"
                style={{ backgroundColor: d.color }}
              >
                {d.label} {d.confidence.toFixed(2)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
        <h3 className="mb-3 text-[13.5px] font-semibold text-slate-900 dark:text-white">Detected Defects</h3>
        {defects.length === 0 && !running ? (
          <button
            onClick={onRun}
            disabled={!image}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            Run AI Detection
          </button>
        ) : (
          <ul className="space-y-3">
            {defects.map((d) => (
              <li key={d.label} className="flex items-start gap-2.5">
                <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                <div>
                  <p className="text-[13px] font-medium text-slate-800 dark:text-slate-100">{d.label}</p>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400">
                    Confidence: {(d.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {defects.length > 0 && (
          <p className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3 text-[11.5px] text-slate-400">
            Model: YOLOv8 · Processed in 0.45s
          </p>
        )}
      </div>
    </div>
  );
}

// Inspection History tab: past inspections and the health-score breakdown (sample data).
function HistoryTab() {
  const breakdown = HEALTH_SCORE_BREAKDOWN["AST-1003"];

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
        <h3 className="mb-4 text-[13.5px] font-semibold text-slate-900 dark:text-white">Health Score — AST-1003</h3>
        <div className="flex justify-center">
          <DonutChart
            data={[
              { label: "Score", value: breakdown.Score, color: "#f59e0b" },
              { label: "Remaining", value: 100 - breakdown.Score, color: "#f1f5f9" },
            ]}
            centerLabel={`${breakdown.Score}%`}
            centerSub="Health Score"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <StatusBadge status={breakdown.Status} />
        </div>
        <ul className="mt-5 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
          {breakdown.Factors.map((f) => (
            <li key={f.label} className="flex items-center justify-between text-[13px]">
              <span className="text-slate-600 dark:text-slate-300">{f.label}</span>
              <span className={f.impact < 0 ? "font-semibold text-red-600" : "text-slate-400"}>
                {f.impact === 0 ? "0%" : `${f.impact}%`}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2.5 text-[12px] leading-relaxed text-amber-800">
          {breakdown.Recommendation}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
          <h3 className="text-[13.5px] font-semibold text-slate-900 dark:text-white">Inspection History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[11.5px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <th className="px-5 py-2.5 font-semibold">Asset ID</th>
                <th className="px-5 py-2.5 font-semibold">Track</th>
                <th className="px-5 py-2.5 font-semibold">Inspector</th>
                <th className="px-5 py-2.5 font-semibold">Health Score</th>
                <th className="px-5 py-2.5 font-semibold">Status</th>
                <th className="px-5 py-2.5 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INSPECTIONS.map((insp) => (
                <tr key={insp.ID} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{insp.AssetID}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">Track {insp.TrackNumber}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{insp.Inspector}</td>
                  <td className="px-5 py-3 font-semibold text-slate-700 dark:text-slate-200">{insp.HealthScore}%</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={insp.Status} />
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{insp.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Inspections page (sample data): 3-step wizard (QR -> photo -> AI detection) plus a history tab.
// There is no inspection endpoint in the backend yet.
export default function Inspections() {
  const [tab, setTab] = useState("new");
  const [step, setStep] = useState(0);
  const [image, setImage] = useState(null);
  const [running, setRunning] = useState(false);
  const [defects, setDefects] = useState([]);

  const assetId = "AST-1003";

  // The "Next" button is only enabled on step 2 once a photo has been captured.
  const canNext = useMemo(() => {
    if (step === 1) return Boolean(image);
    return true;
  }, [step, image]);

  // Simulates AI detection (1.5s), then fills in preset sample defects.
  const runDetection = () => {
    setRunning(true);
    setTimeout(() => {
      setDefects(DETECTED_DEFECT_PRESETS);
      setRunning(false);
    }, 1500);
  };

  // Returns the wizard to step 1 and clears the photo and results.
  const resetWizard = () => {
    setStep(0);
    setImage(null);
    setDefects([]);
    setRunning(false);
  };

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Inspections</h1>
          <p className="mt-0.5 text-[13.5px] text-slate-500 dark:text-slate-400">
            Run a new field inspection or review past results and health scores.
          </p>
        </div>
        <div className="flex gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1">
          <button
            onClick={() => setTab("new")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium ${
              tab === "new" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" /> New Inspection
          </button>
          <button
            onClick={() => setTab("history")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium ${
              tab === "history" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60"
            }`}
          >
            <History className="h-3.5 w-3.5" /> History &amp; Health Score
          </button>
        </div>
      </div>

      {tab === "history" ? (
        <HistoryTab />
      ) : (
        <>
          <div className="mb-6 flex items-center gap-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = i === step;
              const done = i < step;
              return (
                <div key={s.key} className="flex flex-1 items-center gap-2">
                  <div
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-medium ${
                      active
                        ? "border-blue-300 bg-blue-50 text-blue-700"
                        : done
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    {s.label}
                  </div>
                  {i < STEPS.length - 1 && <div className="h-px flex-1 bg-slate-200" />}
                </div>
              );
            })}
          </div>

          {step === 0 && <QrStep assetId={assetId} onScanned={() => setStep(1)} />}
          {step === 1 && <CaptureStep image={image} onCapture={setImage} />}
          {step === 2 && (
            <DetectStep image={image} running={running} defects={defects} onRun={runDetection} />
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => (step === 0 ? resetWizard() : setStep((s) => s - 1))}
              className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-[13.5px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60"
            >
              {step === 0 ? "Reset" : "Back"}
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={resetWizard}
                disabled={defects.length === 0}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" /> Save Inspection
              </button>
            )}
          </div>
        </>
      )}
    </AppShell>
  );
}
