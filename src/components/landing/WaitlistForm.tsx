"use client"

import { useState } from "react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    setStatus(res.ok ? "success" : "error")
  }

  if (status === "success") {
    return (
      <div className="w-full pixel-border border-[#10b981] bg-[#0d1f17] p-5 flex flex-col items-center gap-2">
        <span className="font-pixel text-[13px] text-[#10b981]">✓ YOU&apos;RE ON THE LIST</span>
        <p className="font-mono text-sm text-[#8b8ba8]">We&apos;ll notify you when we launch.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="flex-1 bg-[#12121a] border-2 border-[#1e1e2e] px-4 py-4 font-mono text-base text-[#e8e8f0] focus:outline-none focus:border-[#7c3aed] transition-colors placeholder:text-[#3a3a5c]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="font-pixel text-[13px] px-5 py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] disabled:opacity-50 transition-colors pixel-border-primary whitespace-nowrap"
        >
          {status === "loading" ? "..." : "JOIN →"}
        </button>
      </div>
      {status === "error" && (
        <p className="font-mono text-sm text-[#ef4444]">Something went wrong. Try again.</p>
      )}
    </form>
  )
}
