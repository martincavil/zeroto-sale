"use client"

import { useEffect, useState } from "react"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"
import { XPBar } from "@/components/ui/XPBar"

const SEQUENCE = [
  { level: 0, xp: 0,   label: "LVL 0",  delay: 0 },
  { level: 1, xp: 30,  label: "LVL 1",  delay: 600 },
  { level: 2, xp: 55,  label: "LVL 2",  delay: 1200 },
  { level: 3, xp: 75,  label: "LVL 3",  delay: 1800 },
  { level: 5, xp: 90,  label: "LVL 5",  delay: 2400 },
  { level: 7, xp: 100, label: "🎉 FIRST SALE", delay: 3200 },
]

export function LandingHero() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const [xpAnimated, setXpAnimated] = useState(0)

  useEffect(() => {
    // Fade in
    const t0 = setTimeout(() => setVisible(true), 100)

    // Progress through sequence
    const timers = SEQUENCE.map((s, i) =>
      setTimeout(() => {
        setStep(i)
        setXpAnimated(0)
        setTimeout(() => setXpAnimated(s.xp), 50)
      }, s.delay)
    )

    // Loop
    const loop = setTimeout(() => {
      setStep(0)
      setXpAnimated(0)
    }, 5000)

    return () => {
      clearTimeout(t0)
      clearTimeout(loop)
      timers.forEach(clearTimeout)
    }
  }, [])

  // Re-trigger loop
  useEffect(() => {
    if (step === 0 && visible) {
      const timers = SEQUENCE.map((s, i) =>
        setTimeout(() => {
          setStep(i)
          setXpAnimated(0)
          setTimeout(() => setXpAnimated(s.xp), 50)
        }, s.delay)
      )
      const loop = setTimeout(() => setStep(0), 5000)
      return () => {
        clearTimeout(loop)
        timers.forEach(clearTimeout)
      }
    }
  }, [step, visible])

  const current = SEQUENCE[step]
  const isSale = step === SEQUENCE.length - 1

  return (
    <div
      className="flex flex-col items-center gap-3 w-52 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="relative">
        <PixelCharacter
          level={current.level}
          animated
          size="lg"
          className={isSale ? "drop-shadow-[0_0_16px_rgba(251,191,36,0.8)]" : ""}
        />
        {isSale && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 font-pixel text-[10px] text-[#fbbf24] whitespace-nowrap animate-bounce">
            +$47
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-1">
        <span
          className={`font-pixel text-[11px] text-center transition-colors duration-300 ${
            isSale ? "text-[#fbbf24]" : "text-[#7c3aed]"
          }`}
        >
          {current.label}
        </span>
        <XPBar current={xpAnimated} max={100} label="XP" animate />
      </div>
    </div>
  )
}
