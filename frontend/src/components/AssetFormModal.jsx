import { useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import Modal from "./Modal";
import { STATUS_OPTIONS, FITTING_TYPE_OPTIONS } from "./AssetBadges";
import { toDateOnly } from "../utils/formatDate";

// Default values for a brand-new asset. Field names match the backend asset table columns.
const emptyForm = {
  FittingType: "",
  TrackNumber: "",
  Location: "",
  InstallationDate: "",
  CurrentHealth: 100,
  Status: "Healthy",
  QRCode: "",
};

// Makes a unique-looking QR code id (e.g. QR-LZ4K9A) from the current time.
function generateQrCode() {
  return `QR-${Date.now().toString(36).toUpperCase()}`;
}

// Popup form for adding a new asset or editing an existing one.
// The parent (Assets page) supplies `onSave`, which calls POST /addAsset or PUT /updateAsset/:id.
export default function AssetFormModal({ asset, onSave, onClose }) {
  const isEdit = Boolean(asset?.AssetID);
  const [form, setForm] = useState(() =>
    isEdit
      ? {
          FittingType: asset.FittingType || "",
          TrackNumber: asset.TrackNumber || "",
          Location: asset.Location || "",
          InstallationDate: toDateOnly(asset.InstallationDate),
          CurrentHealth: asset.CurrentHealth ?? 100,
          Status: asset.Status || "Healthy",
          QRCode: asset.QRCode || "",
        }
      : emptyForm
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Updates one form field; CurrentHealth is converted to a number.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "CurrentHealth" ? Number(value) : value }));
  };

  // Submits the form via onSave(); shows the backend's error message inside the modal if it fails.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave(form);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to save asset.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={isEdit ? "Edit Asset" : "Add New Asset"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg border border-rust-200 dark:border-rust-500/30 bg-rust-50 dark:bg-rust-500/10 px-3 py-2 text-[13px] text-rust-700 dark:text-rust-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink-700 dark:text-ink-200">
              Fitting Type
            </span>
            <input
              list="fitting-type-options"
              name="FittingType"
              value={form.FittingType}
              onChange={handleChange}
              required
              placeholder="e.g. Rail Clip"
              className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2.5 text-[14px] text-ink-800 dark:text-ink-100 outline-none transition focus:border-mint-600 focus:ring-2 focus:ring-mint/20"
            />
            <datalist id="fitting-type-options">
              {FITTING_TYPE_OPTIONS.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink-700 dark:text-ink-200">
              Track Number
            </span>
            <input
              name="TrackNumber"
              value={form.TrackNumber}
              onChange={handleChange}
              required
              placeholder="e.g. TRK-104"
              className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2.5 text-[14px] text-ink-800 dark:text-ink-100 outline-none transition focus:border-mint-600 focus:ring-2 focus:ring-mint/20"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-700 dark:text-ink-200">Location</span>
          <input
            name="Location"
            value={form.Location}
            onChange={handleChange}
            required
            placeholder="e.g. Km 42+300, Nagpur Section"
            className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2.5 text-[14px] text-ink-800 dark:text-ink-100 outline-none transition focus:border-mint-600 focus:ring-2 focus:ring-mint/20"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink-700 dark:text-ink-200">
              Installation Date
            </span>
            <input
              type="date"
              name="InstallationDate"
              value={form.InstallationDate}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2.5 text-[14px] text-ink-800 dark:text-ink-100 outline-none transition focus:border-mint-600 focus:ring-2 focus:ring-mint/20"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink-700 dark:text-ink-200">Status</span>
            <select
              name="Status"
              value={form.Status}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2.5 text-[14px] text-ink-700 dark:text-ink-200 outline-none transition focus:border-mint-600 focus:ring-2 focus:ring-mint/20"
            >
              {/* Keep an existing legacy status selectable so editing an old
                  asset doesn't silently show a different value. */}
              {[...STATUS_OPTIONS, ...(form.Status && !STATUS_OPTIONS.includes(form.Status) ? [form.Status] : [])].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-[13px] font-medium text-ink-700 dark:text-ink-200">
            Current Health
            <span className="font-semibold text-ink-500 dark:text-ink-400">{form.CurrentHealth}%</span>
          </span>
          <input
            type="range"
            name="CurrentHealth"
            min={0}
            max={100}
            value={form.CurrentHealth}
            onChange={handleChange}
            className="w-full accent-mint-600"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-700 dark:text-ink-200">QR Code</span>
          <span className="flex items-center gap-2">
            <input
              name="QRCode"
              value={form.QRCode}
              onChange={handleChange}
              required
              placeholder="e.g. QR-104A"
              className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2.5 text-[14px] text-ink-800 dark:text-ink-100 outline-none transition focus:border-mint-600 focus:ring-2 focus:ring-mint/20"
            />
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, QRCode: generateQrCode() }))}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-ink-200 dark:border-ink-700 px-3 py-2.5 text-[13px] font-medium text-ink-600 dark:text-ink-300 transition hover:bg-ink-50 dark:hover:bg-ink-700/60"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Generate
            </button>
          </span>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-ink-200 dark:border-ink-700 px-4 py-2.5 text-[13.5px] font-medium text-ink-700 dark:text-ink-200 transition hover:bg-ink-50 dark:hover:bg-ink-700/60 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg bg-mint px-4 py-2.5 text-[13.5px] font-semibold text-ink-dark transition hover:bg-mint-deep disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {isEdit ? "Save Changes" : "Add Asset"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
