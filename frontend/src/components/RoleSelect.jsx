import { ChevronDown } from "lucide-react";

// Roles offered at login/sign-up. The backend compares the chosen Role with the one stored for the user.
export const ROLE_OPTIONS = ["Track Inspector", "Maintenance Engineer", "Operations Manager", "Admin"];

// Role dropdown used on the Login and Signup forms.
export default function RoleSelect({ label = "Role", name = "Role", value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label}
      </span>
      <span className="relative flex items-center">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-[14px] text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="" disabled>
            Select your role
          </option>
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
      </span>
    </label>
  );
}