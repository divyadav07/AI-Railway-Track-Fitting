import { LayoutDashboard, Calendar } from "lucide-react";
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
import {
  summaryStats,
  averageHealth,
  healthDistribution,
  assetsByFittingType,
  assetsByLocation,
  criticalAssets,
  recentInspections,
  defectSummary,
  maintenanceSummary,
  importantAlerts,
  inspectorActivity,
} from "../../data/dashboardData.js";

const totalAssets = healthDistribution.reduce((sum, d) => sum + d.value, 0);

const today = new Date();
const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const timeStr = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

export default function AdminDashboard() {
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

      {/* Bottom panels */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DefectSummary data={defectSummary} />
        <MaintenanceSummary data={maintenanceSummary} />
        <AlertsPanel data={importantAlerts} />
        <InspectorActivity data={inspectorActivity} />
      </div>
    </DashboardLayout>
  );
}
