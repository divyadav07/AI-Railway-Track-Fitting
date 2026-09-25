export default function RoleCard({ icon: Icon, label, description, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex-1 rounded-xl border px-4 py-4 text-left transition-all duration-200 ${
        active
          ? "border-mint bg-mint/[0.08] shadow-[0_0_0_1px_rgba(46,230,168,0.35)]"
          : "border-ink/12 bg-white hover:border-ink/25"
      }`}
    >
      <Icon
        size={20}
        strokeWidth={1.75}
        className={active ? "text-mint-deep" : "text-ink/45 group-hover:text-ink/65"}
      />
      <p className={`mt-2.5 text-[0.95rem] font-semibold ${active ? "text-ink" : "text-ink/80"}`}>
        {label}
      </p>
      {description && (
        <p className="mt-0.5 text-[0.78rem] text-ink/45 leading-snug">{description}</p>
      )}
    </button>
  );
}
