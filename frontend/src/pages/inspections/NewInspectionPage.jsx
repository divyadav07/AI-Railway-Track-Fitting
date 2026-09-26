import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StepIndicator from "../../components/inspections/StepIndicator.jsx";
import StepAsset from "../../components/inspections/steps/StepAsset.jsx";
import StepImages from "../../components/inspections/steps/StepImages.jsx";
import StepAnalysis from "../../components/inspections/steps/StepAnalysis.jsx";
import StepReview from "../../components/inspections/steps/StepReview.jsx";
import StepSuccess from "../../components/inspections/steps/StepSuccess.jsx";
import { imageSlotLabels, runMockAIAnalysis, addInspection } from "../../data/inspectionsData.js";

const STEPS = ["Asset", "Images", "AI Analysis", "Review", "Submit"];

export default function NewInspectionPage() {
  const location = useLocation();
  const preselectedAsset = location.state?.asset ?? null;

  const [stepIndex, setStepIndex] = useState(0);
  const [asset, setAsset] = useState(preselectedAsset);
  const [images, setImages] = useState({});
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [submitted, setSubmitted] = useState(null);

  const allImagesUploaded = imageSlotLabels.every((label) => Boolean(images[label]));

  const canProceed = [
    Boolean(asset), // step 0: Asset
    allImagesUploaded, // step 1: Images
    Boolean(result), // step 2: AI Analysis
    true, // step 3: Review (submit button handles its own gate)
  ][stepIndex];

  const handleImageChange = (label, value) => {
    setImages((prev) => ({ ...prev, [label]: value }));
  };

  const handleRunAnalysis = () => {
    setAnalysisLoading(true);
    // Simulated latency for the "AI call" — swap runMockAIAnalysis for a real
    // request to your inspection/analyze endpoint.
    setTimeout(() => {
      setResult(runMockAIAnalysis(asset));
      setAnalysisLoading(false);
    }, 1100);
  };

  const handleSubmit = () => {
    const record = addInspection({ asset, aiResult: result, remarks });
    setSubmitted(record);
    setStepIndex(4);
  };

  const goNext = () => setStepIndex((i) => Math.min(i + 1, 3));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  return (
    <DashboardLayout role="inspector">
      <Link
        to="/dashboard/inspector/inspections"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-brand-sub transition-colors hover:text-brand-text"
      >
        <ArrowLeft size={15} /> Back to My Inspections
      </Link>

      <h1 className="mt-3 text-[1.4rem] font-semibold leading-tight text-brand-text">New Inspection</h1>
      <p className="mt-1 text-[0.85rem] text-brand-sub">
        Walk through each step to log a full inspection for a track fitting.
      </p>

      <div className="mt-6 rounded-2xl border border-brand-border bg-brand-card p-4 sm:p-5">
        <StepIndicator steps={STEPS} currentIndex={stepIndex} />
      </div>

      <div className="mt-5">
        {stepIndex === 0 && <StepAsset selected={asset} onSelect={setAsset} />}
        {stepIndex === 1 && <StepImages images={images} onChange={handleImageChange} />}
        {stepIndex === 2 && (
          <StepAnalysis result={result} loading={analysisLoading} onRun={handleRunAnalysis} />
        )}
        {stepIndex === 3 && (
          <StepReview asset={asset} images={images} result={result} remarks={remarks} onRemarksChange={setRemarks} />
        )}
        {stepIndex === 4 && submitted && (
          <StepSuccess inspectionId={submitted.id} asset={asset} healthScore={submitted.healthScore} />
        )}
      </div>

      {stepIndex < 4 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={stepIndex === 0}
            className="btn-outline disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft size={15} /> Back
          </button>

          {stepIndex === 3 ? (
            <button onClick={handleSubmit} className="btn-primary">
              Submit Inspection
            </button>
          ) : (
            <button onClick={goNext} disabled={!canProceed} className="btn-primary disabled:pointer-events-none disabled:opacity-40">
              Next <ArrowRight size={15} />
            </button>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
