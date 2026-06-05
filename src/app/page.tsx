"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { WaitlistForm } from "@/components/landing/WaitlistForm"
import { PixelWorld } from "@/components/landing/PixelWorld"
import { FadeIn } from "@/components/landing/FadeIn"

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-[#1e1e2e] px-6 py-4 flex items-center justify-between relative z-10"
      >
        <span className="font-pixel text-base text-[#e8e8f0]">
          zeroto<span className="text-[#7c3aed]">.sale</span>
        </span>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="font-mono text-sm text-[#8b8ba8] hover:text-[#e8e8f0] transition-colors hidden sm:block">
            Pricing
          </Link>
          <Link href="/login" className="font-mono text-sm text-[#8b8ba8] hover:text-[#e8e8f0] transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="font-pixel text-[13px] px-4 py-2 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary">
            Start free →
          </Link>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[520px] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <PixelWorld />

        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1e1e2e]" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent" />

        <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="font-pixel text-[11px] text-[#7c3aed] border border-[#7c3aed33] px-4 py-2 bg-[#7c3aed11]"
          >
            ✦ BUILD IN PUBLIC · LEVEL UP IN REAL LIFE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-pixel text-3xl md:text-4xl text-[#e8e8f0] leading-tight"
          >
            Stop building.<br />
            <span className="text-[#7c3aed]">Start selling.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-lg text-[#c4c4d4] max-w-xl leading-relaxed"
          >
            Most SaaS builders spend months coding a product nobody buys.
            zeroto.sale gives you the exact roadmap to go from idea to
            first paying customer — step by step, powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-3 w-full max-w-sm"
          >
            <WaitlistForm />
            <p className="font-mono text-sm text-[#8b8ba8]">
              Free to start · No credit card required
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <FadeIn className="text-center">
            <h2 className="font-pixel text-xl text-[#e8e8f0] leading-loose">Sound familiar?</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {PROBLEMS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "#7c3aed" }}
                  transition={{ duration: 0.2 }}
                  className="pixel-border bg-[#12121a] p-6 flex flex-col gap-3 h-full cursor-default"
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <h3 className="font-pixel text-[13px] text-[#e8e8f0] leading-loose">{p.title}</h3>
                  <p className="font-mono text-sm text-[#8b8ba8] leading-relaxed">{p.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-16 bg-[#0d0d14]">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <FadeIn className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-pixel text-xl text-[#e8e8f0] leading-loose">How it works</h2>
            <p className="font-mono text-base text-[#8b8ba8]">14 levels. 2 acts. 1 goal.</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4">
            <FadeIn delay={0.1}>
              <div className="pixel-border-primary bg-[#12121a] p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-pixel text-[11px] text-[#7c3aed] border border-[#7c3aed] px-2 py-1">ACT I</span>
                  <span className="font-mono text-base text-[#c4c4d4]">Idea → First Sale</span>
                </div>
                <div className="flex flex-col gap-2">
                  {ACT1_STEPS.map((s, i) => (
                    <motion.div
                      key={s.n}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <span className="font-pixel text-[11px] text-[#7c3aed] w-8 shrink-0">L{s.n}</span>
                      <span className="font-mono text-sm text-[#c4c4d4]">{s.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="pixel-border bg-[#12121a] p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-pixel text-[11px] text-[#8b8ba8] border border-[#1e1e2e] px-2 py-1">ACT II</span>
                  <span className="font-mono text-base text-[#c4c4d4]">First Sale → $10k MRR</span>
                </div>
                <div className="flex flex-col gap-2">
                  {ACT2_STEPS.map((s, i) => (
                    <motion.div
                      key={s.n}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <span className="font-pixel text-[11px] text-[#8b8ba8] w-8 shrink-0">L{s.n}</span>
                      <span className="font-mono text-sm text-[#8b8ba8]">{s.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="pixel-border bg-[#12121a] p-6 flex flex-col gap-3">
              <span className="font-pixel text-[13px] text-[#06b6d4]">✨ AI-POWERED AT EVERY STEP</span>
              <p className="font-mono text-base text-[#c4c4d4] leading-relaxed">
                Each level generates tailored content for{" "}
                <span className="text-[#e8e8f0]">your exact product</span> — ICP analysis,
                community posts, DM templates, landing copy, technical plans, email sequences.
                Not generic advice. Your product, your context.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 items-center text-center">
          <FadeIn>
            <h2 className="font-pixel text-xl text-[#e8e8f0] leading-loose">Built by a builder</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="pixel-border bg-[#12121a] p-7 max-w-xl flex flex-col gap-4"
            >
              <p className="font-mono text-base text-[#c4c4d4] leading-relaxed italic">
                "I built zeroto.sale because I kept failing at the same step — getting my first sale.
                Every resource told me to build more features. The real answer was to talk to
                customers first. This tool forces you to do it in the right order."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#7c3aed] flex items-center justify-center font-pixel text-[11px] text-white shrink-0">
                  M
                </div>
                <div className="text-left">
                  <p className="font-pixel text-[11px] text-[#e8e8f0]">Martin</p>
                  <p className="font-mono text-sm text-[#8b8ba8]">Founder, zeroto.sale</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-16 bg-[#0d0d14]">
        <div className="max-w-xl mx-auto flex flex-col gap-8 items-center text-center">
          <FadeIn>
            <h2 className="font-pixel text-xl text-[#e8e8f0] leading-loose">Simple pricing</h2>
          </FadeIn>
          <div className="w-full grid grid-cols-2 gap-4">
            {[
              { label: "FREE", price: "$0", sub: "First 3 levels", cls: "pixel-border" },
              { label: "PRO", price: "$9", sub: "or $89 lifetime", cls: "pixel-border-primary", accent: true },
            ].map((plan, i) => (
              <FadeIn key={plan.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`${plan.cls} bg-[#12121a] p-6 flex flex-col gap-3`}
                >
                  <span className={`font-pixel text-[13px] ${plan.accent ? "text-[#7c3aed]" : "text-[#8b8ba8]"}`}>
                    {plan.label}
                  </span>
                  <div className="flex items-end gap-1">
                    <span className="font-pixel text-3xl text-[#e8e8f0]">{plan.price}</span>
                    {plan.accent && <span className="font-mono text-sm text-[#8b8ba8] mb-1">/mo</span>}
                  </div>
                  <span className={`font-mono text-sm ${plan.accent ? "text-[#fbbf24]" : "text-[#8b8ba8]"}`}>
                    {plan.sub}
                  </span>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <Link href="/pricing" className="font-mono text-base text-[#7c3aed] hover:underline">
            See full pricing →
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-20">
        <div className="max-w-xl mx-auto flex flex-col gap-8 items-center text-center">
          <FadeIn>
            <h2 className="font-pixel text-xl text-[#e8e8f0] leading-loose">
              Your first sale<br />
              <span className="text-[#7c3aed]">is one decision away.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="w-full max-w-sm">
            <WaitlistForm />
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e] px-6 py-8 flex items-center justify-between">
        <span className="font-pixel text-[13px] text-[#8b8ba8]">
          zeroto<span className="text-[#7c3aed]">.sale</span>
        </span>
        <div className="flex gap-6">
          <Link href="/pricing" className="font-mono text-sm text-[#8b8ba8] hover:text-[#e8e8f0]">Pricing</Link>
          <Link href="/login" className="font-mono text-sm text-[#8b8ba8] hover:text-[#e8e8f0]">Login</Link>
        </div>
      </footer>

    </main>
  )
}

const PROBLEMS = [
  { emoji: "🏗️", title: "You build for months",  desc: "You spend 3 months on features nobody asked for, then wonder why nobody buys." },
  { emoji: "😶", title: "You skip validation",   desc: "You assume people want your product without talking to a single potential customer." },
  { emoji: "🔁", title: "You start over",         desc: "No sale after 6 months → kill the project → repeat with a new idea." },
]

const ACT1_STEPS = [
  { n: 1, label: "Crystallize your idea" },
  { n: 2, label: "Validate before coding" },
  { n: 3, label: "Landing page live" },
  { n: 4, label: "100 real visitors" },
  { n: 5, label: "Build your MVP" },
  { n: 6, label: "Convert your waitlist" },
  { n: 7, label: "🎉 First sale" },
]

const ACT2_STEPS = [
  { n: 8,  label: "10 paying customers" },
  { n: 9,  label: "$100 MRR" },
  { n: 10, label: "$500 MRR" },
  { n: 11, label: "$1,000 MRR" },
  { n: 12, label: "$2,500 MRR" },
  { n: 13, label: "$5,000 MRR" },
  { n: 14, label: "$10,000 MRR 👑" },
]
