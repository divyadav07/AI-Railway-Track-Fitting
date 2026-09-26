import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, maxWidth = "max-w-md" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-bg/60 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />

      <div className={`relative w-full ${maxWidth} rounded-2xl border border-brand-border bg-brand-card p-6 shadow-2xl`}>
        <div className="flex items-center justify-between">
          <h3 className="text-[1.05rem] font-semibold text-brand-text">{title}</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-sub transition-colors hover:bg-brand-off"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
