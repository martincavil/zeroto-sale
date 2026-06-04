"use client"

import { cn } from "@/lib/utils"

interface XPBarProps {
  current: number
  max: number
  label?: string
  className?: string
  animate?: boolean
}

export function XPBar({ current, max, label = "XP", className, animate = true }: XPBarProps) {
  const pct = Math.min((current / max) * 100, 100)

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <div className="flex justify-between items-center">
        <span className="font-pixel text-[8px] text-[#fbbf24] glow-xp">{label}</span>
        <span className="font-pixel text-[8px] text-[#6b6b8a]">
          {current}/{max}
        </span>
      </div>
      <div className="h-3 bg-[#12121a] border-2 border-[#1e1e2e] relative overflow-hidden">
        <div
          className={cn(
            "h-full bg-[#fbbf24] transition-all duration-1000",
            animate && "ease-out"
          )}
          style={{ width: `${pct}%` }}
        />
        {/* Scanline effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
          }}
        />
      </div>
    </div>
  )
}
