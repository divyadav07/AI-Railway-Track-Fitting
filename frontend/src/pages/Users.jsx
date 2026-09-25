import { useEffect, useMemo, useState } from "react";
import { Search, Users as UsersIcon, Loader2 } from "lucide-react";
import AppShell from "../components/AppShell";
import Alert from "../components/Alert";
import { getUsers } from "../services/authService";
import { roleLabel } from "../components/RoleSelect";

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
          <h1 className="font-display text-[1.7rem] font-semibold leading-tight text-ink dark:text-white">Users</h1>
          <p className="mt-0.5 text-[13.5px] text-ink-500 dark:text-ink-400">
            Inspectors, admins, and maintenance staff with system access.
          </p>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      <span className="relative mb-4 block max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or role…"
          className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 py-2.5 pl-9 pr-3 text-[13.5px] text-ink-800 dark:text-ink-100 outline-none transition focus:border-mint-600 focus:ring-2 focus:ring-mint/20"
        />
      </span>

      <div className="overflow-hidden rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-ink-500 dark:text-ink-400">
            <Loader2 className="h-4.5 w-4.5 animate-spin" />
            Loading users...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-ink-400">
            <UsersIcon className="h-8 w-8" />
            <p className="text-[13.5px]">
              {users.length === 0 ? "No users found." : "No users match your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink-100 dark:border-ink-800 bg-ink-50 dark:bg-ink-900 text-[11.5px] text-ink-500 dark:text-ink-400">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.ID} className="border-b border-ink-100 dark:border-ink-700/60 last:border-0 hover:bg-ink-50/70 dark:hover:bg-white/[0.03]">
                    <td className="px-4 py-3 font-medium text-ink-800 dark:text-ink-100">{u.Name}</td>
                    <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{u.Email}</td>
                    <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{u.Phone || "—"}</td>
                    <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{roleLabel(u.Role)}</td>
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
