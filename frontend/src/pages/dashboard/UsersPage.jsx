import { useEffect, useState } from "react";
import { Users as UsersIcon, AlertTriangle } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StatusPill from "../../components/dashboard/StatusPill.jsx";
import { getUsers } from "../../api/users.js";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError("");
      try {
        const res = await getUsers();
        if (!cancelled) setUsers(res?.data || []);
      } catch (err) {
        if (!cancelled) setLoadError(err.message || "Failed to load users.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DashboardLayout role="admin">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-bg">
          <UsersIcon size={19} className="text-brand-mint" strokeWidth={1.9} />
        </span>
        <div>
          <h1 className="text-[1.4rem] font-semibold leading-tight text-brand-text">Users</h1>
          <p className="text-[0.85rem] text-brand-sub">Everyone registered on RailSentry</p>
        </div>
      </div>

      {loadError && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-[0.85rem] text-red-600">
          <AlertTriangle size={16} />
          {loadError}
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-brand-border bg-brand-card p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[0.85rem]">
            <thead>
              <tr className="border-b border-brand-border text-[0.75rem] text-brand-sub">
                <th className="py-2.5 font-medium">Name</th>
                <th className="py-2.5 font-medium">Email</th>
                <th className="py-2.5 font-medium">Phone</th>
                <th className="py-2.5 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.ID ?? u.UserID ?? u.Email} className="border-b border-brand-border/60 last:border-0">
                  <td className="py-3 font-medium text-brand-text">{u.Name}</td>
                  <td className="py-3 text-brand-text/80">{u.Email}</td>
                  <td className="py-3 text-brand-text/80">{u.Phone}</td>
                  <td className="py-3">
                    <StatusPill status={(u.Role || "").toLowerCase() === "admin" ? "Completed" : "Under Review"} />
                    <span className="ml-2 align-middle text-[0.78rem] text-brand-sub">{u.Role}</span>
                  </td>
                </tr>
              ))}

              {!loading && users.length === 0 && !loadError && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[0.85rem] text-brand-sub">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {loading && <p className="mt-4 text-center text-[0.8rem] text-brand-sub">Loading users…</p>}
      </div>
    </DashboardLayout>
  );
}
