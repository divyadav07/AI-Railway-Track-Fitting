import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-ink-dark border-t border-white/5 text-white/60">
      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Logo tone="light" />
          <p className="mt-4 text-sm leading-relaxed max-w-[26ch]">
            Computer-vision inspection for railway track fittings, built on
            QR-tagged assets.
          </p>
        </div>

        <div>
          <p className="text-white text-sm font-medium mb-3">Platform</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#platform" className="hover:text-white transition-colors">Defect detection</a></li>
            <li><a href="#workflow" className="hover:text-white transition-colors">Workflow</a></li>
            <li><a href="#roles" className="hover:text-white transition-colors">Roles &amp; access</a></li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-medium mb-3">Access</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/login" className="hover:text-white transition-colors">Log in</Link></li>
            <li><Link to="/signup" className="hover:text-white transition-colors">Create account</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-medium mb-3">Project</p>
          <ul className="space-y-2.5 text-sm">
            <li>Academic capstone build</li>
            <li>v1.0 — 2026</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} RailSentry AI. Built for safer track maintenance.</p>
          <p>QR-tagged inspection · AI defect detection · Predictive maintenance</p>
        </div>
      </div>
    </footer>
  );
}
