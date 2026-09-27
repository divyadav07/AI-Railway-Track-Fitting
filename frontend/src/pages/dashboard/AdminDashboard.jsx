import { useEffect, useState } from "react";
import { LayoutDashboard, Calendar, AlertTriangle } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import { StatCard, AverageHealthCard } from "../../components/dashboard/StatCard.jsx";
import AssetHealthDonut from "../../components/dashboard/charts/AssetHealthDonut.jsx";
import BarStatChart from "../../components/dashboard/charts/BarStatChart.jsx";
import CriticalAssetsTable from "../../components/dashboard/CriticalAssetsTable.jsx";
import RecentInspectionsTable from "../../components/dashboard/RecentInspectionsTable.jsx";
import DefectSummary from "../../components/dashboard/DefectSummary.jsx";
import MaintenanceSummary from "../../components/dashboard/MaintenanceSummary.jsx";
import AlertsPanel from "../../components/dashboard/AlertsPanel.jsx";
import InspectorActivity from "../../components/dashboard/InspectorActivity.jsx";
import * as dashboardApi from "../../api/dashboard.js";
import { getUsers } from "../../api/users.js";

const today = new Date();
const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const timeStr = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

// Zero-value shape used until real numbers arrive, and for sections the
// current backend schema simply has no table/endpoint for yet (defects,
// maintenance, alerts, per-inspector activity). No placeholder numbers are
// ever substituted in — everything here starts at 0 / empty.
const ZERO_SUMMARY = [
  { key: "total", label: "Total Assets", value: 0, delta: 0, trend: "up", tone: "info" },
  { key: "healthy", label: "Healthy Assets", value: 0, delta: 0, trend: "up", tone: "ok" },
  { key: "needsInspection", label: "Needs Inspection", value: 0, delta: 0, trend: "up", tone: "warn" },
  { key: "critical", label: "Critical Assets", value: 0, delta: 0, trend: "up", tone: "crit" },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [summaryStats, setSummaryStats] = useState(ZERO_SUMMARY);
  const [averageHealth, setAverageHealth] = useState({ value: 0, label: "—" });
  const [healthDistribution, setHealthDistribution] = useState([
    { name: "Healthy", value: 0, pct: 0, color: "#2EE6A6" },
    { name: "Needs Inspection", value: 0, pct: 0, color: "#F2B84B" },
    { name: "Critical", value: 0, pct: 0, color: "#E05252" },
  ]);
  const [assetsByFittingType, setAssetsByFittingType] = useState([]);
  const [assetsByLocation, setAssetsByLocation] = useState([]);
  const [criticalAssets, setCriticalAssets] = useState([]);
  const [inspectorActivity, setInspectorActivity] = useState({
    totalInspections: { value: 0, delta: 0 },
    activeInspectors: { value: 0 },
    weekly: [0, 0, 0, 0, 0, 0, 0],
  });

  // No backend table/endpoint exists yet for these — real data will replace
  // these empty states once an inspections/defects/maintenance/alerts API
  // is added on the backend.
  const recentInspections = [];
  const defectSummary = [];
  const maintenanceSummary = [];
  const importantAlerts = [];

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError("");
      try {
        const [
          totalRes,
          healthyRes,
          needsRes,
          criticalRes,
          avgRes,
          fittingRes,
          locationRes,
          criticalDetailsRes,
          usersRes,
        ] = await Promise.all([
          dashboardApi.getTotalAssets(),
          dashboardApi.getHealthyAssets(),
          dashboardApi.getNeedsInspectionAssets(),
          dashboardApi.getCriticalAssets(),
          dashboardApi.getAverageHealth(),
          dashboardApi.getAssetsByFittingType(),
          dashboardApi.getAssetsByLocation(),
          dashboardApi.getCriticalAssetsDetails().catch(() => ({ data: [] })),
          getUsers().catch(() => ({ data: [] })),
        ]);

        if (cancelled) return;

        const total = totalRes?.totalAssets?.totalAssets ?? 0;
        const healthy = healthyRes?.totalAssets?.healthyAssets ?? 0;
        const needsInspection = needsRes?.totalAssets?.needsInspection ?? 0;
        const critical = criticalRes?.totalAssets?.criticalAssets ?? 0;
        const avgHealth = avgRes?.data?.averageHealth ?? 0;

        setSummaryStats([
          { key: "total", label: "Total Assets", value: total, delta: 0, trend: "up", tone: "info" },
          { key: "healthy", label: "Healthy Assets", value: healthy, delta: 0, trend: "up", tone: "ok" },
          { key: "needsInspection", label: "Needs Inspection", value: needsInspection, delta: 0, trend: "up", tone: "warn" },
          { key: "critical", label: "Critical Assets", value: critical, delta: 0, trend: "up", tone: "crit" },
        ]);

        setAverageHealth({
          value: avgHealth,
          label: avgHealth >= 70 ? "Good" : avgHealth >= 40 ? "Fair" : "Poor",
        });

        const distTotal = healthy + needsInspection + critical;
        const pct = (n) => (distTotal ? Math.round((n / distTotal) * 100) : 0);
        setHealthDistribution([
          { name: "Healthy", value: healthy, pct: pct(healthy), color: "#2EE6A6" },
          { name: "Needs Inspection", value: needsInspection, pct: pct(needsInspection), color: "#F2B84B" },
          { name: "Critical", value: critical, pct: pct(critical), color: "#E05252" },
        ]);

        setAssetsByFittingType(
          (fittingRes?.data || []).map((r) => ({ name: r.FittingType, value: r.total }))
        );
        setAssetsByLocation(
          (locationRes?.data || []).map((r) => ({ name: r.Location, value: r.total }))
        );

        setCriticalAssets(
          (criticalDetailsRes?.data || []).map((a) => ({
            id: String(a.AssetID),
            type: a.FittingType,
            location: a.Location,
            health: a.CurrentHealth,
            status: a.Status,
          }))
        );

        const inspectorCount = (usersRes?.data || []).filter(
          (u) => (u.Role || "").toLowerCase() === "inspector"
        ).length;
        setInspectorActivity({
          totalInspections: { value: 0, delta: 0 },
          activeInspectors: { value: inspectorCount },
          weekly: [0, 0, 0, 0, 0, 0, 0],
        });
      } catch (err) {
        if (!cancelled) setLoadError(err.message || "Failed to load dashboard data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalAssets = healthDistribution.reduce((sum, d) => sum + d.value, 0);

  return (
    <DashboardLayout role="admin">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-bg">
            <LayoutDashboard size={19} className="text-brand-mint" strokeWidth={1.9} />
          </span>
          <div>
            <h1 className="text-[1.4rem] font-semibold leading-tight text-brand-text">
              Admin Dashboard
            </h1>
            <p className="text-[0.85rem] text-brand-sub">
              Overview of railway track assets and system status
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[0.82rem] text-brand-sub">
          <Calendar size={14} />
          {dateStr} &nbsp;·&nbsp; {timeStr}
        </div>
      </div>

      {loadError && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-[0.85rem] text-red-600">
          <AlertTriangle size={16} />
          {loadError} — showing zero values until the backend is reachable.
        </div>
      )}

      {/* Stat row */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {summaryStats.map((s) => (
          <StatCard key={s.key} {...s} />
        ))}
        <div className="col-span-2 sm:col-span-1">
          <AverageHealthCard {...averageHealth} />
        </div>
      </div>

      {/* Charts row */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <AssetHealthDonut data={healthDistribution} total={totalAssets} />
        <BarStatChart title="Assets by Fitting Type" data={assetsByFittingType} />
        <BarStatChart title="Assets by Location" data={assetsByLocation} />
      </div>

      {/* Tables row */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <CriticalAssetsTable data={criticalAssets} />
        <RecentInspectionsTable data={recentInspections} />
      </div>

      {/* Bottom panels — defects/maintenance/alerts have no backing table
          yet, so these render their real (empty) zero-state until a
          corresponding backend endpoint exists. */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DefectSummary data={defectSummary} />
        <MaintenanceSummary data={maintenanceSummary} />
        <AlertsPanel data={importantAlerts} />
        <InspectorActivity data={inspectorActivity} />
      </div>

      {loading && (
        <p className="mt-4 text-center text-[0.8rem] text-brand-sub">Loading live data…</p>
      )}
    </DashboardLayout>
  );
}
