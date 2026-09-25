import { ShieldCheck, Wrench } from "lucide-react";
import RoleCard from "./RoleCard";

// RailSentry has two roles: Admin and Inspector.
// `value` is exactly what the backend stores/compares (POST /api/login and /api/signUp send it
// unchanged). "Track Inspector" is the Inspector value the existing backend already uses, so
// existing accounts keep working - change it here if your database stores it differently.
export const ROLES = [
  { value: "Admin", label: "Admin", icon: ShieldCheck, description: "Manage assets & users" },
  { value: "Track Inspector", label: "Inspector", icon: Wrench, description: "Scan & log inspections" },
];
export const DEFAULT_ROLE = "Track Inspector";

// Friendly label for any backend role value (falls back to the raw value for legacy rows).
export const roleLabel = (value) => ROLES.find((r) => r.value === value)?.label || value || "Inspector";

// Admin / Inspector picker used on the Login and Signup forms. It calls onChange with a
// change-event-shaped object ({ target: { name, value } }), so the pages' existing
// handleChange keeps working untouched.
export default function RoleSelect({ name = "Role", value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Role" className="flex gap-3">
      {ROLES.map((r) => (
        <RoleCard
          key={r.value}
          icon={r.icon}
          label={r.label}
          description={r.description}
          active={value === r.value}
          onClick={() => onChange({ target: { name, value: r.value } })}
        />
      ))}
    </div>
  );
}
