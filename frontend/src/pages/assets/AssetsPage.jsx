import { useMemo, useState } from "react";
import { Boxes, Plus } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import AssetFilters from "../../components/assets/AssetFilters.jsx";
import AssetsTable from "../../components/assets/AssetsTable.jsx";
import AssetFormModal from "../../components/assets/AssetFormModal.jsx";
import QRCodeModal from "../../components/assets/QRCodeModal.jsx";
import { assets as initialAssets, fittingTypes, assetStatuses } from "../../data/assetsData.js";

export default function AssetsPage({ role }) {
  const [assets, setAssets] = useState(initialAssets);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  const [formOpen, setFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [qrAsset, setQrAsset] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const basePath = `/dashboard/${role}/assets`;

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
    setFormOpen(true);
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setFormOpen(true);
  };

  const handleSave = (form) => {
    // Frontend only — replace with POST /assets or PATCH /assets/:id on your API.
    setAssets((prev) => {
      const exists = prev.some((a) => a.id === form.id);
      if (exists) {
        return prev.map((a) => (a.id === form.id ? { ...a, ...form } : a));
      }
      return [
        {
          ...form,
          qrCode: `QR-${form.type.slice(0, 2).toUpperCase()}-${form.id}`,
          installedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          lastInspected: "—",
          inspectionHistory: [],
          maintenanceHistory: [],
        },
        ...prev,
      ];
    });
    setFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Frontend only — replace with DELETE /assets/:id on your API.
    setAssets((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
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
      </div>

      {role === "admin" && (
        <>
          <AssetFormModal
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSave={handleSave}
            asset={editingAsset}
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
