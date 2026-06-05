"use client"

import { useState } from "react"

interface FlipCardProps {
  id: number
  title: string
  motivation: string
}

export function FlipCard({ id, title, motivation }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="h-20 relative cursor-pointer"
      style={{ perspective: "600px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="absolute inset-0 transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 pixel-border bg-[#12121a] p-3 flex flex-col gap-1 text-left"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="font-pixel text-[10px] text-[#6b6b8a]">LVL {id}</span>
          <span className="font-mono text-xs text-[#a0a0b8] leading-tight">{title}</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 pixel-border-primary bg-[#12121a] p-3 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="font-mono text-xs text-[#e8e8f0] leading-tight text-center">
            {motivation}
          </span>
        </div>
      </div>
    </div>
  )
}
