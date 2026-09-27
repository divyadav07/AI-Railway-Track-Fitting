import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Pencil, QrCode, Trash2, ScanLine, MapPin, CalendarClock, AlertTriangle } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StatusPill, { healthColor } from "../../components/dashboard/StatusPill.jsx";
import AssetHealthBar from "../../components/assets/AssetHealthBar.jsx";
import AssetFormModal from "../../components/assets/AssetFormModal.jsx";
import QRCodeModal from "../../components/assets/QRCodeModal.jsx";
import * as assetsApi from "../../api/assets.js";
import { mapAssetFromApi, mapAssetToApi } from "../../utils/assetMapper.js";

export default function AssetDetailPage({ role }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function loadAsset() {
    setLoading(true);
    setError("");
    try {
      const res = await assetsApi.getAsset(id);
      setAsset(mapAssetFromApi(res.data));
    } catch (err) {
      setError(err.message || "Failed to load asset.");
      setAsset(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAsset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSaveEdit = async (form) => {
    setSaving(true);
    try {
      await assetsApi.updateAsset(id, mapAssetToApi(form));
      setEditOpen(false);
      await loadAsset();
    } catch (err) {
      setError(err.message || "Failed to update asset.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await assetsApi.deleteAsset(id);
      navigate(`/dashboard/${role}/assets`);
    } catch (err) {
      setError(err.message || "Failed to delete asset.");
      setDeleteOpen(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role={role}>
        <p className="text-[0.9rem] text-brand-sub">Loading asset…</p>
      </DashboardLayout>
    );
  }

  if (!asset) {
    return (
      <DashboardLayout role={role}>
        <p className="text-[0.9rem] text-brand-sub">
          {error || `Asset ${id} was not found.`}{" "}
          <Link to={`/dashboard/${role}/assets`} className="text-brand-info underline">
            Back to Assets
          </Link>
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={role}>
      <Link
        to={`/dashboard/${role}/assets`}
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-brand-sub transition-colors hover:text-brand-text"
      >
        <ArrowLeft size={15} /> Back to Assets
      </Link>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-[0.85rem] text-red-600">
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[1.4rem] font-semibold leading-tight text-brand-text">
              Asset {asset.id}
            </h1>
            <StatusPill status={asset.status} />
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.85rem] text-brand-sub">
            <span>{asset.type}</span>
            <span className="flex items-center gap-1"><MapPin size={13} /> {asset.location}</span>
            <span className="flex items-center gap-1"><CalendarClock size={13} /> Last inspected {asset.lastInspected}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {role === "admin" ? (
            <>
              <button onClick={() => setQrOpen(true)} className="btn-outline">
                <QrCode size={15} /> QR Code
              </button>
              <button onClick={() => setEditOpen(true)} className="btn-outline">
                <Pencil size={15} /> Edit
              </button>
              <button onClick={() => setDeleteOpen(true)} className="btn bg-brand-crit text-white hover:bg-brand-crit/90">
                <Trash2 size={15} /> Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/dashboard/inspector/inspections/new", { state: { asset } })}
              className="btn-primary"
            >
              <ScanLine size={15} /> Start New Inspection
            </button>
          )}
        </div>
      </div>

      {/* Overview */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-brand-border bg-brand-card p-5 lg:col-span-2">
          <h3 className="text-[0.95rem] font-semibold text-brand-text">Overview</h3>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-[0.85rem] sm:grid-cols-3">
            <Field label="Fitting Type" value={asset.type} />
            <Field label="Track Number" value={asset.trackNumber || "—"} />
            <Field label="Location" value={asset.location} />
            <Field label="QR Code" value={asset.qrCode || "Not generated yet"} />
            <Field label="Installed On" value={asset.installedOn} />
            <Field label="Status" value={<StatusPill status={asset.status} />} />
          </dl>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
          <h3 className="text-[0.95rem] font-semibold text-brand-text">Fitting Health</h3>
          <div className={`mt-3 text-[2.1rem] font-semibold leading-none ${healthColor(asset.health)}`}>
            {asset.health}%
          </div>
          <AssetHealthBar value={asset.health} showLabel={false} className="mt-3" />
          <p className="mt-3 text-[0.78rem] text-brand-sub">
            Based on the most recent inspection and AI defect analysis.
          </p>
        </div>
      </div>

      {/* Inspection history */}
      <div className="mt-6 rounded-2xl border border-brand-border bg-brand-card p-5">
        <h3 className="text-[0.95rem] font-semibold text-brand-text">Inspection History</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[0.85rem]">
            <thead>
              <tr className="border-b border-brand-border text-[0.75rem] text-brand-sub">
                <th className="py-2.5 font-medium">Inspection ID</th>
                <th className="py-2.5 font-medium">Date</th>
                <th className="py-2.5 font-medium">Inspector</th>
                <th className="py-2.5 font-medium">Health</th>
                <th className="py-2.5 font-medium">Result</th>
                <th className="py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={6} className="py-8 text-center text-brand-sub">No inspections logged yet.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance history */}
      <div className="mt-6 rounded-2xl border border-brand-border bg-brand-card p-5">
        <h3 className="text-[0.95rem] font-semibold text-brand-text">Maintenance History</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[0.85rem]">
            <thead>
              <tr className="border-b border-brand-border text-[0.75rem] text-brand-sub">
                <th className="py-2.5 font-medium">Record ID</th>
                <th className="py-2.5 font-medium">Date</th>
                <th className="py-2.5 font-medium">Type</th>
                <th className="py-2.5 font-medium">Performed By</th>
                <th className="py-2.5 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={5} className="py-8 text-center text-brand-sub">No maintenance recorded yet.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {role === "admin" && (
        <>
          <AssetFormModal open={editOpen} onClose={() => setEditOpen(false)} onSave={handleSaveEdit} asset={asset} saving={saving} />
          <QRCodeModal open={qrOpen} onClose={() => { setQrOpen(false); loadAsset(); }} asset={asset} />
          {deleteOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-brand-bg/60 backdrop-blur-[2px]" onClick={() => setDeleteOpen(false)} aria-hidden="true" />
              <div className="relative w-full max-w-sm rounded-2xl border border-brand-border bg-brand-card p-6 shadow-2xl">
                <h3 className="text-[1.05rem] font-semibold text-brand-text">Delete Asset {asset.id}?</h3>
                <p className="mt-2 text-[0.85rem] text-brand-sub">
                  This removes the asset permanently. This action can't be undone.
                </p>
                <div className="mt-5 flex justify-end gap-3">
                  <button onClick={() => setDeleteOpen(false)} className="btn-outline">Cancel</button>
                  <button onClick={handleDelete} className="btn bg-brand-crit text-white hover:bg-brand-crit/90">Delete</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-[0.72rem] text-brand-sub">{label}</dt>
      <dd className="mt-0.5 font-medium text-brand-text">{value}</dd>
    </div>
  );
}
