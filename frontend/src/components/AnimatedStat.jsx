import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Parses "3s" / "50+" into a numeric target + suffix, then counts up from
 * 0 once the element enters the viewport. Used in the hero stat row.
 */
export default function AnimatedStat({ value, label }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="font-display text-2xl text-white">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-[0.78rem] leading-snug text-white/40">{label}</p>
    </motion.div>
  );
}
