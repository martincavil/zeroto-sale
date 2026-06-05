"use client"

import { useEffect, useState } from "react"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"

interface LevelUpToastProps {
  level: number
  onDone: () => void
}

export function LevelUpToast({ level, onDone }: LevelUpToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 300)
    }, 3000)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <div className="animate-level-up">
          <PixelCharacter level={level} size="lg" animated />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-pixel text-[14px] text-[#fbbf24] glow-xp animate-blink">
            LEVEL UP!
          </p>
          <p className="font-pixel text-2xl text-[#e8e8f0]">
            LEVEL <span className="text-[#7c3aed]">{level}</span>
          </p>
        </div>

        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-[#fbbf24]"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        <button
          onClick={() => { setVisible(false); setTimeout(onDone, 300) }}
          className="font-pixel text-[11px] text-[#6b6b8a] hover:text-[#a0a0b8] mt-2"
        >
          CONTINUE →
        </button>
      </div>
    </div>
  )
}
