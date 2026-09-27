import { useEffect, useState } from "react";
import { RefreshCw, Download, AlertTriangle } from "lucide-react";
import Modal from "../Modal.jsx";
import * as qrApi from "../../api/qr.js";

export default function QRCodeModal({ open, onClose, asset }) {
  const [qrImage, setQrImage] = useState(null);
  const [qrValue, setQrValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !asset) return;

    let cancelled = false;

    async function loadOrGenerate() {
      setLoading(true);
      setError("");
      try {
        // If the asset already has a QR code on record, fetch it; otherwise
        // generate one now. Both calls hit the real backend/database.
        if (asset.qrCode) {
          const res = await qrApi.getQrCode(asset.id);
          if (cancelled) return;
          setQrValue(res?.data?.QRCode || asset.qrCode);
          // The backend only returns an image at generation/update time, not
          // on plain fetch, so there is no image to show until regenerated.
          setQrImage(null);
        } else {
          const res = await qrApi.generateQrCode(asset.id);
          if (cancelled) return;
          setQrValue(res?.data?.qrValue || "");
          setQrImage(res?.data?.qrImage || null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load QR code.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOrGenerate();
    return () => {
      cancelled = true;
    };
  }, [open, asset]);

  if (!asset) return null;

  const handleRegenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await qrApi.updateQrCode(asset.id);
      setQrValue(res?.metadata?.qrCode || "");
      setQrImage(res?.metadata?.qrImage || null);
    } catch (err) {
      setError(err.message || "Failed to regenerate QR code.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrImage) return;
    const a = document.createElement("a");
    a.href = qrImage;
    a.download = `${qrValue || asset.qrCode || asset.id}.png`;
    a.click();
  };

  return (
    <Modal open={open} onClose={onClose} title={`QR Code — Asset ${asset.id}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-[190px] w-[190px] items-center justify-center rounded-xl border border-brand-border bg-white p-5">
          {loading && <span className="text-[0.8rem] text-brand-sub">Loading…</span>}
          {!loading && qrImage && <img src={qrImage} alt="Asset QR code" className="h-full w-full object-contain" />}
          {!loading && !qrImage && (
            <span className="text-center text-[0.78rem] text-brand-sub">
              No image available — press Regenerate to create a fresh QR image.
            </span>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-[0.78rem] text-red-600">
            <AlertTriangle size={14} /> {error}
          </div>
        )}

        <div className="text-center">
          <div className="text-[0.9rem] font-medium text-brand-text">{qrValue || "—"}</div>
          <div className="text-[0.78rem] text-brand-sub">
            {asset.type} · {asset.location}
          </div>
        </div>

        <div className="flex w-full gap-3 pt-2">
          <button onClick={handleRegenerate} disabled={loading} className="btn-outline flex-1 disabled:opacity-60">
            <RefreshCw size={15} />
            Regenerate
          </button>
          <button onClick={handleDownload} disabled={!qrImage} className="btn-primary flex-1 disabled:opacity-60">
            <Download size={15} />
            Download
          </button>
        </div>
      </div>
    </Modal>
  );
}
