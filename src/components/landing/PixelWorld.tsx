"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// ─── Pixel SVG sprites ────────────────────────────────────────────────────────

function Coin({ color = "#fbbf24" }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="0" width="4" height="1" fill={color} />
      <rect x="1" y="1" width="6" height="1" fill={color} />
      <rect x="0" y="2" width="8" height="4" fill={color} />
      <rect x="1" y="6" width="6" height="1" fill={color} />
      <rect x="2" y="7" width="4" height="1" fill={color} />
      <rect x="3" y="3" width="2" height="2" fill="#0a0a0f" opacity="0.3" />
    </svg>
  )
}

function Star({ color = "#7c3aed" }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      <rect x="3" y="0" width="2" height="2" fill={color} />
      <rect x="0" y="3" width="2" height="2" fill={color} />
      <rect x="6" y="3" width="2" height="2" fill={color} />
      <rect x="1" y="1" width="2" height="2" fill={color} />
      <rect x="5" y="1" width="2" height="2" fill={color} />
      <rect x="2" y="2" width="4" height="4" fill={color} />
      <rect x="1" y="5" width="2" height="2" fill={color} />
      <rect x="5" y="5" width="2" height="2" fill={color} />
    </svg>
  )
}

function XPOrb() {
  return (
    <svg width="10" height="10" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="0" width="4" height="1" fill="#06b6d4" />
      <rect x="1" y="1" width="6" height="1" fill="#06b6d4" />
      <rect x="0" y="2" width="8" height="4" fill="#06b6d4" />
      <rect x="1" y="6" width="6" height="1" fill="#06b6d4" />
      <rect x="2" y="7" width="4" height="1" fill="#06b6d4" />
      <rect x="2" y="3" width="2" height="2" fill="#e8e8f0" opacity="0.6" />
    </svg>
  )
}

function Lightning() {
  return (
    <svg width="8" height="14" viewBox="0 0 5 9" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="0" width="3" height="1" fill="#fbbf24" />
      <rect x="1" y="1" width="3" height="1" fill="#fbbf24" />
      <rect x="0" y="2" width="3" height="1" fill="#fbbf24" />
      <rect x="1" y="3" width="3" height="1" fill="#fbbf24" />
      <rect x="2" y="4" width="3" height="1" fill="#fbbf24" />
      <rect x="1" y="5" width="2" height="1" fill="#fbbf24" />
      <rect x="0" y="6" width="2" height="1" fill="#fbbf24" />
    </svg>
  )
}

function PixelChar({ colors }: { colors: { body: string; accent: string } }) {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="1" width="6" height="6" fill={colors.body} />
      <rect x="6" y="3" width="1" height="1" fill="#0a0a0f" />
      <rect x="9" y="3" width="1" height="1" fill="#0a0a0f" />
      <rect x="7" y="5" width="2" height="1" fill="#0a0a0f" />
      <rect x="4" y="7" width="8" height="5" fill={colors.accent} />
      <rect x="2" y="7" width="2" height="4" fill={colors.body} />
      <rect x="12" y="7" width="2" height="4" fill={colors.body} />
      <rect x="5" y="12" width="2" height="3" fill={colors.body} />
      <rect x="9" y="12" width="2" height="3" fill={colors.body} />
      <rect x="4" y="14" width="3" height="1" fill={colors.accent} />
      <rect x="9" y="14" width="3" height="1" fill={colors.accent} />
    </svg>
  )
}

// ─── Floating particles ───────────────────────────────────────────────────────

const CHARS = [
  { colors: { body: "#6b6b8a", accent: "#a0a0b8" }, label: "LVL 0" },
  { colors: { body: "#7c3aed", accent: "#a78bfa" }, label: "LVL 3" },
  { colors: { body: "#059669", accent: "#34d399" }, label: "LVL 5" },
  { colors: { body: "#0891b2", accent: "#22d3ee" }, label: "LVL 7" },
]

const OBJECTS = [
  { component: <Coin />,      key: "c1", x: "8%",  y: "20%" },
  { component: <Star />,      key: "s1", x: "15%", y: "65%" },
  { component: <XPOrb />,     key: "x1", x: "82%", y: "25%" },
  { component: <Lightning />, key: "l1", x: "88%", y: "70%" },
  { component: <Coin color="#10b981" />, key: "c2", x: "25%", y: "80%" },
  { component: <Star color="#06b6d4" />, key: "s2", x: "72%", y: "15%" },
  { component: <XPOrb />,     key: "x2", x: "60%", y: "78%" },
  { component: <Coin />,      key: "c3", x: "45%", y: "88%" },
  { component: <Lightning />, key: "l2", x: "35%", y: "12%" },
  { component: <Star />,      key: "s3", x: "92%", y: "45%" },
]

export function PixelWorld() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating objects */}
      {OBJECTS.map((obj, i) => (
        <motion.div
          key={obj.key}
          className="absolute"
          style={{ left: obj.x, top: obj.y }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          {obj.component}
        </motion.div>
      ))}

      {/* Pixel characters walking */}
      {CHARS.map((char, i) => (
        <motion.div
          key={i}
          className="absolute bottom-8 flex flex-col items-center gap-1"
          style={{ left: `${15 + i * 20}%` }}
          animate={{
            y: [0, -4, 0],
            x: [0, 4, 0, -4, 0],
          }}
          transition={{
            y: { duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
            x: { duration: 2.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
          }}
        >
          <PixelChar colors={char.colors} />
          <span style={{ fontFamily: "monospace", fontSize: "8px", color: "#8b8ba8" }}>
            {char.label}
          </span>
        </motion.div>
      ))}

      {/* Floating "+XP" popups */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`xp-${i}`}
          className="absolute font-pixel text-[#fbbf24]"
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            left: `${20 + i * 30}%`,
            bottom: "25%",
            color: "#fbbf24",
          }}
          animate={{
            y: [0, -40, -80],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1 + i * 1.5,
          }}
        >
          +{[50, 100, 150][i]}XP
        </motion.div>
      ))}

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.015) 2px, rgba(124,58,237,0.015) 4px)",
        }}
      />
    </div>
  )
}
