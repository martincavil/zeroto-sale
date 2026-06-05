import Link from "next/link"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"
import { XPBar } from "@/components/ui/XPBar"

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-12 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <span className="font-pixel text-[14px] text-[#6b6b8a] tracking-widest uppercase">
            level 0
          </span>
          <h1 className="font-pixel text-2xl md:text-3xl text-[#e8e8f0] leading-tight">
            zeroto<span className="text-[#7c3aed]">.sale</span>
          </h1>
          <p className="font-mono text-sm text-[#a0a0b8] max-w-sm">
            From idea to first sale — step by step, powered by AI.
          </p>
        </div>

        {/* Character */}
        <div className="flex flex-col items-center gap-4">
          <PixelCharacter level={0} animated />
          <XPBar current={0} max={100} label="XP" />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <Link
            href="/signup"
            className="w-full font-pixel text-[14px] px-6 py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors text-center pixel-border-primary"
          >
            START YOUR JOURNEY →
          </Link>
          <Link
            href="/login"
            className="font-mono text-sm text-[#6b6b8a] hover:text-[#a0a0b8] transition-colors"
          >
            Already building? Log in
          </Link>
        </div>

        {/* Steps preview */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          {PREVIEW_STEPS.map((step) => (
            <div
              key={step.id}
              className="pixel-border bg-[#12121a] p-5 flex flex-col gap-2"
            >
              <span className="font-pixel text-[11px] text-[#6b6b8a]">
                LVL {step.id}
              </span>
              <span className="font-mono text-sm text-[#a0a0b8] leading-tight">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <p className="font-pixel text-[11px] text-[#6b6b8a]">
          $9/mo · $89 lifetime
        </p>
      </div>
    </main>
  )
}

const PREVIEW_STEPS = [
  { id: 1, title: "Crystallize your idea" },
  { id: 2, title: "Validate before coding" },
  { id: 3, title: "Landing page live" },
  { id: 4, title: "100 real visitors" },
  { id: 5, title: "Build your MVP" },
  { id: 6, title: "Convert waitlist" },
  { id: 7, title: "🎉 First sale" },
  { id: 8, title: "$10k MRR 👑" },
]
