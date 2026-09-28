import DashboardLayout from "../../layouts/DashboardLayout.jsx";

export default function ComingSoonPage({ role = "admin", title, description, icon: Icon }) {
  return (
    <DashboardLayout role={role}>
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-brand-card px-6 py-16 text-center">
        {Icon && (
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-bg">
            <Icon size={24} className="text-brand-mint" strokeWidth={1.9} />
          </span>
        )}
        <h1 className="text-[1.2rem] font-semibold text-brand-text">{title}</h1>
        <p className="mt-2 max-w-sm text-[0.88rem] text-brand-sub">{description}</p>
      </div>
    </DashboardLayout>
  );
}
