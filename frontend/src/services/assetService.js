import api from "./api";

/**
 * @typedef {Object} Asset
 * @property {number} AssetID
 * @property {string} FittingType
 * @property {string} TrackNumber
 * @property {string} Location
 * @property {string} InstallationDate
 * @property {number} CurrentHealth
 * @property {string} Status
 * @property {string} QRCode
 */

/**
 * GET /api/getAssets -> { status, message, data: Asset[] }
 */
export const getAssets = async () => {
  const { data } = await api.get("/getAssets");
  return data;
};

/**
 * GET /api/getAsset/:id -> { status, message, data: Asset }
 */
export const getAsset = async (id) => {
  const { data } = await api.get(`/getAsset/${id}`);
  return data;
};

/**
 * @param {Omit<Asset,'AssetID'>} payload
 * POST /api/addAsset -> { status, message, data }
 */
export const addAsset = async (payload) => {
  const { data } = await api.post("/addAsset", payload);
  return data;
};

/**
 * @param {number|string} id
 * @param {Omit<Asset,'AssetID'>} payload
 * PUT /api/updateAsset/:id -> { status, message, data }
 */
export const updateAsset = async (id, payload) => {
  const { data } = await api.put(`/updateAsset/${id}`, payload);
  return data;
};

/**
 * DELETE /api/deleteAsset/:id -> { status, message }
 */
export const deleteAsset = async (id) => {
  const { data } = await api.delete(`/deleteAsset/${id}`);
  return data;
};

/**
 * GET /api/searchAsset?search=... -> { status, message, data: Asset[] }
 * Matches AssetID (exact) or FittingType / TrackNumber / Location / Status
 * (partial). It does NOT search QRCode, and the backend answers 404 when
 * nothing matches, so that case is returned as an empty list here.
 */
export const searchAssets = async (search) => {
  try {
    const { data } = await api.get("/searchAsset", { params: { search } });
    return data;
  } catch (err) {
    if (err?.response?.status === 404) return { status: "success", data: [] };
    throw err;
  }
};

/**
 * GET /api/getAssetsByStatus?status=... -> { status, message, data: Asset[] }
 * The backend answers 404 when no asset has that status; returned as [] here.
 */
export const getAssetsByStatus = async (status) => {
  try {
    const { data } = await api.get("/getAssetsByStatus", { params: { status } });
    return data;
  } catch (err) {
    if (err?.response?.status === 404) return { status: "success", data: [] };
    throw err;
  }
};
