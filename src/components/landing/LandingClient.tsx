"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { WaitlistForm } from "@/components/landing/WaitlistForm"
import { PixelWorld } from "@/components/landing/PixelWorld"
import { FadeIn } from "@/components/landing/FadeIn"
import { FlipCard } from "@/components/landing/FlipCard"

interface LandingClientProps {
  isLoggedIn: boolean
}

export function LandingClient({ isLoggedIn }: LandingClientProps) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[560px] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
        <PixelWorld />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1e1e2e]" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0f] to-transparent" />

        <div className="relative z-10 flex flex-col items-center gap-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="font-pixel text-sm text-[#7c3aed] border border-[#7c3aed33] px-5 py-3 bg-[#7c3aed11]"
          >
            ✦ BUILD IN PUBLIC · LEVEL UP IN REAL LIFE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-pixel text-4xl md:text-5xl text-[#e8e8f0] leading-tight"
          >
            Stop building.<br />
            <span className="text-[#7c3aed]">Start selling.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-xl text-[#c4c4d4] max-w-xl leading-relaxed"
          >
            Most SaaS builders spend months coding a product nobody buys.
            zeroto.sale gives you the exact roadmap to go from idea to
            first paying customer — step by step, powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-4 w-full max-w-md"
          >
            <WaitlistForm />
            <p className="font-mono text-base text-[#8b8ba8]">Free to start · No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* ── Flip cards ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-10 bg-[#0d0d14]">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <FadeIn className="text-center">
            <p className="font-pixel text-sm text-[#8b8ba8]">HOVER EACH LEVEL</p>
          </FadeIn>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {FLIP_STEPS.map((step, i) => (
              <FadeIn key={step.id} delay={i * 0.05}>
                <FlipCard id={step.id} title={step.title} motivation={step.motivation} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          <FadeIn className="text-center">
            <h2 className="font-pixel text-2xl text-[#e8e8f0] leading-loose">Sound familiar?</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {PROBLEMS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "#7c3aed" }}
                  transition={{ duration: 0.2 }}
                  className="pixel-border bg-[#12121a] p-8 flex flex-col gap-4 h-full cursor-default"
                >
                  <span className="text-4xl">{p.emoji}</span>
                  <h3 className="font-pixel text-base text-[#e8e8f0] leading-loose">{p.title}</h3>
                  <p className="font-mono text-base text-[#8b8ba8] leading-relaxed">{p.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-20 bg-[#0d0d14]">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          <FadeIn className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-pixel text-2xl text-[#e8e8f0] leading-loose">How it works</h2>
            <p className="font-mono text-lg text-[#8b8ba8]">14 levels. 2 acts. 1 goal.</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            <FadeIn delay={0.1}>
              <div className="pixel-border-primary bg-[#12121a] p-8 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <span className="font-pixel text-sm text-[#7c3aed] border border-[#7c3aed] px-3 py-2">ACT I</span>
                  <span className="font-mono text-lg text-[#c4c4d4]">Idea → First Sale</span>
                </div>
                <div className="flex flex-col gap-3">
                  {ACT1_STEPS.map((s, i) => (
                    <motion.div key={s.n} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07 }} className="flex items-center gap-4">
                      <span className="font-pixel text-sm text-[#7c3aed] w-10 shrink-0">L{s.n}</span>
                      <span className="font-mono text-base text-[#c4c4d4]">{s.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="pixel-border bg-[#12121a] p-8 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <span className="font-pixel text-sm text-[#8b8ba8] border border-[#1e1e2e] px-3 py-2">ACT II</span>
                  <span className="font-mono text-lg text-[#c4c4d4]">First Sale → $10k MRR</span>
                </div>
                <div className="flex flex-col gap-3">
                  {ACT2_STEPS.map((s, i) => (
                    <motion.div key={s.n} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07 }} className="flex items-center gap-4">
                      <span className="font-pixel text-sm text-[#8b8ba8] w-10 shrink-0">L{s.n}</span>
                      <span className="font-mono text-base text-[#8b8ba8]">{s.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="pixel-border bg-[#12121a] p-8 flex flex-col gap-4">
              <span className="font-pixel text-base text-[#06b6d4]">✨ AI-POWERED AT EVERY STEP</span>
              <p className="font-mono text-lg text-[#c4c4d4] leading-relaxed">
                Each level generates tailored content for <span className="text-[#e8e8f0]">your exact product</span> — ICP analysis, community posts, DM templates, landing copy, technical plans, email sequences. Not generic advice. Your product, your context.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 items-center text-center">
          <FadeIn><h2 className="font-pixel text-2xl text-[#e8e8f0] leading-loose">Built by a builder</h2></FadeIn>
          <FadeIn delay={0.1}>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} className="pixel-border bg-[#12121a] p-9 flex flex-col gap-6">
              <p className="font-mono text-lg text-[#c4c4d4] leading-relaxed italic">
                "I built zeroto.sale because I kept failing at the same step — getting my first sale. Every resource told me to build more features. The real answer was to talk to customers first. This tool forces you to do it in the right order."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#7c3aed] flex items-center justify-center font-pixel text-sm text-white shrink-0">M</div>
                <div className="text-left">
                  <p className="font-pixel text-sm text-[#e8e8f0]">Martin</p>
                  <p className="font-mono text-base text-[#8b8ba8]">Founder, zeroto.sale</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-20 bg-[#0d0d14]">
        <div className="max-w-2xl mx-auto flex flex-col gap-10 items-center text-center">
          <FadeIn><h2 className="font-pixel text-2xl text-[#e8e8f0] leading-loose">Simple pricing</h2></FadeIn>
          <div className="w-full grid grid-cols-2 gap-5">
            {[
              { label: "FREE", price: "$0", sub: "First 3 levels", cls: "pixel-border",         accent: false },
              { label: "PRO",  price: "$9", sub: "or $89 lifetime", cls: "pixel-border-primary", accent: true  },
            ].map((plan, i) => (
              <FadeIn key={plan.label} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className={`${plan.cls} bg-[#12121a] p-8 flex flex-col gap-4`}>
                  <span className={`font-pixel text-sm ${plan.accent ? "text-[#7c3aed]" : "text-[#8b8ba8]"}`}>{plan.label}</span>
                  <div className="flex items-end gap-2">
                    <span className="font-pixel text-4xl text-[#e8e8f0]">{plan.price}</span>
                    {plan.accent && <span className="font-mono text-base text-[#8b8ba8] mb-1">/mo</span>}
                  </div>
                  <span className={`font-mono text-base ${plan.accent ? "text-[#fbbf24]" : "text-[#8b8ba8]"}`}>{plan.sub}</span>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <Link href="/pricing" className="font-mono text-lg text-[#7c3aed] hover:underline">See full pricing →</Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-[#1e1e2e] px-6 py-24">
        <div className="max-w-xl mx-auto flex flex-col gap-10 items-center text-center">
          <FadeIn>
            <h2 className="font-pixel text-2xl text-[#e8e8f0] leading-loose">
              Your first sale<br /><span className="text-[#7c3aed]">is one decision away.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="w-full max-w-md"><WaitlistForm /></FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e] px-8 py-10 flex items-center justify-between">
        <span className="font-pixel text-base text-[#8b8ba8]">zeroto<span className="text-[#7c3aed]">.sale</span></span>
        <div className="flex gap-8">
          <Link href="/pricing" className="font-mono text-base text-[#8b8ba8] hover:text-[#e8e8f0]">Pricing</Link>
          {isLoggedIn ? (
            <Link href="/dashboard" className="font-mono text-base text-[#8b8ba8] hover:text-[#e8e8f0]">Dashboard</Link>
          ) : (
            <Link href="/login" className="font-mono text-base text-[#8b8ba8] hover:text-[#e8e8f0]">Login</Link>
          )}
        </div>
      </footer>
    </>
  )
}

const FLIP_STEPS = [
  { id: 1, title: "Crystallize your idea",  motivation: "Clarity beats cleverness." },
  { id: 2, title: "Validate before coding", motivation: "Talk to 10 people first." },
  { id: 3, title: "Landing page live",       motivation: "A URL is worth 1000 ideas." },
  { id: 4, title: "100 real visitors",       motivation: "Real traffic = real signal." },
  { id: 5, title: "Build your MVP",          motivation: "Ship the smallest valuable thing." },
  { id: 6, title: "Convert waitlist",        motivation: "Your list = money waiting." },
  { id: 7, title: "🎉 First sale",           motivation: "One payment changes everything." },
  { id: 8, title: "$10k MRR 👑",            motivation: "Most quit at $0. You won't." },
]

const PROBLEMS = [
  { emoji: "🏗️", title: "You build for months",  desc: "3 months on features nobody asked for, then wonder why nobody buys." },
  { emoji: "😶", title: "You skip validation",   desc: "You assume people want your product without talking to a single customer." },
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
