import { LayoutDashboard, Calendar } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import { StatCard } from "../../components/dashboard/StatCard.jsx";
import QuickScanCard from "../../components/dashboard/QuickScanCard.jsx";
import AssignedFittingsTable from "../../components/dashboard/AssignedFittingsTable.jsx";
import MyInspectionsTable from "../../components/dashboard/MyInspectionsTable.jsx";
import AlertsPanel from "../../components/dashboard/AlertsPanel.jsx";
import MyPerformancePanel from "../../components/dashboard/MyPerformancePanel.jsx";
import {
  inspectorStats,
  assignedFittings,
  myRecentInspections,
  myAlerts,
  myPerformance,
} from "../../data/inspectorData.js";

const today = new Date();
const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const timeStr = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

export default function InspectorDashboard() {
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
              Welcome back, Rahul — here's what's assigned to you today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[0.82rem] text-brand-sub">
          <Calendar size={14} />
          {dateStr} &nbsp;·&nbsp; {timeStr}
        </div>
      </div>

      {/* Quick action */}
      <div className="mt-6">
        <QuickScanCard />
      </div>

      {/* Stat row */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {inspectorStats.map((s) => (
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
    </DashboardLayout>
  );
}
