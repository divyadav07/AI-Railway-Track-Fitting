// Matches backend/routes/asset.route.js (all routes require auth)
import { apiGet, apiPost, apiPut, apiDelete } from "./client.js";

export const getAssets = () => apiGet("/getAssets");
export const getAsset = (id) => apiGet(`/getAsset/${id}`);
export const createAsset = (payload) => apiPost("/addAsset", payload);
export const updateAsset = (id, payload) => apiPut(`/updateAsset/${id}`, payload);
export const deleteAsset = (id) => apiDelete(`/deleteAsset/${id}`);
export const searchAssets = (search) => apiGet("/searchAsset", { search });
export const getAssetsByStatus = (status) => apiGet("/getAssetsByStatus", { status });
