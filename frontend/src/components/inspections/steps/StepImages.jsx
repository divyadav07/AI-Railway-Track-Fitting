import ImageUploadGrid from "../ImageUploadGrid.jsx";
import { imageSlotLabels } from "../../../data/inspectionsData.js";

export default function StepImages({ images, onChange }) {
  const uploadedCount = Object.values(images).filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[0.95rem] font-semibold text-brand-text">Upload inspection images</h3>
        <span className="text-[0.78rem] text-brand-sub">{uploadedCount} / {imageSlotLabels.length} uploaded</span>
      </div>
      <p className="mt-1 text-[0.82rem] text-brand-sub">
        Capture all five angles so the AI model has enough coverage to detect rust, cracks, and missing bolts.
      </p>

      <div className="mt-5">
        <ImageUploadGrid slots={imageSlotLabels} images={images} onChange={onChange} />
      </div>
    </div>
  );
}
