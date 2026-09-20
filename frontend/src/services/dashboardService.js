import api from "./api";

// Safe number coercion: mysql2 can return DECIMAL/AVG values as strings and
// AVG() of an empty table as null.
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/**
 * GET /api/getTotalAssets
 *  -> { success, message, totalAssets: { totalAssets: number } }
 */
export const getTotalAssets = async () => {
  const { data } = await api.get("/getTotalAssets");
  return num(data?.totalAssets?.totalAssets);
};

/**
 * GET /api/getHealthyAssets
 *  -> { success, message, totalAssets: { healthyAssets: number } }
 */
export const getHealthyAssets = async () => {
  const { data } = await api.get("/getHealthyAssets");
  return num(data?.totalAssets?.healthyAssets);
};

/**
 * GET /api/getNeedsInspectionAssets
 *  -> { success, message, totalAssets: { needsInspection: number } }
 */
export const getNeedsInspectionAssets = async () => {
  const { data } = await api.get("/getNeedsInspectionAssets");
  return num(data?.totalAssets?.needsInspection);
};

/**
 * GET /api/getCriticalAssets
 *  -> { success, message, totalAssets: { criticalAssets: number } }
 */
export const getCriticalAssets = async () => {
  const { data } = await api.get("/getCriticalAssets");
  return num(data?.totalAssets?.criticalAssets);
};

/**
 * GET /api/getAverageHealth
 *  -> { status, message, data: { averageHealth: number|string|null } }
 */
export const getAverageHealth = async () => {
  const { data } = await api.get("/getAverageHealth");
  return num(data?.data?.averageHealth);
};

/**
 * GET /api/getAssetsByFittingType
 *  -> { success, message, data: [{ FittingType, total }] }  (sorted by total desc)
 */
export const getAssetsByFittingType = async () => {
  const { data } = await api.get("/getAssetsByFittingType");
  return (data?.data || []).map((r) => ({ name: r.FittingType || "Unspecified", value: num(r.total) }));
};

/**
 * GET /api/getAssetsByLocation
 *  -> { success, message, data: [{ Location, total }] }  (sorted by total desc)
 */
export const getAssetsByLocation = async () => {
  const { data } = await api.get("/getAssetsByLocation");
  return (data?.data || []).map((r) => ({ name: r.Location || "Unknown", value: num(r.total) }));
};

/**
 * GET /api/getRecentAssets
 *  -> { success, message, data: Asset[] }  (5 newest by InstallationDate, no QRCode)
 */
export const getRecentAssets = async () => {
  const { data } = await api.get("/getRecentAssets");
  return data?.data || [];
};

/**
 * GET /api/getCriticalAssetsDetails
 *  -> { success, message, data: Asset[] }  (Status = 'Critical', worst health first)
 */
export const getCriticalAssetsDetails = async () => {
  const { data } = await api.get("/getCriticalAssetsDetails");
  return data?.data || [];
};

/**
 * Loads every dashboard endpoint in parallel. One failing endpoint doesn't
 * blank the whole dashboard: each section falls back to an empty value and
 * the failures are reported in `errors`.
 */
export const getDashboardData = async () => {
  const calls = {
    total: getTotalAssets,
    healthy: getHealthyAssets,
    needsInspection: getNeedsInspectionAssets,
    critical: getCriticalAssets,
    averageHealth: getAverageHealth,
    byFittingType: getAssetsByFittingType,
    byLocation: getAssetsByLocation,
    recent: getRecentAssets,
    criticalDetails: getCriticalAssetsDetails,
  };
  const fallbacks = {
    total: 0,
    healthy: 0,
    needsInspection: 0,
    critical: 0,
    averageHealth: 0,
    byFittingType: [],
    byLocation: [],
    recent: [],
    criticalDetails: [],
  };

  const keys = Object.keys(calls);
  const settled = await Promise.allSettled(keys.map((k) => calls[k]()));

  const result = { ...fallbacks };
  const errors = [];
  settled.forEach((r, i) => {
    if (r.status === "fulfilled") {
      result[keys[i]] = r.value;
    } else {
      errors.push(r.reason?.response?.data?.message || r.reason?.message || `Failed to load ${keys[i]}`);
    }
  });
  return { ...result, errors };
};
