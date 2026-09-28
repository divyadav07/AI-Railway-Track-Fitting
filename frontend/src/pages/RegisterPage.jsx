import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import Logo from "../components/Logo.jsx";
import RoleCard from "../components/RoleCard.jsx";
import SignalChain from "../components/SignalChain.jsx";
import { roles } from "../data/content.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [role, setRole] = useState("inspector");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || !form.phone || !form.email || !form.password) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      await register({
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        role,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setFormError(err.message || "Registration failed. Please try again.");
    }
  };

  const activeRole = roles.find((r) => r.key === role);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* ============ LEFT — brand panel (dark) ============ */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink-950 px-12 py-10 lg:flex xl:px-16">
        <div className="pointer-events-none absolute inset-0 bg-grid-fade bg-[size:40px_40px] opacity-[0.05]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-signal-500/10 blur-[120px]" />

        <div className="relative z-10">
          <Logo variant="dark" />
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 text-[0.85rem] text-white/50 transition-colors hover:text-white/80"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-md"
        >
          <h1 className="font-display text-[2.6rem] font-normal leading-[1.1] text-white">
            Join the crew. <span className="italic text-signal-400">Inspect with AI.</span>
          </h1>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-white/55">
            Create your account to start scanning fittings, reviewing AI
            findings, or overseeing the network — set up in under two minutes.
          </p>
        </motion.div>

        <div className="relative z-10">
          <SignalChain className="mb-10" />
          <ul className="space-y-3 text-[0.85rem] text-white/50">
            <li className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
              Every account is tied to a verified employee ID
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
              Role-based dashboards from your very first login
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
              Passwords are hashed and every session is encrypted
            </li>
          </ul>
        </div>
      </div>

      {/* ============ RIGHT — form panel (light) ============ */}
      <div className="flex items-center justify-center bg-sand-50 px-6 py-14 sm:px-10">
        <div className="w-full max-w-[460px]">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo variant="light" />
            <Link to="/" className="text-[0.85rem] text-ink-900/50">
              Back home
            </Link>
          </div>

          <h2 className="font-display text-[1.9rem] leading-tight text-ink-950">
            Create your account
          </h2>
          <p className="mt-2.5 text-[0.92rem] text-ink-900/55">
            Select your role — this decides which dashboard you'll land on.
          </p>

          <div className="mt-7 flex gap-3">
            {roles.map((r) => (
              <RoleCard
                key={r.key}
                roleKey={r.key}
                label={r.label}
                sub={r.key === "admin" ? "Full access" : "Field access"}
                active={role === r.key}
                onClick={() => setRole(r.key)}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="field-label">Full name</label>
                <div className="relative">
                  <User size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/35" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="field-input pl-10"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="field-label">Phone number</label>
                <div className="relative">
                  <Phone size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/35" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="field-input pl-10"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="field-label">Work email</label>
              <div className="relative">
                <Mail size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/35" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@railway.org"
                  className="field-input pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="field-label">Password</label>
                <div className="relative">
                  <Lock size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/35" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="field-input pl-10 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-900/35 hover:text-ink-900/60"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="field-label">Confirm password</label>
                <div className="relative">
                  <Lock size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/35" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className="field-input pl-10"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-[0.82rem] text-ink-900/60">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-sand-300 text-signal-600 focus:ring-signal-500/30" />
              I agree to the terms of use and confirm my details are accurate.
            </label>

            {formError && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-[0.82rem] text-red-600">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-2 rounded-lg bg-brand-okBg px-3.5 py-2.5 text-[0.82rem] text-brand-ok">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                <span>Account created. Redirecting to login…</span>
              </div>
            )}

            <button type="submit" disabled={loading || success} className="btn-primary w-full py-3.5 disabled:opacity-60">
              {loading ? "Creating account…" : `Create ${activeRole.label} account`}
            </button>
          </form>

          <div className="my-8 h-px bg-sand-300" />

          <p className="text-center text-[0.9rem] text-ink-900/60">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-signal-600 hover:text-signal-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
