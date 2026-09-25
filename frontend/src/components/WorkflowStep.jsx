import { motion } from "framer-motion";

export default function WorkflowStep({ step, title, copy, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className="relative flex gap-5 pb-10 last:pb-0"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-signal-500/40 bg-ink-950 font-display text-[0.95rem] text-signal-300">
          {step}
        </div>
        {!isLast && <div className="mt-2 w-px flex-1 bg-gradient-to-b from-signal-500/40 to-transparent" />}
      </div>
      <div className="pt-1.5">
        <h4 className="font-display text-[1.05rem] text-white">{title}</h4>
        <p className="mt-1.5 max-w-md text-[0.92rem] leading-relaxed text-white/55">{copy}</p>
      </div>
    </motion.div>
  );
}
