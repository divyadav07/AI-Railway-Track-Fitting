import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import WorkflowStep from "../components/WorkflowStep.jsx";
import ScanIllustration from "../components/ScanIllustration.jsx";
import { workflow, features, roles, stats, problems } from "../data/content.js";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      {/* ============ HERO (dark) ============ */}
      <div className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute inset-0 bg-grid-fade bg-[size:44px_44px] opacity-[0.06]" />
        <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-signal-500/10 blur-[120px]" />

        <Navbar />

        <div className="container-page relative grid gap-16 pb-24 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.78rem] text-white/60">
              QR-linked assets · Computer-vision inspection
            </div>

            <h1 className="mt-6 max-w-[16ch] font-display text-[2.6rem] font-normal leading-[1.08] text-white sm:text-[3.4rem]">
              See every fitting.{" "}
              <span className="italic text-signal-400">Catch every fault.</span>
            </h1>

            <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-white/60">
              RailSentry pairs a QR code on every railway track fitting with an
              AI vision model that spots rust, cracks, and missing bolts — then scores,
              predicts, and reports on the health of your entire line.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/register" className="btn-primary">
                Register a fitting
                <ArrowRight size={17} />
              </Link>
              <Link to="/login" className="btn-ghost-dark">
                Log in to dashboard
              </Link>
            </div>

            <div className="mt-14 hidden sm:block">
              <SignalChainInline />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <ScanIllustration />
          </motion.div>
        </div>
      </div>

      {/* ============ PROBLEM ============ */}
      <section className="container-page py-20 sm:py-28">
        <div className="max-w-[52ch]">
          <p className="text-[0.8rem] font-medium text-signal-600">The problem today</p>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink-950 sm:text-[2.3rem]">
            Manual track inspection wasn't built to scale.
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-sand-200 bg-sand-200 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div key={p.title} className="bg-sand-50 p-6">
              <AlertTriangle size={18} className="text-amber-500" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-[1.05rem] text-ink-950">{p.title}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-900/60">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS (dark) ============ */}
      <section id="how-it-works" className="bg-ink-950 py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-[0.8rem] font-medium text-signal-400">How it works</p>
            <h2 className="mt-3 max-w-[16ch] font-display text-[2rem] leading-tight text-white sm:text-[2.3rem]">
              From a scan to a maintenance plan, in seven steps.
            </h2>
            <p className="mt-5 max-w-[38ch] text-[0.95rem] leading-relaxed text-white/55">
              Every inspection follows the same path — a QR scan and a photo in,
              a health score and an action item out.
            </p>
          </div>

          <div>
            {workflow.map((w, i) => (
              <WorkflowStep key={w.step} {...w} index={i} isLast={i === workflow.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="container-page py-20 sm:py-28">
        <div className="max-w-[52ch]">
          <p className="text-[0.8rem] font-medium text-signal-600">Everything inspectors and admins need</p>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink-950 sm:text-[2.3rem]">
            One system, from field scan to fleet-wide report.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </section>

      {/* ============ ROLES ============ */}
      <section id="roles" className="bg-sand-100 py-20 sm:py-28">
        <div className="container-page">
          <div className="max-w-[52ch]">
            <p className="text-[0.8rem] font-medium text-signal-600">Built for two roles</p>
            <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink-950 sm:text-[2.3rem]">
              One login. The right dashboard for the job.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {roles.map((r) => (
              <div key={r.key} className="rounded-2xl border border-sand-300 bg-white p-8 shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-[1.4rem] text-ink-950">{r.label}</h3>
                  <span className="rounded-full bg-signal-500/10 px-3 py-1 text-[0.75rem] font-medium text-signal-700">
                    Role
                  </span>
                </div>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-900/60">{r.description}</p>
                <ul className="mt-6 space-y-3">
                  {r.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[0.9rem] text-ink-900/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-8 rounded-2xl border border-sand-200 bg-white p-10 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-[2.1rem] text-ink-950">{s.value}</div>
              <div className="mt-1.5 max-w-[22ch] text-[0.85rem] leading-snug text-ink-900/55">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA (dark) ============ */}
      <section className="bg-ink-950 py-20 sm:py-24">
        <div className="container-page flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="max-w-[24ch] font-display text-[2rem] leading-tight text-white sm:text-[2.3rem]">
            Ready to bring AI inspection to your track fittings?
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="btn-primary">
              Create an account
              <ArrowRight size={17} />
            </Link>
            <Link to="/login" className="btn-ghost-dark">
              Log in
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SignalChainInline() {
  return (
    <div className="flex items-center gap-4 text-white/40">
      <div className="flex items-center gap-2 text-[0.8rem]">
        <span className="h-1.5 w-1.5 rounded-full bg-signal-400" /> QR-verified access
      </div>
      <span className="h-1 w-1 rounded-full bg-white/20" />
      <div className="text-[0.8rem]">Role-based dashboards</div>
      <span className="h-1 w-1 rounded-full bg-white/20" />
      <div className="text-[0.8rem]">Encrypted end to end</div>
    </div>
  );
}
