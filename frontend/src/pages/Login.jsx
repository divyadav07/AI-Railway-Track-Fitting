import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LabeledInput from "../components/LabeledInput";
import RoleSelect from "../components/RoleSelect";
import Button from "../components/Button";
import Alert from "../components/Alert";
import SocialButtons from "../components/SocialButtons";
import { LoginInfoPanel } from "../components/InfoPanel";
import TrustBar from "../components/TrustBar";

// Empty login form. Field names (Email, Password, Role) are exactly what POST /api/login expects.
const initialForm = { Email: "", Password: "", Role: "" };

// Login page: collects Email + Password + Role, calls login() from AuthContext and
// opens the dashboard on success (errors are shown in the red alert box).
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
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(5,10,20,0.55), rgba(5,10,20,0.75)), url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden p-2.5 md:block">
          <LoginInfoPanel />
        </div>

        <div className="flex min-h-[560px] flex-col justify-center px-8 py-10 sm:px-12">
          <h1 className="flex items-center gap-2 text-[22px] font-bold text-slate-900">
            Welcome Back! <span className="text-xl">👋</span>
          </h1>
          <p className="mt-1 text-[13.5px] text-slate-500">
            Login to continue to your account
          </p>

          <Alert type="error" message={error} />

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <LabeledInput
              label="Email Address"
              icon={Mail}
              type="email"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />

            <div>
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
              <div className="mt-2 text-right">
                <button
                  type="button"
                  className="text-[12.5px] font-medium text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <RoleSelect value={form.Role} onChange={handleChange} />

            <Button icon={LogIn} loading={loading}>
              Login
            </Button>
          </form>

          <SocialButtons />

          <p className="mt-6 text-center text-[13px] text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <TrustBar />
    </div>
  );
}
