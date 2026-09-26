import { Gauge, ArrowUp } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";

export default function MyPerformancePanel({ data }) {
  const chartData = data.weekly.map((v, i) => ({ day: i, value: v }));
  const max = Math.max(...data.weekly);

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <h3 className="flex items-center gap-2 text-[0.95rem] font-semibold text-brand-text">
        <Gauge size={16} className="text-brand-sub" strokeWidth={1.9} />
        My Performance
      </h3>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-[1.3rem] font-semibold leading-none text-brand-text">
            {data.totalInspections.value}
          </div>
          <div className="mt-1 text-[0.75rem] text-brand-sub">Total Inspections</div>
          <div className="mt-1.5 flex items-center gap-0.5 text-[0.72rem] font-medium text-brand-ok">
            <ArrowUp size={11} strokeWidth={2.5} />
            {data.totalInspections.delta}%
          </div>
        </div>

        <div className="h-14 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Bar dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={10}>
                {chartData.map((d) => (
                  <Cell key={d.day} fill={d.value === max ? "#2EE6A6" : "#DDEFE6"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 border-t border-brand-border pt-4">
        <div className="text-[1.1rem] font-semibold leading-none text-brand-text">
          {data.avgTimePerInspection}
        </div>
        <div className="mt-1 text-[0.75rem] text-brand-sub">Avg. time per inspection</div>
      </div>
    </div>
  );
}
