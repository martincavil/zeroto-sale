"use client"

import { cn } from "@/lib/utils"

interface PixelCharacterProps {
  level: number
  animated?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const LEVEL_COLORS = {
  0: { body: "#6b6b8a", accent: "#a0a0b8" },
  1: { body: "#7c3aed", accent: "#a78bfa" },
  2: { body: "#2563eb", accent: "#60a5fa" },
  3: { body: "#059669", accent: "#34d399" },
  4: { body: "#d97706", accent: "#fbbf24" },
  5: { body: "#dc2626", accent: "#f87171" },
  6: { body: "#7c3aed", accent: "#e879f9" },
  7: { body: "#0891b2", accent: "#22d3ee" },
} as const

function getColors(level: number) {
  const tier = Math.min(Math.floor(level / 2), 7) as keyof typeof LEVEL_COLORS
  return LEVEL_COLORS[tier]
}

const SIZE_MAP = {
  sm: 32,
  md: 48,
  lg: 64,
}

export function PixelCharacter({ level, animated = false, size = "md", className }: PixelCharacterProps) {
  const colors = getColors(level)
  const px = SIZE_MAP[size]

  return (
    <div
      className={cn(animated && "animate-float", className)}
      style={{ width: px, height: px }}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Head */}
        <rect x="5" y="1" width="6" height="6" fill={colors.body} />
        {/* Eyes */}
        <rect x="6" y="3" width="1" height="1" fill="#0a0a0f" />
        <rect x="9" y="3" width="1" height="1" fill="#0a0a0f" />
        {/* Mouth */}
        <rect x="7" y="5" width="2" height="1" fill="#0a0a0f" />
        {/* Body */}
        <rect x="4" y="7" width="8" height="5" fill={colors.accent} />
        {/* Arms */}
        <rect x="2" y="7" width="2" height="4" fill={colors.body} />
        <rect x="12" y="7" width="2" height="4" fill={colors.body} />
        {/* Legs */}
        <rect x="5" y="12" width="2" height="3" fill={colors.body} />
        <rect x="9" y="12" width="2" height="3" fill={colors.body} />
        {/* Feet */}
        <rect x="4" y="14" width="3" height="1" fill={colors.accent} />
        <rect x="9" y="14" width="3" height="1" fill={colors.accent} />
        {/* Level badge on body */}
        {level >= 7 && (
          <>
            <rect x="7" y="8" width="2" height="2" fill="#fbbf24" />
          </>
        )}
      </svg>
    </div>
  )
}
