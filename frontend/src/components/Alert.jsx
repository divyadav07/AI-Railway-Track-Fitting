import { AlertCircle, CheckCircle2 } from "lucide-react";

// Small rust (error) or mint (success) message box. Renders nothing when `message` is empty.
export default function Alert({ type = "error", message }) {
  if (!message) return null;

  const isError = type === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`mb-4 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-[13px] ${
        isError
          ? "border-rust-200 bg-rust-50 text-rust-700 dark:border-rust-500/30 dark:bg-rust-500/10 dark:text-rust-300"
          : "border-mint-200 bg-mint-50 text-mint-800 dark:border-mint-500/30 dark:bg-mint-500/10 dark:text-mint-300"
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
