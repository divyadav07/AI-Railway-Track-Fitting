import { motion } from "framer-motion";

// A decorative animated chain: Fitting (QR) -> AI Engine -> Dashboard.
// Mirrors a "signal path" motif appropriate to a monitoring/inspection product.
const nodes = [
  { key: "fitting", label: "Fitting", sub: "QR" },
  { key: "ai", label: "AI Engine", sub: "\u25C9" },
  { key: "dashboard", label: "Dashboard", sub: "\u25A4" },
];

export default function SignalChain({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 520 120"
        fill="none"
        className="absolute left-0 top-1/2 hidden w-full -translate-y-1/2 sm:block"
        aria-hidden="true"
      >
        <path
          d="M70 60 C 160 10, 200 110, 260 60 S 400 10, 450 60"
          stroke="#45DCC4"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
          pathLength="1"
          strokeDashoffset="1"
          className="animate-dash"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        />
      </svg>

      <div className="relative flex items-center justify-between sm:justify-around">
        {nodes.map((node, i) => (
          <motion.div
            key={node.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i + 0.2, duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[0.95rem] font-medium text-signal-300 backdrop-blur-sm">
              {i === 1 && (
                <span className="absolute inset-0 rounded-full border border-signal-400/60 animate-pulseRing" />
              )}
              {node.sub}
            </div>
            <span className="text-xs text-white/60">{node.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
