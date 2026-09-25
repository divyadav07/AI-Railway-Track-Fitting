import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LabeledInput from "../components/LabeledInput";
import RoleSelect, { DEFAULT_ROLE, roleLabel } from "../components/RoleSelect";
import Button from "../components/Button";
import Alert from "../components/Alert";
import AuthSidePanel from "../components/AuthSidePanel";

// Empty sign-up form. ConfirmPassword is checked in the browser only and never sent to the backend.
const initialForm = {
  Name: "",
  Email: "",
  Phone: "",
  Password: "",
  ConfirmPassword: "",
  Role: DEFAULT_ROLE,
};

const sidePoints = [
  "One record per fitting or depot, verified once and reused everywhere",
  "Admins register assets and manage users; inspectors scan and log results",
  "Every scan links straight back to your account",
];

// Sign-up page: validates locally, then calls POST /api/signUp and redirects to login.
export default function Signup() {
  const [form, setForm] = useState(initialForm);
  const [agreed, setAgreed] = useState(false);
  const { signup, loading, error, setError } = useAuth();
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Stores what the user types into the matching form field.
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Validates (passwords match, terms accepted), sends Name/Email/Phone/Password/Role to the backend,
  // then redirects to /login after a short success message.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.Password !== form.ConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      const { Name, Email, Phone, Password, Role } = form;
      await signup({ Name, Email, Phone, Password, Role });
      setSuccess("Account created successfully. Redirecting to login…");
      setTimeout(() => navigate("/login"), 1200);
    } catch {
      // error already captured in context
    }
  };

  return (
    <div className="flex min-h-screen bg-fog text-ink">
      <AuthSidePanel
        title="Set up once."
        highlight="Tracked every day after."
        description="Register as an admin or an inspector and RailSentry starts reading fitting signals the moment you're connected."
        points={sidePoints}
      />

      <div className="flex flex-1 items-center justify-center px-6 py-14 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[440px]"
        >
          <div className="mb-10 lg:hidden">
            <Link to="/" className="font-display text-xl text-ink">
              RailSentry<span className="text-mint-deep">.</span>
            </Link>
          </div>

          <h2 className="font-display text-[1.85rem] text-ink">Create your account</h2>
          <p className="mt-2 text-[0.92rem] text-ink/50">
            Choose your role, then fill in your details.
          </p>

          <div className="mt-7">
            <RoleSelect value={form.Role} onChange={handleChange} />
          </div>

          <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
            <Alert type="error" message={error} />
            <Alert type="success" message={success} />

            <LabeledInput
              label="Full name"
              icon={User}
              name="Name"
              value={form.Name}
              onChange={handleChange}
              placeholder="As it appears on your ID"
              autoComplete="name"
            />
            <LabeledInput
              label="Email"
              icon={Mail}
              type="email"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <LabeledInput
              label="Mobile number"
              icon={Phone}
              type="tel"
              name="Phone"
              value={form.Phone}
              onChange={handleChange}
              placeholder="98xxxxxxxx"
              autoComplete="tel"
            />
            <LabeledInput
              label="Password"
              icon={Lock}
              name="Password"
              value={form.Password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              toggleablePassword
            />
            <LabeledInput
              label="Confirm password"
              icon={Lock}
              name="ConfirmPassword"
              value={form.ConfirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              toggleablePassword
            />

            <label className="flex items-start gap-2 text-[0.85rem] text-ink/50">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-ink/30 accent-mint-600"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="font-medium text-mint-700 hover:text-ink">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-mint-700 hover:text-ink">
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button type="submit" icon={UserPlus} loading={loading} className="w-full" size="lg">
              Create account — {roleLabel(form.Role).toLowerCase()}
            </Button>
          </form>

          <p className="mt-8 text-center text-[0.9rem] text-ink/50">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-mint-700 transition-colors hover:text-ink">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
