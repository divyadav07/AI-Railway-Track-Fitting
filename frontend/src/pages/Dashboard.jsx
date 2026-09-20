import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Boxes,
  ShieldCheck,
  SearchCheck,
  AlertTriangle,
  CalendarCheck2,
  Loader2,
  ArrowRight,
  AlertCircle,
  Info,
  CheckCircle2,
  CloudSun,
  Droplets,
  Wind,
  Umbrella,
  Plus,
  ScanEye,
  QrCode,
  FileBarChart,
  BellRing,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import AppShell from "../components/AppShell";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";
import { getDashboardData } from "../services/dashboardService";
import { toDateOnly } from "../utils/formatDate";
import {
  MOCK_INSPECTION_TREND_6M,
  MOCK_TRACK_SECTIONS,
  MOCK_TRACK_MAP,
  MOCK_WEATHER,
  MOCK_RECENT_INSPECTIONS,
  MOCK_INSPECTIONS_TODAY,
} from "../data/mockData";

// Chart/legend colours for the three health statuses.
const BUCKET_COLORS = {
  Healthy: "#22c55e",
  "Needs Inspection": "#f59e0b",
  Critical: "#ef4444",
};

// Slice colours for the "Assets by Fitting Type" chart.
const FITTING_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#94a3b8"];

// Icon + colours per alert severity in the "Recent Alerts" list.
const ALERT_SEVERITY = {
  critical: { icon: AlertTriangle, tint: "text-red-500", bg: "bg-red-50" },
  warning: { icon: AlertCircle, tint: "text-amber-500", bg: "bg-amber-50" },
  info: { icon: Info, tint: "text-blue-500", bg: "bg-blue-50" },
};

// One summary tile at the top (icon, label, big number, caption). `sample` adds a "sample" tag for placeholder data.
function StatCard({ icon: Icon, label, value, caption, sample, tint }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tint}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-lg font-bold leading-tight text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-[11.5px] text-slate-400">
        {caption}
        {sample && (
          <span className="ml-1.5 rounded-full bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            sample
          </span>
        )}
      </p>
    </div>
  );
}

