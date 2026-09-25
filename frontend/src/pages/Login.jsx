import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LabeledInput from "../components/LabeledInput";
import RoleSelect, { DEFAULT_ROLE, roleLabel } from "../components/RoleSelect";
import Button from "../components/Button";
import Alert from "../components/Alert";
import AuthSidePanel from "../components/AuthSidePanel";

// Empty login form. Field names (Email, Password, Role) are exactly what POST /api/login expects.
const initialForm = { Email: "", Password: "", Role: DEFAULT_ROLE };

const sidePoints = [
  "One record per fitting, tied to a QR tag on the track",
  "AI defect detection for rust, cracks and missing bolts",
  "Health scores and alerts that update as fittings are inspected",
];

// Login page: collects Email + Password + Role (Admin / Inspector), calls login() from
// AuthContext and opens the dashboard on success (errors show in the alert box).
export default function Login() {
  const [form, setForm] = useState(initialForm);
  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  // Stores what the user types into the matching form field.
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Submit: clear old error, attempt login, go to /dashboard if it worked.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(form);
      navigate("/dashboard");
    } catch {
      // error already captured in context
    }
  };

  return (
    <div className="flex min-h-screen bg-fog text-ink">
      <AuthSidePanel
        title="One login."
        highlight="Every signal, in sync."
        description="Whether you're an admin or the inspector on site — sign in with your role and pick up where the track left off."
        points={sidePoints}
      />

      <div className="flex flex-1 items-center justify-center px-6 py-14 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-10 lg:hidden">
            <Link to="/" className="font-display text-xl text-ink">
              RailSentry<span className="text-mint-deep">.</span>
            </Link>
          </div>

          <h2 className="font-display text-[1.85rem] text-ink">Log in to your dashboard</h2>
          <p className="mt-2 text-[0.92rem] text-ink/50">
            Choose your role, then sign in with your email and password.
          </p>

          <div className="mt-7">
            <RoleSelect value={form.Role} onChange={handleChange} />
          </div>

          <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
            <Alert type="error" message={error} />

            <LabeledInput
              label="Email"
              icon={Mail}
              type="email"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />
            <LabeledInput
              label="Password"
              icon={Lock}
              name="Password"
              value={form.Password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              toggleablePassword
            />

            <Button type="submit" icon={LogIn} loading={loading} className="w-full" size="lg">
              Log in as {roleLabel(form.Role)}
            </Button>
          </form>

          <div className="mt-5 flex items-center justify-between text-[0.85rem]">
            <button type="button" className="text-ink/50 hover:text-ink/75">
              Forgot credentials?
            </button>
          </div>

          <div className="mt-8 border-t border-ink/10 pt-6 text-center text-[0.9rem] text-ink/50">
            New here?{" "}
            <Link to="/signup" className="font-medium text-mint-700 transition-colors hover:text-ink">
              Create an account
            </Link>{" "}
            in under two minutes.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
