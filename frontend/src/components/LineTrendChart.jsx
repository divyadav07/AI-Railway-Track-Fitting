// Small dependency-free SVG line chart. `points` is [{ x: label, y: number }].
// Supports an optional second dashed series (`points2`) for predicted values.
export default function LineTrendChart({ points, points2, height = 180, color = "#14B385", color2 = "#E2643C" }) {
  const width = 560;
  const padding = 28;
  const all = [...points, ...(points2 || [])].map((p) => p.y).filter((v) => v != null);
  const max = Math.max(...all, 10);
  const min = Math.min(...all, 0);
  const range = max - min || 1;

  // toXY: converts a series of { y } values into SVG x/y coordinates that fit inside the chart
  // (x is spread evenly across the width, y is scaled between min and max). Missing values are skipped.
  const toXY = (arr) =>
    arr
      .map((p, i) =>
        p.y == null
          ? null
          : {
              x: padding + (i / (arr.length - 1 || 1)) * (width - padding * 2),
              y: height - padding - ((p.y - min) / range) * (height - padding * 2),
            }
      )
      .filter(Boolean);

  // toPath: turns a series into an SVG path string ("M x,y L x,y ...") used to draw the line.
  const toPath = (arr) => {
    const xy = toXY(arr);
    return xy.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={padding}
          x2={width - padding}
          y1={padding + t * (height - padding * 2)}
          y2={padding + t * (height - padding * 2)}
          stroke="rgba(111,138,128,0.18)"
          strokeWidth={1}
        />
      ))}
      <path d={toPath(points)} fill="none" stroke={color} strokeWidth={2.5} />
      {toXY(points).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
      ))}
      {points2 && (
        <path d={toPath(points2)} fill="none" stroke={color2} strokeWidth={2.5} strokeDasharray="5 4" />
      )}
      {points2 &&
        toXY(points2).map((p, i) => (
          <circle key={`p2-${i}`} cx={p.x} cy={p.y} r={3} fill={color2} />
        ))}
      {points.map((p, i) => (
        <text
          key={p.x}
          x={padding + (i / (points.length - 1 || 1)) * (width - padding * 2)}
          y={height - 6}
          fontSize="9.5"
          textAnchor="middle"
          fill="#8A9E97"
        >
          {p.x}
        </text>
      ))}
    </svg>
  );
}
