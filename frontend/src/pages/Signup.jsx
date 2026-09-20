import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LabeledInput from "../components/LabeledInput";
import RoleSelect from "../components/RoleSelect";
import Button from "../components/Button";
import Alert from "../components/Alert";
import SocialButtons from "../components/SocialButtons";
import { SignupInfoPanel } from "../components/InfoPanel";
import TrustBar from "../components/TrustBar";

// Empty sign-up form. ConfirmPassword is checked in the browser only and never sent to the backend.
const initialForm = {
  Name: "",
  Email: "",
  Phone: "",
  Password: "",
  ConfirmPassword: "",
  Role: "",
};

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
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(5,10,20,0.55), rgba(5,10,20,0.75)), url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden p-2.5 md:block">
          <SignupInfoPanel />
        </div>

        <div className="flex min-h-[560px] flex-col justify-center px-8 py-10 sm:px-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-bold text-slate-900">Create Account</h1>
              <p className="mt-1 text-[13.5px] text-slate-500">
                Sign up to get started with AI Railway
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <UserPlus className="h-5 w-5" />
            </span>
          </div>

          <Alert type="error" message={error} />
          <Alert type="success" message={success} />

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <LabeledInput
              label="Full Name"
              icon={User}
              name="Name"
              value={form.Name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
            />
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
            <LabeledInput
              label="Phone"
              icon={Phone}
              type="tel"
              name="Phone"
              value={form.Phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
            />
            <RoleSelect value={form.Role} onChange={handleChange} />
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
              label="Confirm Password"
              icon={Lock}
              name="ConfirmPassword"
              value={form.ConfirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              toggleablePassword
            />

            <label className="flex items-start gap-2 pt-1 text-[12.5px] text-slate-500">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="font-medium text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button icon={UserPlus} loading={loading}>
              Sign Up
            </Button>
          </form>

          <SocialButtons />

          <p className="mt-6 text-center text-[13px] text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <TrustBar />
    </div>
  );
}
