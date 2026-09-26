import { useState, useEffect } from "react";
import Modal from "../Modal.jsx";
import { fittingTypes, assetStatuses } from "../../data/assetsData.js";

const blank = { id: "", type: fittingTypes[0], location: "", status: assetStatuses[0], health: 80 };

export default function AssetFormModal({ open, onClose, onSave, asset }) {
  const [form, setForm] = useState(blank);
  const isEdit = Boolean(asset);

  useEffect(() => {
    setForm(asset ? { ...asset } : blank);
  }, [asset, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "health" ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only — replace with a real POST/PATCH call to your asset API.
    onSave(form);
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? `Edit Asset ${asset.id}` : "Add New Asset"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isEdit && (
          <div>
            <label className="field-label">Asset ID</label>
            <input
              name="id"
              value={form.id}
              onChange={handleChange}
              required
              placeholder="e.g. 091"
              className="field-input"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="field-label">Fitting Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="field-input">
              {fittingTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="e.g. KM 249/3"
              className="field-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="field-label">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="field-input">
              {assetStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Health score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              name="health"
              value={form.health}
              onChange={handleChange}
              className="field-input"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {isEdit ? "Save Changes" : "Add Asset"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
