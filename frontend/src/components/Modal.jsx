import { X } from "lucide-react";

// Generic centred popup with a title and close (X) button; content is passed as `children`.
export default function Modal({ title, onClose, children, maxWidth = "max-w-lg" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 px-4 backdrop-blur-sm">
      <div className={`w-full ${maxWidth} rounded-2xl bg-white dark:bg-ink-800 p-6 shadow-xl`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-semibold text-ink-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-600"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
