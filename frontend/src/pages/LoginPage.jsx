import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import Logo from "../components/Logo.jsx";
import RoleCard from "../components/RoleCard.jsx";
import SignalChain from "../components/SignalChain.jsx";
import { roles } from "../data/content.js";

export default function LoginPage() {
  const [role, setRole] = useState("inspector");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only — wire this up to your auth API.
    console.log("Login submitted:", { role, ...form });
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
            One login. <span className="italic text-signal-400">Every fitting, in view.</span>
          </h1>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-white/55">
            Whether you're inspecting fittings in the field or overseeing the
            whole network — your credentials open the exact dashboard built for you.
          </p>
        </motion.div>

        <div className="relative z-10">
          <SignalChain className="mb-10" />
          <ul className="space-y-3 text-[0.85rem] text-white/50">
            <li className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
              QR-linked, verified access for every account
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
              Role-based dashboards — admin and inspector views differ by design
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
              Every session is tied to a verified staff ID
            </li>
          </ul>
        </div>
      </div>

      {/* ============ RIGHT — form panel (light) ============ */}
      <div className="flex items-center justify-center bg-sand-50 px-6 py-14 sm:px-10">
        <div className="w-full max-w-[440px]">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo variant="light" />
            <Link to="/" className="text-[0.85rem] text-ink-900/50">
              Back home
            </Link>
          </div>

          <h2 className="font-display text-[1.9rem] leading-tight text-ink-950">
            Log in to your dashboard
          </h2>
          <p className="mt-2.5 text-[0.92rem] text-ink-900/55">
            Select your role — the sign-in checks match it before you're in.
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
            <div>
              <label htmlFor="email" className="field-label">
                {role === "admin" ? "Work email" : "Email or employee ID"}
              </label>
              <div className="relative">
                <Mail size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/35" />
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={role === "admin" ? "you@railway.org" : "Enter your email or ID"}
                  className="field-input pl-10"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="field-label">Password</label>
                <Link to="#" className="mb-2 text-[0.8rem] text-signal-600 hover:text-signal-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/35" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="field-input pl-10 pr-10"
                  autoComplete="current-password"
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

            <button type="submit" className="btn-primary w-full py-3.5">
              Log in as {activeRole.label}
            </button>
          </form>

          <div className="my-8 h-px bg-sand-300" />

          <p className="text-center text-[0.9rem] text-ink-900/60">
            New here?{" "}
            <Link to="/register" className="font-medium text-signal-600 hover:text-signal-700">
              Create an account
            </Link>{" "}
            in under two minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
