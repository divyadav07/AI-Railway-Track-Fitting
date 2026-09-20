// Small dependency-free SVG donut chart. `data` is an array of
// { label, value, color }. Renders a ring plus an optional centered label.
export default function DonutChart({ data, size = 160, thickness = 22, centerLabel, centerSub }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={thickness}
        />
        {data.map((d) => {
          const fraction = d.value / total;
          const dash = fraction * circumference;
          const circle = (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      {(centerLabel || centerSub) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && <span className="text-xl font-bold text-slate-900">{centerLabel}</span>}
          {centerSub && <span className="text-[11px] text-slate-500">{centerSub}</span>}
        </div>
      )}
    </div>
  );
}
