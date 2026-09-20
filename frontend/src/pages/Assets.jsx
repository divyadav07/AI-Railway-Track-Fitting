import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, QrCode, Loader2, Boxes } from "lucide-react";
import AppShell from "../components/AppShell";
import AssetFormModal from "../components/AssetFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "../components/Alert";
import { StatusBadge, HealthBar, STATUS_OPTIONS } from "../components/AssetBadges";
import { toDateOnly } from "../utils/formatDate";
import {
  getAssets,
  addAsset,
  updateAsset,
  deleteAsset as deleteAssetApi,
} from "../services/assetService";

// Track Assets page: table of all assets with search, status filter, add, edit and delete.
// Talks to GET /getAssets, POST /addAsset, PUT /updateAsset/:id and DELETE /deleteAsset/:id.
export default function Assets() {
  const location = useLocation();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Picks up a search term handed off from the header search box
  // (AppShell navigates here with `state: { search }`).
  const [search, setSearch] = useState(location.state?.search || "");
  const [statusFilter, setStatusFilter] = useState("All");

  // Dashboard's "Add New Asset" quick action hands off state.openAdd so the
  // modal opens immediately on arrival, instead of requiring an extra click.
  const [editingAsset, setEditingAsset] = useState(
    location.state?.openAdd ? {} : null
  ); // null = closed, {} = new, {...} = edit
  const [deletingAsset, setDeletingAsset] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Loads every asset from GET /getAssets (called on open and again after each add/edit/delete).
  const fetchAssets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAssets();
      setAssets(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(null), 3000);
    return () => clearTimeout(t);
  }, [successMsg]);

  // Applies the search box + status dropdown to the loaded assets (done in the browser).
  // Search covers track number, location, fitting type and QR code.
  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      const matchesStatus = statusFilter === "All" || a.Status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        a.TrackNumber?.toLowerCase().includes(q) ||
        a.Location?.toLowerCase().includes(q) ||
        a.FittingType?.toLowerCase().includes(q) ||
        a.QRCode?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [assets, search, statusFilter]);

  // Called by the form modal: PUT /updateAsset/:id when editing, POST /addAsset when adding, then refreshes the table.
  const handleSave = async (form) => {
    if (editingAsset?.AssetID) {
      await updateAsset(editingAsset.AssetID, form);
      setSuccessMsg("Asset updated successfully.");
    } else {
      await addAsset(form);
      setSuccessMsg("Asset added successfully.");
    }
    setEditingAsset(null);
    await fetchAssets();
  };

  // Confirms deletion: DELETE /deleteAsset/:id, then refreshes the table.
  const handleDelete = async () => {
    if (!deletingAsset) return;
    setDeleting(true);
    try {
      await deleteAssetApi(deletingAsset.AssetID);
      setSuccessMsg("Asset deleted.");
      setDeletingAsset(null);
      await fetchAssets();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to delete asset.");
      setDeletingAsset(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Track Assets</h1>
          <p className="mt-0.5 text-[13.5px] text-slate-500 dark:text-slate-400">
            Manage rail fittings, health status, and inspection records.
          </p>
        </div>
        <button
          onClick={() => setEditingAsset({})}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Asset
        </button>
      </div>

      {error && <Alert type="error" message={error} />}
      {successMsg && <Alert type="success" message={successMsg} />}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <span className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by track number, location, fitting type, or QR code..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-9 pr-3 text-[13.5px] text-slate-800 dark:text-slate-100 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-[13.5px] text-slate-700 dark:text-slate-200 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-slate-500 dark:text-slate-400">
            <Loader2 className="h-4.5 w-4.5 animate-spin" />
            Loading assets...
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-slate-400">
            <Boxes className="h-8 w-8" />
            <p className="text-[13.5px]">
              {assets.length === 0 ? "No assets yet. Add your first one." : "No assets match your filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[11.5px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <th className="px-4 py-3 font-semibold">Fitting Type</th>
                  <th className="px-4 py-3 font-semibold">Track No.</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Installed</th>
                  <th className="px-4 py-3 font-semibold">Health</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">QR Code</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.AssetID} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">{asset.FittingType}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{asset.TrackNumber}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{asset.Location}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                      {asset.InstallationDate ? toDateOnly(asset.InstallationDate) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <HealthBar value={asset.CurrentHealth} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={asset.Status} />
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <QrCode className="h-3.5 w-3.5 text-slate-400" />
                        {asset.QRCode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setEditingAsset(asset)}
                          aria-label="Edit asset"
                          className="rounded-lg p-2 text-slate-500 dark:text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingAsset(asset)}
                          aria-label="Delete asset"
                          className="rounded-lg p-2 text-slate-500 dark:text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingAsset !== null && (
        <AssetFormModal
          asset={editingAsset}
          onSave={handleSave}
          onClose={() => setEditingAsset(null)}
        />
      )}

      {deletingAsset && (
        <ConfirmDialog
          title="Delete Asset"
          message={`Delete ${deletingAsset.FittingType} on ${deletingAsset.TrackNumber}? This cannot be undone.`}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeletingAsset(null)}
        />
      )}
    </AppShell>
  );
}
