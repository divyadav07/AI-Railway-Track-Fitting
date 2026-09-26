import {
  QrCode,
  ScanEye,
  Activity,
  TrendingUp,
  History,
  LayoutDashboard,
  BellRing,
  FileOutput,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  "qr-code": QrCode,
  "scan-eye": ScanEye,
  activity: Activity,
  "trending-up": TrendingUp,
  history: History,
  "layout-dashboard": LayoutDashboard,
  "bell-ring": BellRing,
  "file-output": FileOutput,
};

export default function FeatureCard({ title, copy, icon, index = 0 }) {
  const Icon = iconMap[icon] ?? Activity;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="group rounded-2xl border border-sand-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-signal-500/40 hover:shadow-glow"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-signal-400 transition-colors duration-200 group-hover:bg-signal-500 group-hover:text-ink-950">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 font-display text-[1.1rem] text-ink-950">{title}</h3>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-900/60">{copy}</p>
    </motion.div>
  );
}
