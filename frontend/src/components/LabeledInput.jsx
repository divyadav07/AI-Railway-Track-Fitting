import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Controlled text / password input with a leading icon.
 *
 * Props:
 *  - label, icon, type, placeholder, name, value, onChange
 *  - toggleablePassword: renders an eye icon to reveal/hide the value
 */
export default function LabeledInput({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  toggleablePassword = false,
  autoComplete,
}) {
  const [show, setShow] = useState(false);
  const inputType = toggleablePassword ? (show ? "text" : "password") : type;

  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label}
      </span>
      <span className="relative flex items-center">
        <Icon className="pointer-events-none absolute left-3 h-[17px] w-[17px] text-slate-400" />
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        {toggleablePassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 text-slate-400 hover:text-slate-600"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? (
              <EyeOff className="h-[17px] w-[17px]" />
            ) : (
              <Eye className="h-[17px] w-[17px]" />
            )}
          </button>
        )}
      </span>
    </label>
  );
}
