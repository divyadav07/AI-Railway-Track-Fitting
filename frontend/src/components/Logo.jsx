import { Link } from "react-router-dom";

/**
 * Wordmark: a squared "rail spike" glyph + Fraunces wordmark.
 * `tone="light"` for dark backgrounds, `tone="dark"` for light ones.
 * `to` lets the app shell point the logo at /dashboard instead of the landing page.
 */
export default function Logo({ tone = "light", className = "", to = "/" }) {
  const textColor = tone === "light" ? "text-white" : "text-ink";

  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 group ${className}`}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-[6px] bg-gradient-to-br from-mint to-mint-deep shrink-0">
        <span className="absolute inset-[3px] rounded-[3px] bg-ink" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-mint" />
      </span>
      <span className={`font-display text-[1.35rem] leading-none ${textColor}`}>
        RailSentry<span className="text-mint">.</span>
      </span>
    </Link>
  );
}
