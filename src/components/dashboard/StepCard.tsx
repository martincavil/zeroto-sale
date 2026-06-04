"use client"

import { cn } from "@/lib/utils"
import type { Step } from "@/types"

interface StepCardProps {
  step: Step
  isActive: boolean
  isCompleted: boolean
  isLocked: boolean
}

export function StepCard({ step, isActive, isCompleted, isLocked }: StepCardProps) {
  return (
    <div
      className={cn(
        "pixel-border p-4 flex flex-col gap-3 transition-all",
        isCompleted && "bg-[#0d1f17] border-[#10b981]",
        isActive && "bg-[#12121a] border-[#7c3aed] shadow-glow",
        isLocked && "bg-[#0a0a0f] opacity-50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-pixel text-[8px]",
              isCompleted && "text-[#10b981]",
              isActive && "text-[#7c3aed]",
              isLocked && "text-[#6b6b8a]"
            )}
          >
            {isCompleted ? "✓" : isLocked ? "🔒" : `LVL ${step.id}`}
          </span>
          <h3
            className={cn(
              "font-pixel text-[10px] leading-loose",
              isLocked ? "text-[#6b6b8a]" : "text-[#e8e8f0]"
            )}
          >
            {step.title}
          </h3>
        </div>
        <span className="font-pixel text-[8px] text-[#fbbf24]">+{step.xpReward} XP</span>
      </div>

      {isActive && (
        <>
          <p className="font-mono text-xs text-[#a0a0b8]">{step.description}</p>

          <div className="flex flex-col gap-2">
            {step.tasks.map((task) => (
              <div key={task.id} className="flex items-start gap-2">
                <span className="font-pixel text-[8px] text-[#6b6b8a] mt-0.5">
                  {task.completed ? "✓" : "□"}
                </span>
                <span
                  className={cn(
                    "font-mono text-xs",
                    task.completed ? "text-[#6b6b8a] line-through" : "text-[#a0a0b8]"
                  )}
                >
                  {task.label}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#1e1e2e] pt-3">
            <span className="font-pixel text-[8px] text-[#06b6d4]">AI OUTPUT</span>
            <p className="font-mono text-xs text-[#6b6b8a] mt-1">{step.aiOutput}</p>
          </div>

          <button className="w-full font-pixel text-[10px] px-4 py-3 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary">
            GENERATE WITH AI →
          </button>
        </>
      )}
    </div>
  )
}
