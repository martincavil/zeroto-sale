"use client"

import { useEffect, useState } from "react"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"

interface FirstSaleCelebrationProps {
  onDone: () => void
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 1000,
  color: ["#7c3aed", "#06b6d4", "#fbbf24", "#10b981", "#f87171"][i % 5],
  size: Math.random() * 8 + 4,
}))

export function FirstSaleCelebration({ onDone }: FirstSaleCelebrationProps) {
  const [phase, setPhase] = useState<"intro" | "celebrate" | "done">("intro")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("celebrate"), 500)
    const t2 = setTimeout(() => setPhase("done"), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (phase === "done") {
      setTimeout(onDone, 500)
    }
  }, [phase, onDone])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Particles */}
      {phase === "celebrate" && PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}ms`,
            animationDuration: "2s",
          }}
        />
      ))}

      {/* Content */}
      <div
        className={`flex flex-col items-center gap-8 text-center px-4 transition-all duration-500 ${
          phase === "intro" ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      >
        <PixelCharacter level={7} size="lg" animated />

        <div className="flex flex-col gap-4">
          <p className="font-pixel text-[16px] text-[#fbbf24] glow-xp">
            🎉 FIRST SALE
          </p>
          <h1 className="font-pixel text-3xl text-[#e8e8f0] leading-tight">
            YOU DID IT
          </h1>
          <p className="font-mono text-sm text-[#c4c4d4] max-w-sm">
            You went from zero to your first paying customer.
            That&apos;s more than 95% of people ever do.
          </p>
        </div>

        <div className="pixel-border-primary bg-[#12121a] p-5 flex flex-col gap-2">
          <p className="font-pixel text-[13px] text-[#7c3aed]">ACT 2 UNLOCKED</p>
          <p className="font-mono text-sm text-[#c4c4d4]">
            First sale → $10,000 MRR
          </p>
        </div>

        <button
          onClick={onDone}
          className="font-pixel text-[16px] px-6 py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary"
        >
          ENTER ACT 2 →
        </button>
      </div>
    </div>
  )
}
