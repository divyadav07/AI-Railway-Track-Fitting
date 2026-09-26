// ---------------------------------------------------------------------------
// PLACEHOLDER DATA ONLY — same note as dashboardData.js. Nothing here calls a
// real API. Swap these exports for real fetch/query calls (scoped to the
// signed-in inspector) once the backend endpoints are shared.
// ---------------------------------------------------------------------------

export const inspectorStats = [
  { key: "assigned", label: "Assigned Fittings", value: 32, delta: 4, trend: "up", tone: "info" },
  { key: "completedToday", label: "Completed Today", value: 7, delta: 16, trend: "up", tone: "ok" },
  { key: "pending", label: "Pending Review", value: 9, delta: 5, trend: "down", tone: "warn" },
  { key: "flagged", label: "Flagged This Week", value: 5, delta: 2, trend: "up", tone: "crit" },
];

export const assignedFittings = [
  { id: "004", type: "Rail Clip", location: "KM 245/7", lastInspected: "12 days ago", priority: "High" },
  { id: "017", type: "Fish Plate", location: "KM 246/2", lastInspected: "3 days ago", priority: "High" },
  { id: "052", type: "Rail Clip", location: "KM 246/5", lastInspected: "21 days ago", priority: "Medium" },
  { id: "061", type: "Fish Plate", location: "KM 247/1", lastInspected: "6 days ago", priority: "Medium" },
  { id: "078", type: "Rail Clip", location: "KM 247/6", lastInspected: "30 days ago", priority: "Low" },
];

export const myRecentInspections = [
  { id: "#1024", asset: "ASSET-004", date: "25 Sep 2026", result: "Rust + hairline crack", status: "Completed" },
  { id: "#1021", asset: "ASSET-012", date: "24 Sep 2026", result: "Clear", status: "Completed" },
  { id: "#1019", asset: "ASSET-003", date: "24 Sep 2026", result: "Minor surface rust", status: "Completed" },
];

export const myAlerts = [
  {
    id: 1,
    tone: "crit",
    title: "Re-inspection required",
    detail: "Asset #004 — health dropped to 25%",
    time: "2h ago",
  },
  {
    id: 2,
    tone: "warn",
    title: "Inspection overdue",
    detail: "Asset #078 — last checked 30 days ago",
    time: "1d ago",
  },
];

export const myPerformance = {
  totalInspections: { value: 248, delta: 12, trend: "up" },
  avgTimePerInspection: "4m 20s",
  weekly: [4, 6, 5, 7, 6, 8, 7],
};
