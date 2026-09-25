import { Loader2 } from "lucide-react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[8px] font-sans font-semibold text-[0.95rem] transition-all duration-200 ease-out focus-visible:outline-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-mint text-ink-dark hover:bg-mint-deep active:scale-[0.98] shadow-[0_1px_0_rgba(0,0,0,0.15)]",
  dark: "bg-ink text-white border border-white/10 hover:bg-ink-light active:scale-[0.98]",
  outline:
    "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03] active:scale-[0.98]",
  outlineLight:
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/5 active:scale-[0.98]",
  ghost: "text-white/70 hover:text-white",
};

const sizes = {
  sm: "px-3.5 py-2 text-[0.85rem]",
  md: "px-5 py-3",
  lg: "px-7 py-3.5 text-[1.02rem]",
};

// Shared RailSentry button. Renders a <button> by default or any component via `as`
// (e.g. `as={Link}`). Optional leading `icon` and a spinner while `loading`.
export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  loading = false,
  children,
  ...props
}) {
  const extra = Component === "button" ? { disabled: loading || props.disabled } : {};
  return (
    <Component
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
      {...extra}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon && <Icon className="h-4 w-4" />}
      {children}
    </Component>
  );
}
