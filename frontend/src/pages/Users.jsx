import { useEffect, useMemo, useState } from "react";
import { Search, Users as UsersIcon, Loader2 } from "lucide-react";
import AppShell from "../components/AppShell";
import Alert from "../components/Alert";
import { getUsers } from "../services/authService";

// Users page: read-only list of accounts from GET /getUsers with a name/email/role search.
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Backend: GET /api/getUsers -> { status, message, data: [...] }
        const res = await getUsers();
        if (!cancelled) setUsers(res.data || []);
      } catch (err) {
        if (!cancelled) {
          setError(err?.response?.data?.message || err?.message || "Failed to load users.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.Name?.toLowerCase().includes(q) ||
        u.Email?.toLowerCase().includes(q) ||
        u.Role?.toLowerCase().includes(q)
    );
  }, [users, search]);

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Users</h1>
          <p className="mt-0.5 text-[13.5px] text-slate-500 dark:text-slate-400">
            Inspectors, admins, and maintenance staff with system access.
          </p>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      <span className="relative mb-4 block max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or role…"
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-9 pr-3 text-[13.5px] text-slate-800 dark:text-slate-100 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </span>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-slate-500 dark:text-slate-400">
            <Loader2 className="h-4.5 w-4.5 animate-spin" />
            Loading users...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-slate-400">
            <UsersIcon className="h-8 w-8" />
            <p className="text-[13.5px]">
              {users.length === 0 ? "No users found." : "No users match your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[11.5px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.ID} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">{u.Name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{u.Email}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{u.Phone || "—"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{u.Role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
