import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "./Logo.jsx";
import PathFlow from "./PathFlow.jsx";

export default function AuthSidePanel({ title, highlight, description, points }) {
  return (
    <div className="relative hidden lg:flex lg:w-[46%] flex-col justify-between bg-ink px-12 py-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-rail-grid bg-[size:34px_34px] opacity-[0.12] animate-drift" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />

      <div className="relative flex flex-col items-start">
        <Logo tone="light" />
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-white/45 hover:text-white/75 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>
      </div>

      <div className="relative">
        <h1 className="font-display text-[2.55rem] leading-[1.08] text-white">
          {title} <span className="italic text-mint">{highlight}</span>
        </h1>
        <p className="mt-5 max-w-[38ch] text-white/50 leading-relaxed">{description}</p>

        <div className="mt-10">
          <PathFlow />
        </div>

        <ul className="mt-8 space-y-3.5">
          {points.map((text) => (
            <li key={text} className="flex items-start gap-2.5 text-[0.9rem] text-white/60">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-mint shrink-0" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-xs text-white/25">
        AI-Powered Railway Track Fitting Inspection &amp; Predictive Maintenance
      </p>
    </div>
  );
}
