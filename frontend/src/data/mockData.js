// Frontend-only mock data powering the Inspection, Reports, Alerts, and Users
// pages. These modules don't have dedicated backend endpoints yet, so the UI
// is wired up against realistic sample data and can be swapped for real API
// calls later without changing the page structure.

export const MOCK_INSPECTIONS = [
  {
    ID: 1,
    AssetID: "AST-1001",
    TrackNumber: "12A",
    Location: "Km 245/7",
    Inspector: "Rohan Singh",
    HealthScore: 92,
    Status: "Healthy",
    Date: "2025-05-16",
  },
  {
    ID: 2,
    AssetID: "AST-1002",
    TrackNumber: "08B",
    Location: "Km 201/3",
    Inspector: "Amit Kumar",
    HealthScore: 74,
    Status: "Needs Inspection",
    Date: "2025-05-16",
  },
  {
    ID: 3,
    AssetID: "AST-1003",
    TrackNumber: "05C",
    Location: "Km 189/2",
    Inspector: "Vikram Patel",
    HealthScore: 48,
    Status: "Critical",
    Date: "2025-05-16",
  },
  {
    ID: 4,
    AssetID: "AST-1004",
    TrackNumber: "11D",
    Location: "Km 158/9",
    Inspector: "Rohan Singh",
    HealthScore: 88,
    Status: "Healthy",
    Date: "2025-05-15",
  },
  {
    ID: 5,
    AssetID: "AST-1005",
    TrackNumber: "07A",
    Location: "Km 134/6",
    Inspector: "Amit Kumar",
    HealthScore: 65,
    Status: "Needs Inspection",
    Date: "2025-05-14",
  },
];

export const HEALTH_SCORE_BREAKDOWN = {
  "AST-1003": {
    Score: 48,
    Status: "Critical",
    Factors: [
      { label: "Rust", impact: -20 },
      { label: "Crack", impact: -8 },
      { label: "Missing Bolt", impact: 0 },
      { label: "General Wear", impact: 0 },
    ],
    Recommendation: "Regular inspection recommended. Maintain before damage increases.",
  },
};

export const DETECTED_DEFECT_PRESETS = [
  { label: "Rust", confidence: 0.92, color: "#E9B23F" },
  { label: "Crack", confidence: 0.88, color: "#E2643C" },
  { label: "Missing Bolt", confidence: 0.9, color: "#2EE6A8" },
];

export const PREDICTIVE_MAINTENANCE = {
  AssetID: "AST-1003",
  Prediction: "Maintenance Recommended in 15 Days",
  RiskFactors: [
    { label: "Rust Progression", level: "High" },
    { label: "Crack Growth", level: "Medium" },
    { label: "Bolt Condition", level: "Poor" },
  ],
  HealthTrend: [
    { date: "10 Apr", actual: 82 },
    { date: "20 Apr", actual: 74 },
    { date: "30 Apr", actual: 66 },
    { date: "10 May", actual: 58 },
    { date: "20 May", actual: 50, predicted: 50 },
    { date: "30 May", predicted: 40 },
  ],
};

export const MOCK_ALERTS = [
  {
    ID: 1,
    Severity: "critical",
    Title: "AST-1003",
    Message: "Health score below 60%",
    Date: "2025-05-16",
  },
  {
    ID: 2,
    Severity: "warning",
    Title: "AST-1002",
    Message: "Crack detected",
    Date: "2025-05-16",
  },
  {
    ID: 3,
    Severity: "info",
    Title: "AST-1005",
    Message: "Maintenance due in 7 days",
    Date: "2025-05-16",
  },
];

export const HEALTH_STATUS_DISTRIBUTION = [
  { label: "Healthy", value: 69, color: "#2EE6A8" },
  { label: "Needs Inspection", value: 24, color: "#E9B23F" },
  { label: "Critical", value: 7, color: "#E2643C" },
];

export const INSPECTION_TREND = [10, 12, 8, 15, 11, 18, 16].map((v, i) => ({
  day: `${10 + i} May`,
  count: v,
}));

