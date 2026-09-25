import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Controlled text / password input with a leading icon (RailSentry form-field style).
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
      <span className="mb-1.5 block text-[0.85rem] font-medium text-ink/80">{label}</span>
      <span className="relative flex items-center">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-ink/35" />
        )}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className={`w-full rounded-[8px] border border-ink/15 bg-white py-[0.65rem] text-[0.95rem] text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-mint-deep focus:ring-2 focus:ring-mint/20 ${
            Icon ? "pl-10" : "pl-3.5"
          } pr-10`}
        />
        {toggleablePassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 text-ink/35 hover:text-ink/60"
            aria-label={show ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {show ? <EyeOff className="h-[17px] w-[17px]" /> : <Eye className="h-[17px] w-[17px]" />}
          </button>
        )}
      </span>
    </label>
  );
}
