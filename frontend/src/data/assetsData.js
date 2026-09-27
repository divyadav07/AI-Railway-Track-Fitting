// ---------------------------------------------------------------------------
// Only the fixed enum values used by dropdowns/filters live here — these are
// UI constants, not records from the database. Every actual asset record is
// fetched live from the backend via src/api/assets.js (see AssetsPage,
// AssetDetailPage). No sample asset rows are kept here anymore.
// ---------------------------------------------------------------------------

export const fittingTypes = ["Rail Clip", "Fish Plate", "Other"];
export const assetStatuses = ["Healthy", "Needs Inspection", "Critical"];
