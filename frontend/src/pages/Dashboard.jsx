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

// No backend endpoints yet for inspection-history-over-time, track-section
// topology, live weather, or a recent-activity feed - these start at 0 / empty
// instead of sample data, ready to be swapped for real API responses.
const INSPECTION_TREND_6M = [];
const TRACK_SECTIONS = [];
const TRACK_MAP = { stationA: "", stationB: "", points: [] };
const WEATHER = null;
const RECENT_INSPECTIONS = [];
const INSPECTIONS_TODAY = 0;

// Chart/legend colours for the three health statuses.
const BUCKET_COLORS = {
  Healthy: "#14B385",
  "Needs Inspection": "#E9B23F",
  Critical: "#E2643C",
};

// Slice colours for the "Assets by Fitting Type" chart.
const FITTING_COLORS = ["#14B385", "#2EE6A8", "#4F6B60", "#9FB3AC", "#BFF4E1"];

// Icon + colours per alert severity in the "Recent Alerts" list.
const ALERT_SEVERITY = {
  critical: { icon: AlertTriangle, tint: "text-rust-500", bg: "bg-rust-50 dark:bg-rust-500/10" },
  warning: { icon: AlertCircle, tint: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  info: { icon: Info, tint: "text-mist-500", bg: "bg-mist-50 dark:bg-mist-500/10" },
};

// One summary tile at the top (icon, label, big number, caption). `sample` adds a "sample" tag for placeholder data.
function StatCard({ icon: Icon, label, value, caption, sample, tint }) {
  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 shadow-sm">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${tint}`}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-[12.5px] font-medium text-ink-500 dark:text-ink-400">{label}</p>
      <p className="font-display text-2xl font-semibold leading-tight text-ink dark:text-white">{value}</p>
      <p className="mt-2 text-[11.5px] text-ink-400">
        {caption}
        {sample && (
          <span className="ml-1.5 rounded-full bg-ink-100 dark:bg-ink-700 px-1.5 py-0.5 text-[10px] font-medium text-ink-500 dark:text-ink-400">
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
    <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-[17px] font-medium text-ink-900 dark:text-white">{title}</h2>
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
        <h1 className="font-display text-[1.7rem] font-semibold leading-tight text-ink dark:text-white">Dashboard</h1>
        <p className="mt-0.5 text-[13.5px] text-ink-500 dark:text-ink-400">
          Overview of railway track fittings and inspections
          {user?.Name ? ` · Welcome back, ${user.Name}` : ""}
        </p>
      </div>

      {error && <Alert type="error" message={error} />}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-ink-500 dark:text-ink-400">
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
                tint="bg-ink-100 dark:bg-white/10 text-ink-700 dark:text-ink-200"
              />
              <StatCard
                icon={ShieldCheck}
                label="Healthy Assets"
                value={healthCounts.Healthy}
                caption={`${pct(healthCounts.Healthy)}% of total assets`}
                tint="bg-mint-50 dark:bg-mint-500/10 text-mint-700 dark:text-mint-300"
              />
              <StatCard
                icon={SearchCheck}
                label="Needs Inspection"
                value={healthCounts["Needs Inspection"]}
                caption={`${pct(healthCounts["Needs Inspection"])}% of total assets`}
                tint="bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300"
              />
              <StatCard
                icon={AlertTriangle}
                label="Critical Assets"
                value={healthCounts.Critical}
                caption={`${pct(healthCounts.Critical)}% of total assets`}
                tint="bg-rust-50 dark:bg-rust-500/10 text-rust-600 dark:text-rust-300"
              />
              <StatCard
                icon={CalendarCheck2}
                label="Inspections Today"
                value={INSPECTIONS_TODAY}
                caption="Inspection logging is not wired up yet"
                tint="bg-mist-50 dark:bg-mist-500/10 text-mist-600 dark:text-mist-300"
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
                    <span className="font-display text-3xl font-semibold text-ink dark:text-white">{avgHealth}%</span>
                    <span className="text-[11px] text-ink-500 dark:text-ink-400">Overall Health</span>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  {healthPieData.map((row) => (
                    <div key={row.name} className="flex items-center justify-between text-[12.5px]">
                      <span className="flex items-center gap-2 text-ink-600 dark:text-ink-300">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: BUCKET_COLORS[row.name] }}
                        />
                        {row.name}
                      </span>
                      <span className="font-medium text-ink-700 dark:text-ink-200">
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
                    <span className="rounded-lg bg-ink-100 dark:bg-ink-700 px-2.5 py-1 text-[11.5px] font-medium text-ink-500 dark:text-ink-400">
                      Last 6 months
                    </span>
                  }
                >
                  {INSPECTION_TREND_6M.length === 0 ? (
                    <div className="flex h-52 items-center justify-center text-[13px] text-ink-400">
                      No inspection history yet.
                    </div>
                  ) : (
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={INSPECTION_TREND_6M} margin={{ left: -20, right: 10 }}>
                          <CartesianGrid stroke="rgba(111,138,128,0.18)" vertical={false} />
                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: "#8A9E97" }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis tick={{ fontSize: 12, fill: "#8A9E97" }} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#14B385"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: "#14B385" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </Panel>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Panel title="Assets by Status">
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusBarData} margin={{ left: -20, right: 10 }}>
                      <CartesianGrid stroke="rgba(111,138,128,0.18)" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10.5, fill: "#8A9E97" }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        tickFormatter={(v) => (v === "Needs Inspection" ? "Needs insp." : v)}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "#8A9E97" }} axisLine={false} tickLine={false} />
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
                  <p className="py-14 text-center text-[13px] text-ink-400">No assets yet.</p>
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
                          <span className="flex items-center gap-2 text-ink-600 dark:text-ink-300">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: FITTING_COLORS[i % FITTING_COLORS.length] }}
                            />
                            {row.name}
                          </span>
                          <span className="font-medium text-ink-700 dark:text-ink-200">
                            {pct(row.value)}% ({row.value})
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Panel>

              <Panel title="Assets by Track Section">
                {TRACK_SECTIONS.length === 0 ? (
                  <p className="py-14 text-center text-[13px] text-ink-400">No track sections yet.</p>
                ) : (
                  <>
                    <div className="mx-auto h-40 w-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={TRACK_SECTIONS}
                            dataKey="value"
                            nameKey="label"
                            innerRadius={44}
                            outerRadius={64}
                            paddingAngle={2}
                          >
                            {TRACK_SECTIONS.map((entry) => (
                              <Cell key={entry.label} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {TRACK_SECTIONS.map((row) => (
                        <div key={row.label} className="flex items-center justify-between text-[12px]">
                          <span className="flex items-center gap-2 text-ink-600 dark:text-ink-300">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                            {row.label}
                          </span>
                          <span className="font-medium text-ink-700 dark:text-ink-200">{row.value}%</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Panel>
            </div>

            {locationData.length > 0 && (
              <Panel title="Assets by Location (Top 6)">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData} margin={{ left: -20, right: 10 }}>
                      <CartesianGrid stroke="rgba(111,138,128,0.18)" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10.5, fill: "#8A9E97" }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "#8A9E97" }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#14B385" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            )}

            {/* Schematic track overview - illustrative, no geo/topology backend yet */}
            <Panel
              title="Track Overview Map"
              action={
                <div className="flex items-center gap-1.5 text-ink-400">
                  <button className="grid h-7 w-7 place-items-center rounded-lg border border-ink-200 dark:border-ink-700 hover:bg-ink-50 dark:hover:bg-ink-700/60">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <button className="grid h-7 w-7 place-items-center rounded-lg border border-ink-200 dark:border-ink-700 hover:bg-ink-50 dark:hover:bg-ink-700/60">
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <button className="grid h-7 w-7 place-items-center rounded-lg border border-ink-200 dark:border-ink-700 hover:bg-ink-50 dark:hover:bg-ink-700/60">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              }
            >
              <div className="mb-3 flex items-center gap-4 text-[12px] text-ink-500 dark:text-ink-400">
                {Object.entries(BUCKET_COLORS).map(([label, color]) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                    {label}
                  </span>
                ))}
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-10">
                <div className="pointer-events-none absolute inset-0 bg-rail-grid bg-[size:30px_30px] opacity-40" />
                {TRACK_MAP.points.length === 0 ? (
                  <p className="relative py-6 text-center text-[13px] text-white/50">
                    Track topology isn't connected yet.
                  </p>
                ) : (
                  <>
                    <div className="relative flex items-center justify-between text-[12.5px] font-semibold text-white">
                      <span>{TRACK_MAP.stationA}</span>
                      <span>{TRACK_MAP.stationB}</span>
                    </div>
                    <div className="relative mt-4 h-0.5 w-full bg-ink-700">
                      {TRACK_MAP.points.map((p, i) => (
                        <span
                          key={i}
                          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink"
                          style={{ left: `${p.position}%`, backgroundColor: BUCKET_COLORS[p.status] }}
                          title={p.status}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Panel>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <button
                onClick={() => navigate("/assets", { state: { openAdd: true } })}
                className="flex flex-col items-start gap-2 rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 text-left shadow-sm transition hover:border-mint-200 dark:hover:border-mint-500/30 hover:bg-mint-50/40 dark:hover:bg-mint-500/10"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-mint-50 dark:bg-mint-500/10 text-mint-700 dark:text-mint-300">
                  <Plus className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink-800 dark:text-ink-100">Add New Asset</span>
                  <span className="block text-[11.5px] text-ink-500 dark:text-ink-400">Register a new asset</span>
                </span>
              </button>

              <button
                onClick={() => navigate("/inspections")}
                className="flex flex-col items-start gap-2 rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 text-left shadow-sm transition hover:border-ink-300 dark:hover:border-ink-500 hover:bg-ink-50 dark:hover:bg-white/5"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-100 dark:bg-white/10 text-ink-700 dark:text-ink-200">
                  <ScanEye className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink-800 dark:text-ink-100">Schedule Inspection</span>
                  <span className="block text-[11.5px] text-ink-500 dark:text-ink-400">Plan inspection</span>
                </span>
              </button>

              <button
                onClick={() => navigate("/assets")}
                className="flex flex-col items-start gap-2 rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 text-left shadow-sm transition hover:border-amber-200 dark:hover:border-amber-500/30 hover:bg-amber-50/40 dark:hover:bg-amber-500/10"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300">
                  <QrCode className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink-800 dark:text-ink-100">Scan QR Code</span>
                  <span className="block text-[11.5px] text-ink-500 dark:text-ink-400">Scan asset QR</span>
                </span>
              </button>

              <button
                onClick={() => navigate("/reports")}
                className="flex flex-col items-start gap-2 rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 text-left shadow-sm transition hover:border-mist-200 dark:hover:border-mist-500/30 hover:bg-mist-50/40 dark:hover:bg-mist-500/10"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-mist-50 dark:bg-mist-500/10 text-mist-600 dark:text-mist-300">
                  <FileBarChart className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink-800 dark:text-ink-100">Generate Report</span>
                  <span className="block text-[11.5px] text-ink-500 dark:text-ink-400">Download reports</span>
                </span>
              </button>

              <button
                onClick={() => navigate("/alerts")}
                className="flex flex-col items-start gap-2 rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 text-left shadow-sm transition hover:border-rust-200 dark:hover:border-rust-500/30 hover:bg-rust-50/40 dark:hover:bg-rust-500/10"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-rust-50 dark:bg-rust-500/10 text-rust-600 dark:text-rust-300">
                  <BellRing className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink-800 dark:text-ink-100">View Alerts</span>
                  <span className="block text-[11.5px] text-ink-500 dark:text-ink-400">Check all alerts</span>
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
                  className="flex items-center gap-1 text-[12.5px] font-medium text-mint-700 dark:text-mint-300 hover:text-mint-800 dark:hover:text-mint-300"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="space-y-3">
                {criticalAssets.length === 0 ? (
                  <p className="py-4 text-center text-[12.5px] text-ink-400">
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
                          <p className="truncate text-[12.5px] font-medium text-ink-800 dark:text-ink-100">
                            {asset.FittingType} on {asset.TrackNumber}
                          </p>
                          <p className="truncate text-[11.5px] text-ink-400">
                            Asset ID: {asset.AssetID} · {asset.Location}
                          </p>
                        </div>
                        <span className="shrink-0 text-[11px] font-semibold text-rust-500">
                          {Number(asset.CurrentHealth) || 0}%
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </Panel>

            <Panel title="Weather">
              {!WEATHER ? (
                <div className="flex flex-col items-center gap-2 py-6 text-ink-400">
                  <CloudSun className="h-8 w-8" />
                  <p className="text-[13px]">Weather isn't connected yet.</p>
                </div>
              ) : (
                <>
                  <p className="mb-3 text-[11.5px] text-ink-400">at {WEATHER.location}</p>
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500">
                      <CloudSun className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-display text-3xl font-semibold text-ink dark:text-white">{WEATHER.tempC}°C</p>
                      <p className="text-[12px] text-ink-500 dark:text-ink-400">{WEATHER.condition}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <Droplets className="mx-auto h-3.5 w-3.5 text-ink-400" />
                      <p className="mt-1 text-[12px] font-semibold text-ink-700 dark:text-ink-200">{WEATHER.humidity}%</p>
                      <p className="text-[10.5px] text-ink-400">Humidity</p>
                    </div>
                    <div>
                      <Wind className="mx-auto h-3.5 w-3.5 text-ink-400" />
                      <p className="mt-1 text-[12px] font-semibold text-ink-700 dark:text-ink-200">{WEATHER.windKmh} km/h</p>
                      <p className="text-[10.5px] text-ink-400">Wind</p>
                    </div>
                    <div>
                      <Umbrella className="mx-auto h-3.5 w-3.5 text-ink-400" />
                      <p className="mt-1 text-[12px] font-semibold text-ink-700 dark:text-ink-200">{WEATHER.rainChance}%</p>
                      <p className="text-[10.5px] text-ink-400">Rain</p>
                    </div>
                  </div>
                </>
              )}
            </Panel>

            <Panel
              title="Recent Inspections"
              action={
                <Link
                  to="/inspections"
                  className="flex items-center gap-1 text-[12.5px] font-medium text-mint-700 dark:text-mint-300 hover:text-mint-800 dark:hover:text-mint-300"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="space-y-3">
                {RECENT_INSPECTIONS.length === 0 ? (
                  <p className="py-4 text-center text-[12.5px] text-ink-400">No inspections logged yet.</p>
                ) : (
                  RECENT_INSPECTIONS.map((insp) => (
                    <div key={insp.ID} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint-600 dark:text-mint-300" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12.5px] font-medium text-ink-800 dark:text-ink-100">{insp.TrackNumber}</p>
                        <p className="text-[11.5px] text-ink-400">{insp.Location}</p>
                      </div>
                      <div className="shrink-0 text-right text-[11px] text-ink-400">
                        <p>{insp.Date}</p>
                        <p>{insp.Time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Panel>

            <Panel
              title="Recently Added Assets"
              action={
                <Link
                  to="/assets"
                  className="flex items-center gap-1 text-[12.5px] font-medium text-mint-700 dark:text-mint-300 hover:text-mint-800 dark:hover:text-mint-300"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="space-y-3">
                {recentAssets.length === 0 ? (
                  <p className="py-4 text-center text-[12.5px] text-ink-400">No assets yet.</p>
                ) : (
                  recentAssets.map((asset) => (
                    <div key={asset.AssetID} className="flex items-start gap-2.5">
                      <Boxes className="mt-0.5 h-4 w-4 shrink-0 text-mint-600 dark:text-mint-300" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12.5px] font-medium text-ink-800 dark:text-ink-100">
                          {asset.FittingType} · {asset.TrackNumber}
                        </p>
                        <p className="truncate text-[11.5px] text-ink-400">{asset.Location}</p>
                      </div>
                      <span className="shrink-0 text-[11px] text-ink-400">
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
