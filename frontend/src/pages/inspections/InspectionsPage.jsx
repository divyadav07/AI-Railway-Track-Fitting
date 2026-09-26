import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Plus } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import InspectionFilters from "../../components/inspections/InspectionFilters.jsx";
import InspectionsTable from "../../components/inspections/InspectionsTable.jsx";
import { inspections, toISODate } from "../../data/inspectionsData.js";

const CURRENT_INSPECTOR = "Rahul Sharma"; // mirrors the mock user in DashboardLayout

const statuses = ["Completed", "Under Review"];

export default function InspectionsPage({ role }) {
  const isAdmin = role === "admin";
  const scoped = isAdmin ? inspections : inspections.filter((i) => i.inspector === CURRENT_INSPECTOR);
  const inspectorNames = useMemo(() => [...new Set(inspections.map((i) => i.inspector))], []);

  const [query, setQuery] = useState("");
  const [inspector, setInspector] = useState("all");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("");

  const filtered = useMemo(() => {
    return scoped.filter((i) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        i.id.toLowerCase().includes(q) ||
        i.assetId.toLowerCase().includes(q) ||
        i.assetType.toLowerCase().includes(q);
      const matchesInspector = inspector === "all" || i.inspector === inspector;
      const matchesStatus = status === "all" || i.status === status;
      const matchesDate = !date || toISODate(i.date) === date;
      return matchesQuery && matchesInspector && matchesStatus && matchesDate;
    });
  }, [scoped, query, inspector, status, date]);

  const basePath = `/dashboard/${role}/inspections`;

  return (
    <DashboardLayout role={role}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-bg">
            <Camera size={19} className="text-brand-mint" strokeWidth={1.9} />
          </span>
          <div>
            <h1 className="text-[1.4rem] font-semibold leading-tight text-brand-text">
              {isAdmin ? "Inspections" : "My Inspections"}
            </h1>
            <p className="text-[0.85rem] text-brand-sub">
              {isAdmin
                ? "Monitor and review every inspection submitted across the network"
                : "Your inspection history — review past submissions or start a new one"}
            </p>
          </div>
        </div>

        {!isAdmin && (
          <Link to="/dashboard/inspector/inspections/new" className="btn-primary">
            <Plus size={16} />
            New Inspection
          </Link>
        )}
      </div>

      <div className="mt-6">
        <InspectionFilters
          query={query}
          onQueryChange={setQuery}
          inspector={inspector}
          onInspectorChange={setInspector}
          status={status}
          onStatusChange={setStatus}
          date={date}
          onDateChange={setDate}
          inspectors={inspectorNames}
          statuses={statuses}
          showInspector={isAdmin}
        />
      </div>

      <div className="mt-5">
        <InspectionsTable data={filtered} basePath={basePath} showInspector={isAdmin} />
      </div>
    </DashboardLayout>
  );
}
