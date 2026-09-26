import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { RefreshCw, Download } from "lucide-react";
import Modal from "../Modal.jsx";

export default function QRCodeModal({ open, onClose, asset }) {
  const [version, setVersion] = useState(0);

  if (!asset) return null;

  // The QR payload is just the asset's code + a version marker so
  // "regenerate" visibly changes the code. Point this at your real asset
  // lookup URL / ID scheme once the backend contract is shared.
  const payload = `RAILSENTRY|ASSET|${asset.id}|${asset.qrCode}|v${version}`;

  const handleRegenerate = () => {
    // Frontend only — replace with a real POST to your QR-update endpoint.
    setVersion((v) => v + 1);
  };

  const handleDownload = () => {
    const svg = document.getElementById("asset-qr-svg");
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${asset.qrCode}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal open={open} onClose={onClose} title={`QR Code — Asset ${asset.id}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-xl border border-brand-border bg-white p-5">
          <QRCodeSVG id="asset-qr-svg" value={payload} size={180} fgColor="#07110E" level="M" />
        </div>

        <div className="text-center">
          <div className="text-[0.9rem] font-medium text-brand-text">{asset.qrCode}</div>
          <div className="text-[0.78rem] text-brand-sub">
            {asset.type} · {asset.location}
          </div>
        </div>

        <div className="flex w-full gap-3 pt-2">
          <button onClick={handleRegenerate} className="btn-outline flex-1">
            <RefreshCw size={15} />
            Regenerate
          </button>
          <button onClick={handleDownload} className="btn-primary flex-1">
            <Download size={15} />
            Download
          </button>
        </div>
      </div>
    </Modal>
  );
}
