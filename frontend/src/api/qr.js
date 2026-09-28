// Matches backend/routes/qr.route.js (all routes require auth)
import { apiGet, apiPost, apiPut } from "./client.js";

export const generateQrCode = (assetId) => apiPost(`/generateQRCode/${assetId}`);
export const getQrCode = (assetId) => apiGet(`/getQrCode/${assetId}`);
export const scanQrCode = (qrCode) => apiGet(`/scanQrCode/${qrCode}`);
export const updateQrCode = (assetId) => apiPut(`/updateQrCode/${assetId}`);
