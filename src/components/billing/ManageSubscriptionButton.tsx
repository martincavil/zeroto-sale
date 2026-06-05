"use client"

import { useState } from "react"

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)

  async function handleManage() {
    setLoading(true)
    const res = await fetch("/api/stripe/portal", { method: "POST" })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  return (
    <button
      onClick={handleManage}
      disabled={loading}
      className="font-pixel text-[16px] px-4 py-3 border-2 border-[#1e1e2e] text-[#8b8ba8] hover:border-[#7c3aed] hover:text-[#e8e8f0] transition-colors disabled:opacity-50"
    >
      {loading ? "..." : "MANAGE SUBSCRIPTION →"}
    </button>
  )
}
