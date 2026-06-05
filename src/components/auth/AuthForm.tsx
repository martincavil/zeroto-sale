"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"

interface AuthFormProps {
  mode: "login" | "signup"
  redirectPlan?: string
}

const SOCIAL_PROOF = [
  "No credit card required to start",
  "Takes 2 minutes to set up",
  "Your first sale is closer than you think",
]

const TRUST_BADGES = [
  { icon: "🔒", label: "Secure auth" },
  { icon: "⚡", label: "Instant access" },
  { icon: "🎮", label: "Gamified progress" },
]

export function AuthForm({ mode, redirectPlan }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else if (redirectPlan) {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: redirectPlan }),
        })
        const { url } = await res.json()
        if (url) { window.location.href = url; return }
        router.push("/onboarding")
      } else {
        router.push("/onboarding")
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push("/dashboard")
      }
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row">

      {/* Left panel — only on signup */}
      {mode === "signup" && (
        <div className="hidden md:flex flex-col justify-center gap-10 w-96 shrink-0 bg-[#12121a] border-r border-[#1e1e2e] px-10 py-16 relative overflow-hidden">
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />

          <div className="relative flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-pixel text-[13px] text-[#8b8ba8]">zeroto.sale</span>
              <h2 className="font-pixel text-base text-[#e8e8f0] leading-loose">
                Your first sale<br />
                <span className="text-[#7c3aed]">starts here.</span>
              </h2>
              <p className="font-mono text-sm text-[#8b8ba8]">
                A gamified roadmap from idea to first paying customer — powered by AI.
              </p>
            </div>

            {/* Steps preview */}
            <div className="flex flex-col gap-2">
              {[
                { n: 1, t: "Crystallize your idea" },
                { n: 2, t: "Validate before coding" },
                { n: 3, t: "Landing page live" },
                { n: 7, t: "🎉 First sale" },
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-3">
                  <span className="font-pixel text-[13px] text-[#7c3aed] w-8">L{s.n}</span>
                  <span className="font-mono text-sm text-[#c4c4d4]">{s.t}</span>
                </div>
              ))}
              <span className="font-mono text-sm text-[#8b8ba8] ml-11">+ 10 more levels...</span>
            </div>

            {/* Character */}
            <div className="flex items-center gap-4">
              <PixelCharacter level={7} animated size="lg" />
              <div className="flex flex-col gap-1">
                <span className="font-pixel text-[13px] text-[#fbbf24]">🎉 FIRST SALE</span>
                <span className="font-mono text-sm text-[#8b8ba8]">That could be you.</span>
              </div>
            </div>

            {/* Social proof */}
            <div className="flex flex-col gap-2 border-t border-[#1e1e2e] pt-6">
              {SOCIAL_PROOF.map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="text-[#10b981] text-sm">✓</span>
                  <span className="font-mono text-sm text-[#8b8ba8]">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm flex flex-col gap-8">

          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <PixelCharacter level={0} animated size="md" />
            <h1 className="font-pixel text-base text-[#e8e8f0]">
              {mode === "login" ? "WELCOME BACK" : "CREATE YOUR ACCOUNT"}
            </h1>
            <p className="font-mono text-sm text-[#8b8ba8]">
              {mode === "login"
                ? "Continue your journey to first sale"
                : "Free to start. No credit card needed."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-pixel text-[13px] text-[#8b8ba8]">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#12121a] border-2 border-[#1e1e2e] px-4 py-4 font-mono text-sm text-[#e8e8f0] focus:outline-none focus:border-[#7c3aed] transition-colors placeholder:text-[#3a3a5c]"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-pixel text-[13px] text-[#8b8ba8]">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#12121a] border-2 border-[#1e1e2e] px-4 py-4 font-mono text-sm text-[#e8e8f0] focus:outline-none focus:border-[#7c3aed] transition-colors placeholder:text-[#3a3a5c]"
                placeholder="min. 6 characters"
              />
            </div>

            {error && (
              <div className="border-2 border-[#ef4444] bg-[#ef444411] px-4 py-3">
                <p className="font-mono text-sm text-[#ef4444]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-pixel text-[16px] px-6 py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors pixel-border-primary mt-2"
            >
              {loading ? "..." : mode === "login" ? "LOG IN →" : "CREATE ACCOUNT →"}
            </button>
          </form>

          {/* Trust badges */}
          {mode === "signup" && (
            <div className="flex justify-center gap-6">
              {TRUST_BADGES.map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1">
                  <span className="text-lg">{b.icon}</span>
                  <span className="font-pixel text-[12px] text-[#8b8ba8]">{b.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Switch mode */}
          <p className="font-mono text-sm text-[#8b8ba8] text-center">
            {mode === "login" ? (
              <>No account?{" "}
                <Link href="/signup" className="text-[#7c3aed] hover:underline">Sign up free</Link>
              </>
            ) : (
              <>Already have one?{" "}
                <Link href="/login" className="text-[#7c3aed] hover:underline">Log in</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  )
}
