import { motion } from "framer-motion";

export default function ScanIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Floating result chips */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -left-4 top-8 z-20 flex items-center gap-2 rounded-lg border border-white/10 bg-ink-900/90 px-3 py-2 text-xs text-white/80 shadow-lg backdrop-blur-sm sm:-left-8"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
        Health score 92
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="absolute -right-3 bottom-16 z-20 flex items-center gap-2 rounded-lg border border-white/10 bg-ink-900/90 px-3 py-2 text-xs text-white/80 shadow-lg backdrop-blur-sm sm:-right-8"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Surface rust flagged
      </motion.div>

      {/* Main scan panel */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-6 shadow-2xl">
        <div className="absolute inset-0 bg-grid-fade bg-[size:22px_22px] opacity-40" />

        {/* scanning laser */}
        <div className="absolute inset-x-6 top-6 bottom-6 overflow-hidden rounded-lg">
          <div className="h-full w-full animate-scanline bg-gradient-to-b from-transparent via-signal-400/25 to-transparent" />
        </div>

        <div className="relative flex items-center justify-between text-xs text-white/45">
          <span>Fitting #TF-2291</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal-400" /> Live
          </span>
        </div>

        <div className="relative mt-6 flex items-center justify-center py-10">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl border border-white/15 bg-ink-950/60">
            <svg viewBox="0 0 100 100" className="h-24 w-24 text-white/85" fill="none">
              <rect x="8" y="8" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="5" />
              <rect x="64" y="8" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="5" />
              <rect x="8" y="64" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="5" />
              <rect x="18" y="18" width="8" height="8" fill="currentColor" />
              <rect x="74" y="18" width="8" height="8" fill="currentColor" />
              <rect x="18" y="74" width="8" height="8" fill="currentColor" />
              <rect x="64" y="64" width="10" height="10" fill="currentColor" />
              <rect x="80" y="64" width="12" height="4" fill="currentColor" />
              <rect x="64" y="80" width="4" height="12" fill="currentColor" />
              <rect x="80" y="80" width="12" height="12" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/10 pt-4 text-[0.8rem] text-white/55">
          <span>Rust</span>
          <span>Cracks</span>
          <span>Bolts</span>
        </div>
        <div className="relative mt-2 flex items-center justify-between text-[0.8rem] font-medium">
          <span className="text-amber-400">Flagged</span>
          <span className="text-signal-400">Clear</span>
          <span className="text-signal-400">Clear</span>
        </div>
      </div>
    </div>
  );
}
