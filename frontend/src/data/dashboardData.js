// ---------------------------------------------------------------------------
// PLACEHOLDER DATA ONLY.
// No backend was provided, so nothing here calls a real API or assumes a
// database schema. Each block below is shaped like a plausible dashboard
// response so the UI has something real to render — swap the exports in this
// file for real fetch/query calls once the backend endpoints are shared,
// without needing to touch any component.
// ---------------------------------------------------------------------------

export const summaryStats = [
  { key: "total", label: "Total Assets", value: 1248, delta: 5, trend: "up", tone: "info" },
  { key: "healthy", label: "Healthy Assets", value: 864, delta: 8, trend: "up", tone: "ok" },
  { key: "needsInspection", label: "Needs Inspection", value: 246, delta: 3, trend: "down", tone: "warn" },
  { key: "critical", label: "Critical Assets", value: 138, delta: 12, trend: "down", tone: "crit" },
];

export const averageHealth = { value: 78, label: "Good" };

export const healthDistribution = [
  { name: "Healthy", value: 864, pct: 69, color: "#2EE6A6" },
  { name: "Needs Inspection", value: 246, pct: 20, color: "#F2B84B" },
  { name: "Critical", value: 138, pct: 11, color: "#E05252" },
];

export const assetsByFittingType = [
  { name: "Rail Clip", value: 520 },
  { name: "Fish Plate", value: 380 },
  { name: "Other", value: 348 },
];

export const assetsByLocation = [
  { name: "KM 245/7", value: 320 },
  { name: "KM 246/2", value: 280 },
  { name: "KM 248/3", value: 215 },
  { name: "KM 250/1", value: 180 },
];

export const criticalAssets = [
  { id: "004", type: "Rail Clip", location: "KM 245/7", health: 25, status: "Critical" },
  { id: "017", type: "Fish Plate", location: "KM 246/2", health: 31, status: "Critical" },
  { id: "023", type: "Rail Clip", location: "KM 248/3", health: 35, status: "Critical" },
  { id: "045", type: "Fish Plate", location: "KM 250/1", health: 42, status: "Needs Inspection" },
  { id: "067", type: "Rail Clip", location: "KM 247/6", health: 48, status: "Needs Inspection" },
];

export const recentInspections = [
  { id: "#1024", asset: "ASSET-006", inspector: "Rahul Sharma", date: "25 Sep 2026", status: "Completed" },
  { id: "#1023", asset: "ASSET-003", inspector: "Priya Singh", date: "25 Sep 2026", status: "Completed" },
  { id: "#1022", asset: "ASSET-008", inspector: "Amit Yadav", date: "24 Sep 2026", status: "Under Review" },
  { id: "#1021", asset: "ASSET-012", inspector: "Rahul Sharma", date: "24 Sep 2026", status: "Completed" },
  { id: "#1020", asset: "ASSET-015", inspector: "Priya Singh", date: "23 Sep 2026", status: "Completed" },
];

export const defectSummary = [
  { key: "rust", label: "Rust", value: 142, delta: 6, trend: "up" },
  { key: "cracks", label: "Cracks", value: 68, delta: 12, trend: "down" },
  { key: "bolts", label: "Missing Bolts", value: 54, delta: 18, trend: "down" },
  { key: "other", label: "Other", value: 37, delta: 9, trend: "down" },
];

export const maintenanceSummary = [
  { key: "pending", label: "Pending", value: 42, tone: "warn" },
  { key: "inProgress", label: "In Progress", value: 21, tone: "info" },
  { key: "completed", label: "Completed", value: 78, tone: "ok" },
];

export const importantAlerts = [
  {
    id: 1,
    tone: "crit",
    title: "Critical asset detected",
    detail: "Asset #004 — Health 25%",
    time: "2h ago",
  },
  {
    id: 2,
    tone: "warn",
    title: "Inspection overdue",
    detail: "Asset #017 — 45 days ago",
    time: "5h ago",
  },
  {
    id: 3,
    tone: "crit",
    title: "Defect detected",
    detail: "Asset #023 — Missing bolt",
    time: "7h ago",
  },
];

export const inspectorActivity = {
  totalInspections: { value: 248, delta: 12, trend: "up" },
  activeInspectors: { value: 6 },
  weekly: [18, 24, 20, 30, 26, 34, 29],
};
