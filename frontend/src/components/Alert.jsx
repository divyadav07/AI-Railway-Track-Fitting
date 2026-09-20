import { AlertCircle, CheckCircle2 } from "lucide-react";

// Small red (error) or green (success) message box. Renders nothing when `message` is empty.
export default function Alert({ type = "error", message }) {
  if (!message) return null;

  const isError = type === "error";
  return (
    <div
      className={`mb-4 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-[13px] ${
        isError
          ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800/60 dark:bg-red-950/40 dark:text-red-300"
          : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300"
      }`}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}
