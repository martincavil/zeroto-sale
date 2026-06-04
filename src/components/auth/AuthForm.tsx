"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"

interface AuthFormProps {
  mode: "login" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
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
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <PixelCharacter level={0} animated size="md" />
          <h1 className="font-pixel text-sm text-[#e8e8f0]">
            {mode === "login" ? "WELCOME BACK" : "START HERE"}
          </h1>
          <p className="font-mono text-xs text-[#6b6b8a]">
            {mode === "login"
              ? "Continue your journey"
              : "Your first sale awaits"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-pixel text-[8px] text-[#6b6b8a]">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#12121a] border-2 border-[#1e1e2e] px-3 py-3 font-mono text-sm text-[#e8e8f0] focus:outline-none focus:border-[#7c3aed] transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-pixel text-[8px] text-[#6b6b8a]">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-[#12121a] border-2 border-[#1e1e2e] px-3 py-3 font-mono text-sm text-[#e8e8f0] focus:outline-none focus:border-[#7c3aed] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-[#ef4444]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-pixel text-[10px] px-6 py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors pixel-border-primary"
          >
            {loading ? "..." : mode === "login" ? "LOG IN →" : "CREATE ACCOUNT →"}
          </button>
        </form>

        <p className="font-mono text-xs text-[#6b6b8a]">
          {mode === "login" ? (
            <>
              No account?{" "}
              <Link href="/signup" className="text-[#7c3aed] hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have one?{" "}
              <Link href="/login" className="text-[#7c3aed] hover:underline">
                Log in
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  )
}
