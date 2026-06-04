import Link from "next/link"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-8">
      <div className="flex flex-col items-center gap-6">
        <PixelCharacter level={7} animated size="lg" />

        <div className="flex flex-col gap-3">
          <h1 className="font-pixel text-lg text-[#10b981] leading-loose glow-success">
            YOU&apos;RE IN
          </h1>
          <p className="font-mono text-sm text-[#a0a0b8] max-w-sm">
            Welcome to Pro. Your journey to first sale just got a lot more serious.
          </p>
        </div>

        <div className="pixel-border bg-[#12121a] p-6 flex flex-col gap-3 max-w-sm w-full">
          {[
            "✓ Unlimited AI generations unlocked",
            "✓ All 14 levels accessible",
            "✓ Discord community access",
            "✓ Leaderboard activated",
          ].map((item) => (
            <p key={item} className="font-mono text-xs text-[#e8e8f0] text-left">
              {item}
            </p>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="font-pixel text-[10px] px-6 py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary"
        >
          START BUILDING →
        </Link>
      </div>
    </main>
  )
}