// ---------------------------------------------------------------------------
// Dashboard-only sample data below. The backend has no endpoints for
// inspection history over time, track-section topology, live weather, or a
// recent-activity feed, so these stay illustrative (same approach as the
// mock data above) until those APIs exist. Everything else on the Dashboard
// (totals, health mix, fitting-type/location breakdowns) is computed live
// from GET /api/getAssets.
// ---------------------------------------------------------------------------

export const MOCK_INSPECTION_TREND_6M = [
  { month: "Jan", count: 42 },
  { month: "Feb", count: 55 },
  { month: "Mar", count: 49 },
  { month: "Apr", count: 63 },
  { month: "May", count: 71 },
  { month: "Jun", count: 88 },
];

export const MOCK_TRACK_SECTIONS = [
  { label: "Station A - Station B", value: 35, color: "#14B385" },
  { label: "Station B - Station C", value: 25, color: "#2EE6A8" },
  { label: "Station C - Station D", value: 20, color: "#E9B23F" },
  { label: "Station D - Station E", value: 12, color: "#E2643C" },
  { label: "Others", value: 8, color: "#9FB3AC" },
];

export const MOCK_TRACK_MAP = {
  stationA: "Station A",
  stationB: "Station B",
  // Position (0-100 = % along the line) and health status for each marker.
  points: [
    { position: 4, status: "Healthy" },
    { position: 20, status: "Healthy" },
    { position: 34, status: "Needs Inspection" },
    { position: 48, status: "Critical" },
    { position: 62, status: "Healthy" },
    { position: 74, status: "Needs Inspection" },
    { position: 86, status: "Critical" },
    { position: 96, status: "Healthy" },
  ],
};

export const MOCK_WEATHER = {
  location: "Mumbai",
  tempC: 32,
  condition: "Partly Cloudy",
  humidity: 65,
  windKmh: 12,
  rainChance: 10,
};

export const MOCK_RECENT_ALERTS = [
  { ID: 1, Severity: "critical", Title: "Critical Health Detected", AssetID: "TRK-0457", TimeAgo: "2 min ago" },
  { ID: 2, Severity: "warning", Title: "Rust Level Increasing", AssetID: "TRK-0321", TimeAgo: "1 hour ago" },
  { ID: 3, Severity: "warning", Title: "Wear & Tear Detected", AssetID: "TRK-0189", TimeAgo: "3 hours ago" },
  { ID: 4, Severity: "critical", Title: "Missing Bolt Detected", AssetID: "TRK-0112", TimeAgo: "5 hours ago" },
  { ID: 5, Severity: "info", Title: "Inspection Completed", AssetID: "TRK-0067", TimeAgo: "1 day ago" },
];

export const MOCK_RECENT_INSPECTIONS = [
  { ID: 1, TrackNumber: "TRK-0256", Location: "Mumbai Central", Date: "20 May 2025", Time: "09:45 AM" },
  { ID: 2, TrackNumber: "TRK-0241", Location: "New Delhi", Date: "20 May 2025", Time: "08:30 AM" },
  { ID: 3, TrackNumber: "TRK-0220", Location: "Howrah", Date: "19 May 2025", Time: "05:20 PM" },
  { ID: 4, TrackNumber: "TRK-0187", Location: "Chennai Egmore", Date: "19 May 2025", Time: "03:10 PM" },
  { ID: 5, TrackNumber: "TRK-0175", Location: "Pune Junction", Date: "19 May 2025", Time: "12:05 PM" },
];

// Sample-only "inspections today" count shown on the stat card, since the
// backend doesn't timestamp inspections yet.
export const MOCK_INSPECTIONS_TODAY = 18;

export const MOCK_USERS = [
  { ID: 1, Name: "Rohan Singh", Email: "rohan.singh@railway.in", Role: "Inspector", Status: "Active" },
  { ID: 2, Name: "Amit Kumar", Email: "amit.kumar@railway.in", Role: "Inspector", Status: "Active" },
  { ID: 3, Name: "Vikram Patel", Email: "vikram.patel@railway.in", Role: "Senior Inspector", Status: "Active" },
  { ID: 4, Name: "Priya Sharma", Email: "priya.sharma@railway.in", Role: "Admin", Status: "Active" },
  { ID: 5, Name: "Sanjay Rao", Email: "sanjay.rao@railway.in", Role: "Maintenance Lead", Status: "Inactive" },
];