// White rounded card with a title (and optional action link) that wraps each dashboard section.
function Panel({ title, action, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[14.5px] font-semibold text-slate-900 dark:text-white">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

// Dashboard page. Real numbers come from the backend dashboard endpoints; sections still marked
// "sample" (inspection trend, track sections, weather, recent inspections, map) have no backend yet.
export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Everything below comes from the backend dashboard endpoints
  // (see services/dashboardService.js). `data` stays null until the first load.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all dashboard numbers once when the page opens.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getDashboardData();
        if (cancelled) return;
        setData(res);
        // Some endpoints may fail while others succeed - surface the first
        // problem instead of blanking the whole page.
        if (res.errors.length) {
          setError(
            res.errors.length > 1
              ? `${res.errors[0]} (+${res.errors.length - 1} more)`
              : res.errors[0]
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.response?.data?.message || err?.message || "Failed to load dashboard.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Headline numbers: /getTotalAssets, /getHealthyAssets, /getNeedsInspectionAssets,
  // /getCriticalAssets and /getAverageHealth.
  const total = data?.total ?? 0;
  const healthCounts = {
    Healthy: data?.healthy ?? 0,
    "Needs Inspection": data?.needsInspection ?? 0,
    Critical: data?.critical ?? 0,
  };
  const avgHealth = Math.round(data?.averageHealth ?? 0);

  // Percentage of the total, guarded against divide-by-zero on an empty table.
  const pct = (n) => (total ? Math.round((n / total) * 100) : 0);

  // Same three buckets feed the donut chart and the status bar chart.
  const healthPieData = [
    { name: "Healthy", value: healthCounts.Healthy },
    { name: "Needs Inspection", value: healthCounts["Needs Inspection"] },
    { name: "Critical", value: healthCounts.Critical },
  ];
  const statusBarData = healthPieData;

  // /getAssetsByFittingType is already sorted by count; keep the top 4 and
  // fold the remainder into a single "Others" slice.
  const fittingTypeData = useMemo(() => {
    const rows = data?.byFittingType ?? [];
    const top = rows.slice(0, 4);
    const rest = rows.slice(4).reduce((sum, r) => sum + r.value, 0);
    return rest > 0 ? [...top, { name: "Others", value: rest }] : top;
  }, [data]);

  // /getAssetsByLocation is already sorted by count; show the top 6.
  const locationData = useMemo(() => (data?.byLocation ?? []).slice(0, 6), [data]);

  // /getCriticalAssetsDetails (worst health first) powers "Recent Alerts",
  // /getRecentAssets (newest installs) powers "Recently Added Assets".
  const criticalAssets = data?.criticalDetails ?? [];
  const recentAssets = data?.recent ?? [];

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="mt-0.5 text-[13.5px] text-slate-500 dark:text-slate-400">
          Overview of railway track fittings and inspections
          {user?.Name ? ` · Welcome back, ${user.Name}` : ""}
        </p>
      </div>

      {error && <Alert type="error" message={error} />}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-slate-500 dark:text-slate-400">
          <Loader2 className="h-4.5 w-4.5 animate-spin" />
          Loading overview...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div className="space-y-6">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
              <StatCard
                icon={Boxes}
                label="Total Assets"
                value={total}
                caption="Across all tracked locations"
                tint="bg-blue-50 text-blue-600"
              />
              <StatCard
                icon={ShieldCheck}
                label="Healthy Assets"
                value={healthCounts.Healthy}
                caption={`${pct(healthCounts.Healthy)}% of total assets`}
                tint="bg-emerald-50 text-emerald-600"
              />
              <StatCard
                icon={SearchCheck}
                label="Needs Inspection"
                value={healthCounts["Needs Inspection"]}
                caption={`${pct(healthCounts["Needs Inspection"])}% of total assets`}
                tint="bg-amber-50 text-amber-600"
              />
              <StatCard
                icon={AlertTriangle}
                label="Critical Assets"
                value={healthCounts.Critical}
                caption={`${pct(healthCounts.Critical)}% of total assets`}
                tint="bg-red-50 text-red-600"
              />
              <StatCard
                icon={CalendarCheck2}
                label="Inspections Today"
                value={MOCK_INSPECTIONS_TODAY}
                caption="Inspection logging is not wired up yet"
                sample
                tint="bg-purple-50 text-purple-600"
              />
            </div>

            {/* Health overview / trend / status */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Panel title="Health Overview">
                <div className="relative mx-auto h-44 w-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={healthPieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={54}
                        outerRadius={72}
                        paddingAngle={2}
                        startAngle={90}
                        endAngle={-270}
                      >
                        {healthPieData.map((entry) => (
                          <Cell key={entry.name} fill={BUCKET_COLORS[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v, n) => [`${v} assets`, n]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{avgHealth}%</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Overall Health</span>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  {healthPieData.map((row) => (
                    <div key={row.name} className="flex items-center justify-between text-[12.5px]">
                      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: BUCKET_COLORS[row.name] }}
                        />
                        {row.name}
                      </span>
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {row.value} ({pct(row.value)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>

              <div className="lg:col-span-2">
                <Panel
                  title="Inspection Trend"
                  action={
                    <span className="rounded-lg bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-[11.5px] font-medium text-slate-500 dark:text-slate-400">
                      Last 6 months (sample)
                    </span>
                  }
                >
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={MOCK_INSPECTION_TREND_6M} margin={{ left: -20, right: 10 }}>
                        <CartesianGrid stroke="#f1f5f9" vertical={false} />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 12, fill: "#94a3b8" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#2563eb"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: "#2563eb" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Panel title="Assets by Status">
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusBarData} margin={{ left: -20, right: 10 }}>
                      <CartesianGrid stroke="#f1f5f9" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10.5, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {statusBarData.map((entry) => (
                          <Cell key={entry.name} fill={BUCKET_COLORS[entry.name]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>

              <Panel title="Assets by Fitting Type">
                {fittingTypeData.length === 0 ? (
                  <p className="py-14 text-center text-[13px] text-slate-400">No assets yet.</p>
                ) : (
                  <>
                    <div className="mx-auto h-40 w-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={fittingTypeData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={44}
                            outerRadius={64}
                            paddingAngle={2}
                          >
                            {fittingTypeData.map((entry, i) => (
                              <Cell key={entry.name} fill={FITTING_COLORS[i % FITTING_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(v, n) => [`${v} assets`, n]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {fittingTypeData.map((row, i) => (
                        <div key={row.name} className="flex items-center justify-between text-[12px]">
                          <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: FITTING_COLORS[i % FITTING_COLORS.length] }}
                            />
                            {row.name}
                          </span>
                          <span className="font-medium text-slate-700 dark:text-slate-200">
                            {pct(row.value)}% ({row.value})
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Panel>

              <Panel title="Assets by Track Section" action={<span className="rounded-lg bg-slate-100 dark:bg-slate-700 px-2 py-1 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">sample</span>}>
                <div className="mx-auto h-40 w-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={MOCK_TRACK_SECTIONS}
                        dataKey="value"
                        nameKey="label"
                        innerRadius={44}
                        outerRadius={64}
                        paddingAngle={2}
                      >
                        {MOCK_TRACK_SECTIONS.map((entry) => (
                          <Cell key={entry.label} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 space-y-1.5">
                  {MOCK_TRACK_SECTIONS.map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                        {row.label}
                      </span>
                      <span className="font-medium text-slate-700 dark:text-slate-200">{row.value}%</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            {locationData.length > 0 && (
              <Panel title="Assets by Location (Top 6)">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData} margin={{ left: -20, right: 10 }}>
                      <CartesianGrid stroke="#f1f5f9" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10.5, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            )}

            {/* Schematic track overview - illustrative, no geo/topology backend yet */}
            <Panel
              title="Track Overview Map"
              action={
                <div className="flex items-center gap-1.5 text-slate-400">
                  <button className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <button className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60">
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <button className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              }
            >
              <div className="mb-3 flex items-center gap-4 text-[12px] text-slate-500 dark:text-slate-400">
                {Object.entries(BUCKET_COLORS).map(([label, color]) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                    {label}
                  </span>
                ))}
              </div>
              <div className="relative rounded-2xl bg-[#0b1120] px-6 py-10">
                <div className="flex items-center justify-between text-[12.5px] font-semibold text-white">
                  <span>{MOCK_TRACK_MAP.stationA}</span>
                  <span>{MOCK_TRACK_MAP.stationB}</span>
                </div>
                <div className="relative mt-4 h-0.5 w-full bg-slate-600">
                  {MOCK_TRACK_MAP.points.map((p, i) => (
                    <span
                      key={i}
                      className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0b1120]"
                      style={{ left: `${p.position}%`, backgroundColor: BUCKET_COLORS[p.status] }}
                      title={p.status}
                    />
                  ))}
                </div>
              </div>
            </Panel>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <button
                onClick={() => navigate("/assets", { state: { openAdd: true } })}
                className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Plus className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-slate-800 dark:text-slate-100">Add New Asset</span>
                  <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">Register a new asset</span>
                </span>
              </button>

              <button
                onClick={() => navigate("/inspections")}
                className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-left shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ScanEye className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-slate-800 dark:text-slate-100">Schedule Inspection</span>
                  <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">Plan inspection</span>
                </span>
              </button>

              <button
                onClick={() => navigate("/assets")}
                className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-left shadow-sm transition hover:border-amber-200 hover:bg-amber-50/40"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-600">
                  <QrCode className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-slate-800 dark:text-slate-100">Scan QR Code</span>
                  <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">Scan asset QR</span>
                </span>
              </button>

              <button
                onClick={() => navigate("/reports")}
                className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-left shadow-sm transition hover:border-purple-200 hover:bg-purple-50/40"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-purple-50 text-purple-600">
                  <FileBarChart className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-slate-800 dark:text-slate-100">Generate Report</span>
                  <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">Download reports</span>
                </span>
              </button>

              <button
                onClick={() => navigate("/alerts")}
                className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-left shadow-sm transition hover:border-red-200 hover:bg-red-50/40"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-red-50 text-red-600">
                  <BellRing className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-slate-800 dark:text-slate-100">View Alerts</span>
                  <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">Check all alerts</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Panel
              title="Recent Alerts"
              action={
                <Link
                  to="/alerts"
                  className="flex items-center gap-1 text-[12.5px] font-medium text-blue-600 hover:text-blue-700"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="space-y-3">
                {criticalAssets.length === 0 ? (
                  <p className="py-4 text-center text-[12.5px] text-slate-400">
                    No critical assets right now.
                  </p>
                ) : (
                  criticalAssets.slice(0, 5).map((asset) => {
                    const style = ALERT_SEVERITY.critical;
                    const Icon = style.icon;
                    return (
                      <div key={asset.AssetID} className="flex items-start gap-2.5">
                        <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg ${style.bg}`}>
                          <Icon className={`h-3.5 w-3.5 ${style.tint}`} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12.5px] font-medium text-slate-800 dark:text-slate-100">
                            {asset.FittingType} on {asset.TrackNumber}
                          </p>
                          <p className="truncate text-[11.5px] text-slate-400">
                            Asset ID: {asset.AssetID} · {asset.Location}
                          </p>
                        </div>
                        <span className="shrink-0 text-[11px] font-semibold text-red-500">
                          {Number(asset.CurrentHealth) || 0}%
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </Panel>

            <Panel title="Weather">
              <p className="mb-3 flex items-center gap-1 text-[11.5px] text-slate-400">
                at {MOCK_WEATHER.location}
                <span className="ml-1 rounded-full bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  sample
                </span>
              </p>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-500">
                  <CloudSun className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{MOCK_WEATHER.tempC}°C</p>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400">{MOCK_WEATHER.condition}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <Droplets className="mx-auto h-3.5 w-3.5 text-slate-400" />
                  <p className="mt-1 text-[12px] font-semibold text-slate-700 dark:text-slate-200">{MOCK_WEATHER.humidity}%</p>
                  <p className="text-[10.5px] text-slate-400">Humidity</p>
                </div>
                <div>
                  <Wind className="mx-auto h-3.5 w-3.5 text-slate-400" />
                  <p className="mt-1 text-[12px] font-semibold text-slate-700 dark:text-slate-200">{MOCK_WEATHER.windKmh} km/h</p>
                  <p className="text-[10.5px] text-slate-400">Wind</p>
                </div>
                <div>
                  <Umbrella className="mx-auto h-3.5 w-3.5 text-slate-400" />
                  <p className="mt-1 text-[12px] font-semibold text-slate-700 dark:text-slate-200">{MOCK_WEATHER.rainChance}%</p>
                  <p className="text-[10.5px] text-slate-400">Rain</p>
                </div>
              </div>
            </Panel>

            <Panel
              title="Recent Inspections"
              action={
                <Link
                  to="/inspections"
                  className="flex items-center gap-1 text-[12.5px] font-medium text-blue-600 hover:text-blue-700"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="space-y-3">
                {MOCK_RECENT_INSPECTIONS.map((insp) => (
                  <div key={insp.ID} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-medium text-slate-800 dark:text-slate-100">{insp.TrackNumber}</p>
                      <p className="text-[11.5px] text-slate-400">{insp.Location}</p>
                    </div>
                    <div className="shrink-0 text-right text-[11px] text-slate-400">
                      <p>{insp.Date}</p>
                      <p>{insp.Time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="Recently Added Assets"
              action={
                <Link
                  to="/assets"
                  className="flex items-center gap-1 text-[12.5px] font-medium text-blue-600 hover:text-blue-700"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="space-y-3">
                {recentAssets.length === 0 ? (
                  <p className="py-4 text-center text-[12.5px] text-slate-400">No assets yet.</p>
                ) : (
                  recentAssets.map((asset) => (
                    <div key={asset.AssetID} className="flex items-start gap-2.5">
                      <Boxes className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12.5px] font-medium text-slate-800 dark:text-slate-100">
                          {asset.FittingType} · {asset.TrackNumber}
                        </p>
                        <p className="truncate text-[11.5px] text-slate-400">{asset.Location}</p>
                      </div>
                      <span className="shrink-0 text-[11px] text-slate-400">
                        {toDateOnly(asset.InstallationDate) || "—"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </Panel>
          </div>
        </div>
      )}
    </AppShell>
  );
}
