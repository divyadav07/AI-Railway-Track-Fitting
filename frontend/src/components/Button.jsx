import { Loader2 } from "lucide-react";

// Full-width blue submit button with an optional icon and a spinner while `loading`.
export default function Button({ children, icon: Icon, loading, type = "submit", ...props }) {
  return (
    <button
      type={type}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-[14px] font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children}
    </button>
  );
}
