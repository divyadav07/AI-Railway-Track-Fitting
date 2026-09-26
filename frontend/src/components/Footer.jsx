import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-ink-950">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="dark" />
          <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-white/50">
            AI-assisted inspection and predictive maintenance for railway track fittings.
          </p>
        </div>

        <div>
          <div className="text-sm font-medium text-white/80">Product</div>
          <ul className="mt-4 space-y-3 text-sm text-white/50">
            <li><a href="#how-it-works" className="hover:text-white/80">How it works</a></li>
            <li><a href="#features" className="hover:text-white/80">Features</a></li>
            <li><a href="#roles" className="hover:text-white/80">Roles</a></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium text-white/80">Account</div>
          <ul className="mt-4 space-y-3 text-sm text-white/50">
            <li><Link to="/login" className="hover:text-white/80">Log in</Link></li>
            <li><Link to="/register" className="hover:text-white/80">Create an account</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium text-white/80">Project</div>
          <ul className="mt-4 space-y-3 text-sm text-white/50">
            <li>Academic / Capstone Submission</li>
            <li>Version 1.0</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.07] py-6">
        <p className="container-page text-xs text-white/35">
          © {new Date().getFullYear()} RailSentry. Built for railway track fitting inspection and predictive maintenance.
        </p>
      </div>
    </footer>
  );
}
