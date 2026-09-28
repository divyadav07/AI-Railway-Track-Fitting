import { useEffect, useState } from "react";
import { LayoutDashboard, Calendar, AlertTriangle } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import { StatCard } from "../../components/dashboard/StatCard.jsx";
import QuickScanCard from "../../components/dashboard/QuickScanCard.jsx";
import AssignedFittingsTable from "../../components/dashboard/AssignedFittingsTable.jsx";
import MyInspectionsTable from "../../components/dashboard/MyInspectionsTable.jsx";
import AlertsPanel from "../../components/dashboard/AlertsPanel.jsx";
import MyPerformancePanel from "../../components/dashboard/MyPerformancePanel.jsx";
import { getAssets } from "../../api/assets.js";
import { useAuth } from "../../context/AuthContext.jsx";

const today = new Date();
const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const timeStr = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

const ZERO_STATS = [
  { key: "assigned", label: "Fittings Needing Attention", value: 0, delta: 0, trend: "up", tone: "info" },
  { key: "completedToday", label: "Completed Today", value: 0, delta: 0, trend: "up", tone: "ok" },
  { key: "pending", label: "Pending Review", value: 0, delta: 0, trend: "up", tone: "warn" },
  { key: "flagged", label: "Flagged This Week", value: 0, delta: 0, trend: "up", tone: "crit" },
];

export default function InspectorDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [stats, setStats] = useState(ZERO_STATS);
  const [assignedFittings, setAssignedFittings] = useState([]);

  // No inspections table exists on the backend yet, so anything that would
  // require tracking a submitted inspection (my recent inspections, my
  // alerts, my performance) has nothing real to fetch — these start empty
  // rather than showing invented numbers.
  const myRecentInspections = [];
  const myAlerts = [];
  const myPerformance = {
    totalInspections: { value: 0, delta: 0 },
    avgTimePerInspection: "—",
    weekly: [0, 0, 0, 0, 0, 0, 0],
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError("");
      try {
        const res = await getAssets();
        if (cancelled) return;

        const rows = res?.data || [];
        // The current schema has no per-inspector assignment column, so
        // this is every real asset flagged as needing attention network
        // wide, not a per-inspector list — still real database rows, no
        // invented data.
        const needsAttention = rows.filter((a) => a.Status !== "Healthy");

        setAssignedFittings(
          needsAttention.map((a) => ({
            id: String(a.AssetID),
            type: a.FittingType,
            location: a.Location,
            lastInspected: "—",
            priority: a.Status === "Critical" ? "High" : "Medium",
          }))
        );

        setStats([
          { key: "assigned", label: "Fittings Needing Attention", value: needsAttention.length, delta: 0, trend: "up", tone: "info" },
          { key: "completedToday", label: "Completed Today", value: 0, delta: 0, trend: "up", tone: "ok" },
          { key: "pending", label: "Pending Review", value: 0, delta: 0, trend: "up", tone: "warn" },
          { key: "flagged", label: "Flagged This Week", value: 0, delta: 0, trend: "up", tone: "crit" },
        ]);
      } catch (err) {
        if (!cancelled) setLoadError(err.message || "Failed to load assets.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DashboardLayout role="inspector">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-bg">
            <LayoutDashboard size={19} className="text-brand-mint" strokeWidth={1.9} />
          </span>
          <div>
            <h1 className="text-[1.4rem] font-semibold leading-tight text-brand-text">
              Inspector Dashboard
            </h1>
            <p className="text-[0.85rem] text-brand-sub">
              Welcome back{user?.Name ? `, ${user.Name.split(" ")[0]}` : ""} — here's the current network status
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

      {/* Quick action */}
      <div className="mt-6">
        <QuickScanCard />
      </div>

      {/* Stat row */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.key} {...s} />
        ))}
      </div>

      {/* Tables row */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AssignedFittingsTable data={assignedFittings} />
        </div>
        <MyPerformancePanel data={myPerformance} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MyInspectionsTable data={myRecentInspections} />
        </div>
        <AlertsPanel data={myAlerts} />
      </div>

      {loading && (
        <p className="mt-4 text-center text-[0.8rem] text-brand-sub">Loading live data…</p>
      )}
    </DashboardLayout>
  );
}
