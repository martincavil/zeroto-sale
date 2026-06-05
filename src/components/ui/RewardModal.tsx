"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"
import { XPBar } from "@/components/ui/XPBar"
import type { Reward } from "@/lib/rewards"

interface RewardModalProps {
  reward: Reward
  xpGained: number
  totalXP: number
  onDone: () => void
}

// Floating particles
function Particle({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2"
      style={{
        background: color,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [0, -40 - Math.random() * 40],
        x: [(Math.random() - 0.5) * 60],
      }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  )
}

const PARTICLES = Array.from({ length: 16 }, (_, i) => i)

export function RewardModal({ reward, xpGained, totalXP, onDone }: RewardModalProps) {
  const [xpDisplay, setXpDisplay] = useState(totalXP - xpGained)
  const XP_PER_LEVEL = 200

  useEffect(() => {
    const t = setTimeout(() => setXpDisplay(totalXP), 600)
    return () => clearTimeout(t)
  }, [totalXP])

  const isSpecial = reward.level === 7 || reward.level === 14

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/85"
          onClick={onDone}
        />

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map((i) => (
            <Particle key={i} color={reward.color} delay={0.3 + i * 0.05} />
          ))}
        </div>

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-sm flex flex-col items-center gap-6 text-center"
          initial={{ scale: 0.8, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          {/* Glow ring */}
          <div
            className="relative flex items-center justify-center"
            style={{ filter: `drop-shadow(0 0 24px ${reward.glow})` }}
          >
            <motion.div
              animate={{ rotate: isSpecial ? 360 : 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 rounded-full border-2 opacity-30"
              style={{ borderColor: reward.color }}
            />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl"
            >
              {reward.badge}
            </motion.div>
          </div>

          {/* Content card */}
          <div
            className="w-full pixel-border bg-[#12121a] p-6 flex flex-col gap-5"
            style={{ borderColor: reward.color, boxShadow: `6px 6px 0px ${reward.glow}` }}
          >
            {/* Level label */}
            <div className="flex items-center justify-center gap-3">
              <span
                className="font-pixel text-[11px] px-3 py-1 border"
                style={{ color: reward.color, borderColor: reward.color, background: `${reward.color}15` }}
              >
                LEVEL {reward.level} COMPLETE
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <h2 className="font-pixel text-base text-[#e8e8f0] leading-loose">
                {reward.title}
              </h2>
              <p className="font-mono text-sm text-[#c4c4d4] leading-relaxed">
                {reward.description}
              </p>
            </div>

            {/* Character */}
            <div className="flex justify-center">
              <PixelCharacter level={reward.level} size="lg" animated />
            </div>

            {/* XP gained */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[11px] text-[#8b8ba8]">XP GAINED</span>
                <motion.span
                  className="font-pixel text-[13px] text-[#fbbf24]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.4 }}
                >
                  +{xpGained} XP
                </motion.span>
              </div>
              <XPBar
                current={xpDisplay % XP_PER_LEVEL}
                max={XP_PER_LEVEL}
                label={`LVL ${Math.floor(xpDisplay / XP_PER_LEVEL) + 1}`}
                animate
              />
            </div>

            {/* Unlocks */}
            <div className="flex flex-col gap-2 border-t border-[#1e1e2e] pt-4">
              <span className="font-pixel text-[11px] text-[#8b8ba8]">UNLOCKED</span>
              {reward.unlocks.map((u, i) => (
                <motion.div
                  key={u}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <span style={{ color: reward.color }} className="font-pixel text-[11px]">▶</span>
                  <span className="font-mono text-sm text-[#c4c4d4]">{u}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            onClick={onDone}
            className="w-full font-pixel text-[14px] px-6 py-4 text-[#0a0a0f] transition-colors"
            style={{ background: reward.color, border: `2px solid ${reward.color}`, boxShadow: `4px 4px 0px ${reward.glow}` }}
            whileHover={{ y: -2, boxShadow: `6px 6px 0px ${reward.glow}` }}
            whileTap={{ y: 1, boxShadow: `2px 2px 0px ${reward.glow}` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {reward.level === 7 ? "ENTER ACT II →" : reward.level === 14 ? "JOIN 10K CLUB →" : "CONTINUE →"}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
