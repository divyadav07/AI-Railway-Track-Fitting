import { useEffect, useMemo, useState } from "react";
import { Boxes, Plus, AlertTriangle } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import AssetFilters from "../../components/assets/AssetFilters.jsx";
import AssetsTable from "../../components/assets/AssetsTable.jsx";
import AssetFormModal from "../../components/assets/AssetFormModal.jsx";
import QRCodeModal from "../../components/assets/QRCodeModal.jsx";
import * as assetsApi from "../../api/assets.js";
import { mapAssetFromApi, mapAssetToApi } from "../../utils/assetMapper.js";
import { fittingTypes, assetStatuses } from "../../data/assetsData.js";

export default function AssetsPage({ role }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");

  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  const [formOpen, setFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [qrAsset, setQrAsset] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const basePath = `/dashboard/${role}/assets`;

  async function loadAssets() {
    setLoading(true);
    setLoadError("");
    try {
      const res = await assetsApi.getAssets();
      setAssets((res?.data || []).map(mapAssetFromApi));
    } catch (err) {
      setLoadError(err.message || "Failed to load assets.");
      setAssets([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssets();
  }, []);

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || a.id.toLowerCase().includes(q) || a.location.toLowerCase().includes(q);
      const matchesType = type === "all" || a.type === type;
      const matchesStatus = status === "all" || a.status === status;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [assets, query, type, status]);

  const handleAdd = () => {
    setEditingAsset(null);
    setActionError("");
    setFormOpen(true);
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setActionError("");
    setFormOpen(true);
  };

  const handleSave = async (form) => {
    setSaving(true);
    setActionError("");
    try {
      const payload = mapAssetToApi(form);
      if (editingAsset) {
        await assetsApi.updateAsset(editingAsset.id, payload);
      } else {
        await assetsApi.createAsset(payload);
      }
      setFormOpen(false);
      await loadAssets();
    } catch (err) {
      setActionError(err.message || "Failed to save asset.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setActionError("");
    try {
      await assetsApi.deleteAsset(deleteTarget.id);
      setDeleteTarget(null);
      await loadAssets();
    } catch (err) {
      setActionError(err.message || "Failed to delete asset.");
      setDeleteTarget(null);
    }
  };

  return (
    <DashboardLayout role={role}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-bg">
            <Boxes size={19} className="text-brand-mint" strokeWidth={1.9} />
          </span>
          <div>
            <h1 className="text-[1.4rem] font-semibold leading-tight text-brand-text">Assets</h1>
            <p className="text-[0.85rem] text-brand-sub">
              {role === "admin"
                ? "Manage every track fitting registered in the network"
                : "Browse assigned fittings and start an inspection"}
            </p>
          </div>
        </div>

        {role === "admin" && (
          <button onClick={handleAdd} className="btn-primary">
            <Plus size={16} />
            Add Asset
          </button>
        )}
      </div>

      {(loadError || actionError) && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-[0.85rem] text-red-600">
          <AlertTriangle size={16} />
          {loadError || actionError}
        </div>
      )}

      <div className="mt-6">
        <AssetFilters
          query={query}
          onQueryChange={setQuery}
          type={type}
          onTypeChange={setType}
          status={status}
          onStatusChange={setStatus}
          types={fittingTypes}
          statuses={assetStatuses}
        />
      </div>

      <div className="mt-5">
        <AssetsTable
          data={filtered}
          role={role}
          basePath={basePath}
          onEdit={handleEdit}
          onDelete={setDeleteTarget}
          onShowQR={setQrAsset}
        />
        {loading && <p className="mt-3 text-center text-[0.8rem] text-brand-sub">Loading assets…</p>}
      </div>

      {role === "admin" && (
        <>
          <AssetFormModal
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSave={handleSave}
            asset={editingAsset}
            saving={saving}
          />
          <QRCodeModal open={Boolean(qrAsset)} onClose={() => setQrAsset(null)} asset={qrAsset} />
          <DeleteConfirmModal
            open={Boolean(deleteTarget)}
            asset={deleteTarget}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDeleteConfirm}
          />
        </>
      )}
    </DashboardLayout>
  );
}

function DeleteConfirmModal({ open, asset, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-bg/60 backdrop-blur-[2px]" onClick={onCancel} aria-hidden="true" />
      <div className="relative w-full max-w-sm rounded-2xl border border-brand-border bg-brand-card p-6 shadow-2xl">
        <h3 className="text-[1.05rem] font-semibold text-brand-text">Delete Asset {asset?.id}?</h3>
        <p className="mt-2 text-[0.85rem] text-brand-sub">
          This removes the asset and its inspection/maintenance history. This action can't be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="btn-outline">Cancel</button>
          <button
            onClick={onConfirm}
            className="btn bg-brand-crit text-white hover:bg-brand-crit/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
