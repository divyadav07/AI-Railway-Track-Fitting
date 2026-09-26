// ---------------------------------------------------------------------------
// PLACEHOLDER DATA ONLY. No API is invented here — this mirrors the pattern
// already used in dashboardData.js / inspectorData.js. Replace `assets` with
// a real fetch to your existing backend (e.g. GET /api/assets) and keep the
// same shape, or adjust the components in components/assets/ to match your
// real field names once you share the API contract.
// ---------------------------------------------------------------------------

export const fittingTypes = ["Rail Clip", "Fish Plate", "Other"];
export const assetStatuses = ["Healthy", "Needs Inspection", "Critical"];

export const assets = [
  {
    id: "004",
    type: "Rail Clip",
    location: "KM 245/7",
    health: 25,
    status: "Critical",
    qrCode: "QR-RC-0004",
    installedOn: "12 Jan 2023",
    lastInspected: "13 Sep 2026",
    inspectionHistory: [
      { id: "#1024", date: "25 Sep 2026", inspector: "Rahul Sharma", health: 25, status: "Critical", result: "Rust + hairline crack" },
      { id: "#0987", date: "02 Aug 2026", inspector: "Priya Singh", health: 38, status: "Needs Inspection", result: "Surface rust" },
      { id: "#0902", date: "14 May 2026", inspector: "Rahul Sharma", health: 61, status: "Healthy", result: "Clear" },
    ],
    maintenanceHistory: [
      { id: "MT-118", date: "27 Sep 2026", type: "Rust treatment", performedBy: "Maintenance Team B", notes: "Scheduled after critical alert" },
      { id: "MT-076", date: "05 Aug 2026", type: "Visual re-check", performedBy: "Maintenance Team A", notes: "Confirmed surface rust, no action taken" },
    ],
  },
  {
    id: "017",
    type: "Fish Plate",
    location: "KM 246/2",
    health: 31,
    status: "Critical",
    qrCode: "QR-FP-0017",
    installedOn: "03 Mar 2022",
    lastInspected: "22 Sep 2026",
    inspectionHistory: [
      { id: "#1023", date: "25 Sep 2026", inspector: "Priya Singh", health: 31, status: "Critical", result: "Missing bolt detected" },
      { id: "#0955", date: "30 Jun 2026", inspector: "Amit Yadav", health: 54, status: "Needs Inspection", result: "Bolt loosening" },
    ],
    maintenanceHistory: [
      { id: "MT-121", date: "26 Sep 2026", type: "Bolt replacement", performedBy: "Maintenance Team A", notes: "Urgent — flagged critical" },
    ],
  },
  {
    id: "023",
    type: "Rail Clip",
    location: "KM 248/3",
    health: 35,
    status: "Critical",
    qrCode: "QR-RC-0023",
    installedOn: "19 Nov 2023",
    lastInspected: "24 Sep 2026",
    inspectionHistory: [
      { id: "#1022", date: "24 Sep 2026", inspector: "Amit Yadav", health: 35, status: "Critical", result: "Missing bolt" },
    ],
    maintenanceHistory: [],
  },
  {
    id: "045",
    type: "Fish Plate",
    location: "KM 250/1",
    health: 42,
    status: "Needs Inspection",
    qrCode: "QR-FP-0045",
    installedOn: "08 Jul 2021",
    lastInspected: "18 Sep 2026",
    inspectionHistory: [
      { id: "#1010", date: "18 Sep 2026", inspector: "Priya Singh", health: 42, status: "Needs Inspection", result: "Surface rust" },
    ],
    maintenanceHistory: [
      { id: "MT-098", date: "20 Sep 2026", type: "Rust treatment", performedBy: "Maintenance Team B", notes: "Preventive treatment" },
    ],
  },
  {
    id: "067",
    type: "Rail Clip",
    location: "KM 247/6",
    health: 48,
    status: "Needs Inspection",
    qrCode: "QR-RC-0067",
    installedOn: "27 Feb 2024",
    lastInspected: "10 Sep 2026",
    inspectionHistory: [
      { id: "#0994", date: "10 Sep 2026", inspector: "Rahul Sharma", health: 48, status: "Needs Inspection", result: "Hairline crack" },
    ],
    maintenanceHistory: [],
  },
  {
    id: "006",
    type: "Rail Clip",
    location: "KM 245/9",
    health: 92,
    status: "Healthy",
    qrCode: "QR-RC-0006",
    installedOn: "14 Apr 2024",
    lastInspected: "25 Sep 2026",
    inspectionHistory: [
      { id: "#1024b", date: "25 Sep 2026", inspector: "Rahul Sharma", health: 92, status: "Healthy", result: "Clear" },
    ],
    maintenanceHistory: [],
  },
  {
    id: "003",
    type: "Fish Plate",
    location: "KM 246/8",
    health: 88,
    status: "Healthy",
    qrCode: "QR-FP-0003",
    installedOn: "02 Jan 2022",
    lastInspected: "25 Sep 2026",
    inspectionHistory: [
      { id: "#1023b", date: "25 Sep 2026", inspector: "Priya Singh", health: 88, status: "Healthy", result: "Clear" },
    ],
    maintenanceHistory: [],
  },
  {
    id: "008",
    type: "Other",
    location: "KM 248/1",
    health: 76,
    status: "Healthy",
    qrCode: "QR-OT-0008",
    installedOn: "30 Aug 2023",
    lastInspected: "24 Sep 2026",
    inspectionHistory: [
      { id: "#1022b", date: "24 Sep 2026", inspector: "Amit Yadav", health: 76, status: "Healthy", result: "Minor surface wear" },
    ],
    maintenanceHistory: [],
  },
  {
    id: "012",
    type: "Rail Clip",
    location: "KM 250/4",
    health: 81,
    status: "Healthy",
    qrCode: "QR-RC-0012",
    installedOn: "16 Jun 2024",
    lastInspected: "24 Sep 2026",
    inspectionHistory: [
      { id: "#1021b", date: "24 Sep 2026", inspector: "Rahul Sharma", health: 81, status: "Healthy", result: "Clear" },
    ],
    maintenanceHistory: [],
  },
  {
    id: "015",
    type: "Fish Plate",
    location: "KM 247/2",
    health: 69,
    status: "Needs Inspection",
    qrCode: "QR-FP-0015",
    installedOn: "11 Oct 2022",
    lastInspected: "23 Sep 2026",
    inspectionHistory: [
      { id: "#1020b", date: "23 Sep 2026", inspector: "Priya Singh", health: 69, status: "Needs Inspection", result: "Light rust forming" },
    ],
    maintenanceHistory: [],
  },
];

export function getAssetById(id) {
  return assets.find((a) => a.id === id) ?? null;
}
