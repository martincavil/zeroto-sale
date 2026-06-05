"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CheckoutButtonProps {
  plan: "monthly" | "lifetime"
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export function CheckoutButton({ plan, className, style, children }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    })

    if (res.status === 401) {
      // Not logged in — redirect to signup with plan param
      window.location.href = `/signup?plan=${plan}`
      return
    }

    const { url, error } = await res.json()
    if (error) { setLoading(false); return }
    if (url) window.location.href = url
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn("disabled:opacity-50 disabled:cursor-not-allowed", className)}
      style={style}
    >
      {loading ? "REDIRECTING..." : children}
    </button>
  )
}
