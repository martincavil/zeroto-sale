import Link from "next/link"
import { LandingHero } from "@/components/landing/LandingHero"
import { FlipCard } from "@/components/landing/FlipCard"

export default function LandingPage() {
  return (
    <main className="h-screen overflow-hidden flex flex-col items-center justify-center px-4 relative">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-6 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-pixel text-[13px] text-[#8b8ba8] tracking-widest uppercase">
            level 0
          </span>
          <h1 className="font-pixel text-2xl md:text-3xl text-[#e8e8f0] leading-tight">
            zeroto<span className="text-[#7c3aed]">.sale</span>
          </h1>
          <p className="font-mono text-sm text-[#c4c4d4] max-w-sm">
            From idea to first sale — step by step, powered by AI.
          </p>
        </div>

        {/* Animated hero */}
        <LandingHero />

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <Link
            href="/signup"
            className="w-full font-pixel text-[16px] px-6 py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors text-center pixel-border-primary"
          >
            START YOUR JOURNEY →
          </Link>
          <Link
            href="/login"
            className="font-mono text-sm text-[#8b8ba8] hover:text-[#c4c4d4] transition-colors"
          >
            Already building? Log in
          </Link>
        </div>

        {/* Flip cards */}
        <div className="w-full grid grid-cols-4 gap-2">
          {PREVIEW_STEPS.map((step) => (
            <FlipCard key={step.id} id={step.id} title={step.title} motivation={step.motivation} />
          ))}
        </div>

        <p className="font-pixel text-[13px] text-[#8b8ba8]">
          $9/mo · $89 lifetime
        </p>
      </div>
    </main>
  )
}


const PREVIEW_STEPS = [
  { id: 1, title: "Crystallize your idea",    motivation: "Clarity beats cleverness. Start here." },
  { id: 2, title: "Validate before coding",   motivation: "Talk to 10 people before writing 1 line." },
  { id: 3, title: "Landing page live",         motivation: "A URL is worth 1000 ideas." },
  { id: 4, title: "100 real visitors",         motivation: "Real traffic = real signal." },
  { id: 5, title: "Build your MVP",            motivation: "Ship the smallest thing that proves value." },
  { id: 6, title: "Convert waitlist",          motivation: "Your list is money waiting to be unlocked." },
  { id: 7, title: "🎉 First sale",             motivation: "One payment changes everything." },
  { id: 8, title: "$10k MRR 👑",              motivation: "Most quit at $0. You won't." },
]
