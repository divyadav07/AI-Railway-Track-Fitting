import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gauge, ScanLine, Radar, Clock } from "lucide-react";

/**
 * Line-art rail fitting on a dark plate, with glass stat chips floating
 * around it — the same composition rhythm as the reference hero (a sketched
 * subject, a couple of circular readouts, a status pill, a few small tags).
 */
export default function HeroVisual() {
  const [score, setScore] = useState(0);
  const target = 92;

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1300;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setScore(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => (raf = requestAnimationFrame(tick)), 400);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* backdrop grid */}
      <div className="absolute inset-0 rounded-[32px] bg-ink-light/40 border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-rail-grid bg-[size:30px_30px] opacity-60 animate-drift" />
      </div>

      {/* line-art fitting illustration */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="20" y1="240" x2="380" y2="240" stroke="#2E4038" strokeWidth="3" />
        <line x1="20" y1="252" x2="380" y2="252" stroke="#2E4038" strokeWidth="3" />

        <rect
          x="140"
          y="150"
          width="120"
          height="110"
          rx="10"
          fill="none"
          stroke="#2EE6A8"
          strokeWidth="1.6"
          opacity="0.85"
        />
        {[
          [156, 168],
          [244, 168],
          [156, 242],
          [244, 242],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="7" fill="none" stroke="#2EE6A8" strokeWidth="1.4" opacity="0.85" />
        ))}

        {/* QR tag */}
        <g transform="translate(178,190)" opacity="0.9">
          <rect width="44" height="44" rx="4" fill="none" stroke="#2EE6A8" strokeWidth="1.4" />
          <rect x="6" y="6" width="10" height="10" fill="#2EE6A8" opacity="0.7" />
          <rect x="28" y="6" width="10" height="10" fill="#2EE6A8" opacity="0.7" />
          <rect x="6" y="28" width="10" height="10" fill="#2EE6A8" opacity="0.7" />
        </g>
      </svg>

      {/* health score chip, top-right */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="absolute -right-3 top-8 flex items-center gap-2 rounded-2xl bg-ink-light/90 backdrop-blur-sm border border-white/10 px-4 py-2.5 animate-floatY"
      >
        <Gauge size={16} className="text-mint" />
        <div className="leading-tight">
          <p className="font-display text-lg text-white">{score}%</p>
          <p className="text-[0.65rem] text-white/45">Health score</p>
        </div>
      </motion.div>

      {/* rust risk chip, right-mid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
        className="absolute right-2 top-1/2 flex items-center gap-2 rounded-2xl bg-ink-light/90 backdrop-blur-sm border border-white/10 px-4 py-2.5 animate-floatY"
        style={{ animationDelay: "1.2s" }}
      >
        <ScanLine size={16} className="text-rust" />
        <div className="leading-tight">
          <p className="font-display text-lg text-white">6%</p>
          <p className="text-[0.65rem] text-white/45">Rust risk</p>
        </div>
      </motion.div>

      {/* status pill, overlapping bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
        className="absolute left-4 bottom-16 flex items-center gap-2.5 rounded-full bg-ink-light/90 backdrop-blur-sm border border-white/10 pl-2.5 pr-4 py-2"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute h-2.5 w-2.5 rounded-full bg-mint" />
          <span className="absolute h-2.5 w-2.5 rounded-full bg-mint animate-pulseRing" />
        </span>
        <div className="leading-tight">
          <p className="text-[0.82rem] font-medium text-white">Healthy</p>
          <p className="text-[0.65rem] text-white/40">Fitting status</p>
        </div>
      </motion.div>

      {/* small tag, top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute left-6 top-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-light/70 px-3 py-1.5"
      >
        <Radar size={12} className="text-mint" />
        <span className="text-[0.68rem] text-white/55">AI monitoring · active</span>
      </motion.div>

      {/* small tag, bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-light/70 px-3 py-1.5"
      >
        <Clock size={12} className="text-white/50" />
        <span className="text-[0.68rem] text-white/55">Last scan · 2 min ago</span>
      </motion.div>
    </div>
  );
}
