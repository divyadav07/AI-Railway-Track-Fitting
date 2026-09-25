const styles = {
  Critical: "bg-brand-critBg text-brand-crit",
  "Needs Inspection": "bg-brand-warnBg text-brand-warn",
  Completed: "bg-brand-okBg text-brand-ok",
  "Under Review": "bg-brand-infoBg text-brand-info",
};

export default function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${
        styles[status] ?? "bg-brand-off text-brand-sub"
      }`}
    >
      {status}
    </span>
  );
}

export function healthColor(value) {
  if (value < 40) return "text-brand-crit";
  if (value < 70) return "text-brand-warn";
  return "text-brand-ok";
}
