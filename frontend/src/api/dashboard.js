// Matches backend/routes/dashboard.route.js (all routes require auth)
import { apiGet } from "./client.js";

export const getTotalAssets = () => apiGet("/getTotalAssets");
export const getHealthyAssets = () => apiGet("/getHealthyAssets");
export const getNeedsInspectionAssets = () => apiGet("/getNeedsInspectionAssets");
export const getCriticalAssets = () => apiGet("/getCriticalAssets");
export const getAverageHealth = () => apiGet("/getAverageHealth");
export const getAssetsByFittingType = () => apiGet("/getAssetsByFittingType");
export const getAssetsByLocation = () => apiGet("/getAssetsByLocation");
export const getRecentAssets = () => apiGet("/getRecentAssets");
export const getCriticalAssetsDetails = () => apiGet("/getCriticalAssetsDetails");
