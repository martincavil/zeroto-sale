import type { Metadata } from "next"
import Link from "next/link"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"
import { CheckoutButton } from "@/components/billing/CheckoutButton"

export const metadata: Metadata = {
  title: "Pricing — zeroto.sale",
  description: "Start free. Go Pro for $9/mo or own it forever for $89.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <Link href="/" className="font-pixel text-sm text-[#7c3aed]">← zeroto.sale</Link>
          <h1 className="font-pixel text-lg text-[#e8e8f0] leading-loose">CHOOSE YOUR PATH</h1>
          <p className="font-mono text-sm text-[#8b8ba8]">
            One tool. From zero to first sale.
          </p>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="pixel-border bg-[#12121a] p-7 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-pixel text-[13px] text-[#8b8ba8]">FREE</span>
              <span className="font-pixel text-3xl text-[#e8e8f0]">$0</span>
              <span className="font-mono text-sm text-[#8b8ba8]">Start your journey</span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {FREE_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <span className="font-pixel text-[13px] text-[#8b8ba8] mt-0.5">□</span>
                  <span className="font-mono text-sm text-[#c4c4d4]">{f}</span>
                </div>
              ))}
            </div>

            <Link
              href="/signup"
              className="w-full font-pixel text-[16px] px-4 py-3 border-2 border-[#1e1e2e] text-[#8b8ba8] hover:border-[#7c3aed] hover:text-[#e8e8f0] transition-colors text-center"
            >
              START FREE →
            </Link>
          </div>

          {/* Pro */}
          <div className="pixel-border-primary bg-[#12121a] p-7 flex flex-col gap-4 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="font-pixel text-[13px] bg-[#7c3aed] text-white px-3 py-1">
                RECOMMENDED
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-pixel text-[13px] text-[#7c3aed]">PRO</span>
              <div className="flex items-end gap-2">
                <span className="font-pixel text-3xl text-[#e8e8f0]">$9</span>
                <span className="font-mono text-sm text-[#8b8ba8] mb-1">/mo</span>
              </div>
              <span className="font-mono text-sm text-[#8b8ba8]">
                or <span className="text-[#fbbf24]">$89 lifetime</span> — pay once, own forever
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {PRO_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <span className="font-pixel text-[13px] text-[#10b981] mt-0.5">✓</span>
                  <span className="font-mono text-sm text-[#e8e8f0]">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <CheckoutButton
                plan="lifetime"
                className="w-full font-pixel text-[16px] px-4 py-3 bg-[#fbbf24] text-[#0a0a0f] hover:bg-[#f59e0b] transition-colors text-center pixel-border"
                style={{ borderColor: "#fbbf24", boxShadow: "4px 4px 0px rgba(251,191,36,0.3)" }}
              >
                GET LIFETIME — $89 →
              </CheckoutButton>
              <CheckoutButton
                plan="monthly"
                className="w-full font-pixel text-[16px] px-4 py-3 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors text-center pixel-border-primary"
              >
                START PRO — $9/MO →
              </CheckoutButton>
            </div>
          </div>
        </div>

        {/* Character showcase */}
        <div className="flex flex-col items-center gap-4">
          <p className="font-pixel text-[13px] text-[#8b8ba8]">YOUR CHARACTER EVOLVES AS YOU GROW</p>
          <div className="flex items-end gap-4">
            {[0, 2, 5, 8, 12].map((level) => (
              <div key={level} className="flex flex-col items-center gap-2">
                <PixelCharacter level={level} size={level === 0 ? "sm" : level < 8 ? "md" : "lg"} />
                <span className="font-pixel text-[13px] text-[#8b8ba8]">
                  {level === 0 ? "start" : `lvl ${level}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-mono text-sm text-[#8b8ba8] text-center">
          No risk. Cancel anytime. 7-day money back guarantee.
        </p>
      </div>
    </main>
  )
}

const FREE_FEATURES = [
  "Access to Act 1 steps 1–3",
  "1 AI generation per step",
  "Basic progression tracking",
  "Community access (read-only)",
]

const PRO_FEATURES = [
  "Full Act 1 (all 7 steps)",
  "Full Act 2 ($10k MRR path)",
  "Unlimited AI generations",
  "Personalized AI output",
  "Discord community access",
  "Leaderboard & accountability",
  "Priority support",
]
