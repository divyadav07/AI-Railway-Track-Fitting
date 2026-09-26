import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function AssetHealthDonut({ data, total }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="text-[0.95rem] font-semibold text-brand-text">Asset Health Distribution</h3>

      <div className="mt-2 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-[190px] w-[190px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value.toLocaleString()} assets`, name]}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #E4E8E5",
                  fontSize: "0.8rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[1.35rem] font-semibold leading-none text-brand-text">
              {total.toLocaleString()}
            </span>
            <span className="mt-1 text-[0.7rem] text-brand-sub">Total Assets</span>
          </div>
        </div>

        <ul className="w-full space-y-3">
          {data.map((d) => (
            <li key={d.name} className="flex items-center justify-between text-[0.85rem]">
              <span className="flex items-center gap-2.5 text-brand-text">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
              <span className="text-brand-sub">
                <span className="font-medium text-brand-text">{d.value}</span> ({d.pct}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
