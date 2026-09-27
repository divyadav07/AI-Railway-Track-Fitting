// ---------------------------------------------------------------------------
// The backend's `asset` table columns (AssetID, FittingType, TrackNumber,
// Location, InstallationDate, CurrentHealth, Status, QRCode) don't exactly
// match the shape the UI components were originally built against. These
// helpers translate one way for display and the other way for API writes,
// so the rest of the app can keep using short field names like `type` /
// `health` while every value on screen still comes from the real database.
// ---------------------------------------------------------------------------

export function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

// Backend row -> UI shape
export function mapAssetFromApi(row) {
  return {
    id: String(row.AssetID),
    type: row.FittingType,
    trackNumber: row.TrackNumber ?? "",
    location: row.Location,
    installedOn: formatDate(row.InstallationDate),
    installationDate: toDateInputValue(row.InstallationDate),
    health: row.CurrentHealth ?? 0,
    status: row.Status,
    qrCode: row.QRCode || "",
    // Not tracked by the current backend schema — no inspections table
    // exists yet, so these stay empty rather than filled with placeholder
    // rows.
    lastInspected: "—",
    inspectionHistory: [],
    maintenanceHistory: [],
  };
}

// UI form -> backend payload
export function mapAssetToApi(form) {
  return {
    FittingType: form.type,
    TrackNumber: form.trackNumber,
    Location: form.location,
    InstallationDate: form.installationDate || null,
    CurrentHealth: Number(form.health) || 0,
    Status: form.status,
    QRCode: form.qrCode || null,
  };
}
