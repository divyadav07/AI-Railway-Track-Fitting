import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, LabelList, CartesianGrid } from "recharts";

const palette = ["#4F8CFF", "#8B7CF6", "#2EE6A6", "#F2B84B"];

export default function BarStatChart({ title, data }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="text-[0.95rem] font-semibold text-brand-text">{title}</h3>

      <div className="mt-4 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 18, right: 4, left: -18, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#E4E8E5" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#5B6B64" }}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5B6B64" }} />
            <Tooltip
              cursor={{ fill: "#F7F7F4" }}
              formatter={(value) => [value.toLocaleString(), "Assets"]}
              contentStyle={{ borderRadius: 10, border: "1px solid #E4E8E5", fontSize: "0.8rem" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={palette[i % palette.length]} />
              ))}
              <LabelList dataKey="value" position="top" style={{ fontSize: 11, fill: "#1F2925", fontWeight: 600 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export { palette };
