import { AlertTriangle, Loader2 } from "lucide-react";
import Modal from "./Modal";

// "Are you sure?" popup used before destructive actions such as deleting an asset.
export default function ConfirmDialog({
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={onCancel} maxWidth="max-w-sm">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rust-50 dark:bg-rust-500/10 text-rust-600 dark:text-rust-300">
          <AlertTriangle className="h-4.5 w-4.5" />
        </span>
        <p className="text-[13.5px] leading-relaxed text-ink-600 dark:text-ink-300">{message}</p>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-ink-200 dark:border-ink-700 px-4 py-2 text-[13.5px] font-medium text-ink-700 dark:text-ink-200 transition hover:bg-ink-50 dark:hover:bg-ink-700/60 disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg bg-rust-600 px-4 py-2 text-[13.5px] font-semibold text-white transition hover:bg-rust-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
