import { useRef } from "react";
import { Camera, X, Check } from "lucide-react";

export default function ImageUploadGrid({ slots, images, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {slots.map((label) => (
        <UploadTile
          key={label}
          label={label}
          file={images[label]}
          onSelect={(file) => onChange(label, file)}
          onClear={() => onChange(label, null)}
        />
      ))}
    </div>
  );
}

function UploadTile({ label, file, onSelect, onClear }) {
  const inputRef = useRef(null);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
          file ? "border-brand-mint bg-brand-mint/5" : "border-brand-border bg-brand-off hover:border-brand-mint/50"
        }`}
      >
        {file ? (
          <>
            <img src={file.previewUrl} alt={label} className="h-full w-full object-cover" />
            <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-mint text-brand-bg">
              <Check size={12} strokeWidth={3} />
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-bg/70 text-white"
              aria-label={`Remove ${label} image`}
            >
              <X size={12} />
            </span>
          </>
        ) : (
          <Camera size={22} className="text-brand-sub" strokeWidth={1.6} />
        )}
      </button>

      <span className="text-[0.78rem] font-medium text-brand-text">{label}</span>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onSelect({ file: f, previewUrl: URL.createObjectURL(f) });
          e.target.value = "";
        }}
      />
    </div>
  );
}
