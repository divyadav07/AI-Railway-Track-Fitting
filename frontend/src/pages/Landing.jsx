import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  QrCode,
  ScanEye,
  Gauge,
  BellRing,
  FileDown,
  ShieldCheck,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Button from "../components/Button.jsx";
import HeroVisual from "../components/HeroVisual.jsx";
import AnimatedStat from "../components/AnimatedStat.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stats = [
  { value: "3s", label: "to pull asset details from a scanned QR tag" },
  { value: "5s", label: "for the AI model to return a defect result" },
  { value: "50+", label: "concurrent inspectors the dashboard supports" },
];

const workflow = [
  { title: "Scan the fitting", text: "An inspector scans the QR tag fixed to the fitting to pull its asset record from the database." },
  { title: "Capture an image", text: "A phone or USB camera captures the fitting on site — no special hardware required." },
  { title: "AI reads the image", text: "The vision model checks for rust, cracks and missing bolts and scores what it finds." },
  { title: "Health score is set", text: "Results are converted into a health score, and a maintenance need is predicted from it." },
  { title: "Dashboard updates", text: "The record, alert and history update live for admins watching the full network." },
];

const defects = [
  { icon: ScanEye, title: "Rust and corrosion", text: "Surface oxidation on plates, clips and bolts is flagged before it spreads." },
  { icon: Gauge, title: "Hairline cracks", text: "Structural cracking is caught early, well before it's visible on a routine walk-past." },
  { icon: ShieldCheck, title: "Missing bolts", text: "Absent or loosened fasteners are identified against the fitting's expected layout." },
];

const roles = [
  { icon: ShieldCheck, title: "Admin", text: "Registers assets, manages users, reviews the network-wide dashboard and exports reports." },
  { icon: Wrench, title: "Inspector", text: "Scans fittings on site, captures images, and logs inspection results from the field." },
];

export default function Landing() {
  return (
    <div id="top" className="bg-ink text-white">
      <Navbar />

      {/* ---------- Hero — ink ---------- */}
      <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32 bg-ink">
        <div className="pointer-events-none absolute inset-0 bg-rail-grid bg-[size:36px_36px] opacity-[0.08]" />
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center relative">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
            <motion.p variants={fadeUp} className="text-mint font-medium text-sm mb-5">
              Built for railway networks
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-[2.75rem] sm:text-[3.4rem] leading-[1.05] text-white">
              Know your fitting.{" "}
              <span className="italic text-mint">Long before it fails.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-white/55">
              RailSentry reads every QR-tagged fitting as it's scanned, and
              flags the rust, cracks and missing bolts that turn into
              failures — while they're still small.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <Button as={Link} to="/signup" size="lg">
                Get started
              </Button>
              <Button as={Link} to="/login" variant="outlineLight" size="lg">
                Log in to dashboard
              </Button>
            </motion.div>

            {/* animation 1 of 2: stats count up once scrolled into view */}
            <motion.div variants={fadeUp} className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {stats.map((s) => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* ---------- Problem strip — mint ---------- */}
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-6 py-14 grid gap-8 sm:grid-cols-2">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-display text-xl text-ink leading-snug"
          >
            Manual walk-past inspection can't keep pace with a growing
            network of fittings.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="text-ink/75 leading-relaxed"
          >
            Paper logs lose records, defects get spotted late, and no two
            inspectors read a fitting the same way. RailSentry replaces that
            with one identity per fitting and one consistent AI reading of
            its condition.
          </motion.p>
        </div>
      </section>

      {/* ---------- Workflow — ink ---------- */}
      <section id="workflow" className="py-24 bg-ink">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl text-white">
              From a scan to a maintenance plan
            </h2>
            <p className="mt-3 text-white/50">
              Five steps, from a QR scan in the field to a live dashboard
              back at the depot.
            </p>
          </div>

          {/* animation 2 of 2: steps stagger in on scroll, connector line draws in behind them */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5"
          >
            {workflow.map((step, i) => (
              <motion.div
                key={step.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
                className="relative"
              >
                <span className="font-display text-3xl text-mint/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-medium text-white">{step.title}</p>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-white/45">{step.text}</p>
                {i < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-4 left-[calc(100%_-_0.5rem)] w-8 h-px overflow-hidden">
                    <motion.div
                      variants={{
                        hidden: { scaleX: 0 },
                        show: { scaleX: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
                      }}
                      style={{ transformOrigin: "left" }}
                      className="h-full w-full border-t border-dashed border-mint/40"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Defect detection features — mint ---------- */}
      <section id="platform" className="py-24 bg-mint">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl text-ink">
              What the model is trained to see
            </h2>
            <p className="mt-3 text-ink/70">
              Three defect categories drive the health score behind every
              fitting.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {defects.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-ink p-7 transition-colors hover:border-mint/40 hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint/15">
                  <Icon size={19} className="text-mint" strokeWidth={1.75} />
                </span>
                <p className="mt-5 font-display text-lg text-white">{title}</p>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-white/70">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { icon: QrCode, title: "Asset lookup", text: "Every scan resolves to an asset record in under three seconds." },
              { icon: BellRing, title: "Maintenance alerts", text: "Low health scores raise an alert automatically for planners." },
              { icon: FileDown, title: "PDF reporting", text: "Inspection history exports as a shareable, printable report." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3.5">
                <Icon size={18} className="mt-0.5 shrink-0 text-ink" strokeWidth={1.75} />
                <div>
                  <p className="font-medium text-ink/85 text-sm">{title}</p>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-ink/60">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Roles — ink ---------- */}
      <section id="roles" className="py-24 bg-ink">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl text-white">
              One platform, two roles
            </h2>
            <p className="mt-3 text-white/50">
              Admins run the network; inspectors work the track. Pick your
              role at login and get to work.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {roles.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-ink-light/40 p-8 hover:border-mint/25 transition-colors"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10">
                  <Icon size={20} className="text-mint" strokeWidth={1.75} />
                </span>
                <p className="mt-5 font-display text-xl text-white">{title}</p>
                <p className="mt-2 text-white/50 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA band — mint ---------- */}
      <section className="py-20 bg-mint">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[28px] bg-ink px-8 py-14 sm:px-16 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-rail-grid bg-[size:32px_32px] opacity-[0.12]" />
            <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-display text-2xl sm:text-3xl text-white max-w-md">
                Tag your first fitting and see a health score in minutes.
              </h3>
              <div className="flex gap-4 shrink-0">
                <Button as={Link} to="/signup" size="lg">
                  Create an account
                </Button>
                <Button as={Link} to="/login" variant="outlineLight" size="lg" className="group">
                  Log in
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
