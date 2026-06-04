"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { AIOutput } from "@/components/ai/AIOutput"
import { useAIGenerate } from "@/hooks/useAIGenerate"
import type { Step } from "@/types"

interface StepCardProps {
  step: Step
  isActive: boolean
  isCompleted: boolean
  isLocked: boolean
  projectId: string
  completedTasks: string[]
  onTaskToggle: (taskId: string) => void
  onStepComplete: () => void
}

export function StepCard({
  step,
  isActive,
  isCompleted,
  isLocked,
  projectId,
  completedTasks,
  onTaskToggle,
  onStepComplete,
}: StepCardProps) {
  const [expanded, setExpanded] = useState(isActive)
  const { output, loading, done, error, generate } = useAIGenerate({
    step: step.id,
    projectId,
  })

  const allTasksDone = step.tasks.every((t) => completedTasks.includes(t.id))

  return (
    <div
      className={cn(
        "pixel-border flex flex-col transition-all",
        isCompleted && "bg-[#0d1f17] border-[#10b981]",
        isActive && "bg-[#12121a] border-[#7c3aed]",
        isActive && !loading && "shadow-glow",
        isLocked && "bg-[#0a0a0f] opacity-50"
      )}
    >
      {/* Header — always visible */}
      <button
        onClick={() => !isLocked && setExpanded(!expanded)}
        className="p-4 flex items-center justify-between w-full text-left"
        disabled={isLocked}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-pixel text-[10px] w-8",
              isCompleted && "text-[#10b981]",
              isActive && "text-[#7c3aed]",
              isLocked && "text-[#6b6b8a]"
            )}
          >
            {isCompleted ? "✓" : isLocked ? "🔒" : `L${step.id}`}
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
        <div className="flex items-center gap-3">
          <span className="font-pixel text-[8px] text-[#fbbf24]">+{step.xpReward} XP</span>
          {!isLocked && (
            <span className="font-mono text-xs text-[#6b6b8a]">{expanded ? "▲" : "▼"}</span>
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && !isLocked && (
        <div className="px-4 pb-4 flex flex-col gap-5 border-t border-[#1e1e2e]">
          <p className="font-mono text-xs text-[#a0a0b8] pt-4">{step.description}</p>

          {/* Tasks */}
          <div className="flex flex-col gap-2">
            <span className="font-pixel text-[8px] text-[#6b6b8a]">CHECKLIST</span>
            {step.tasks.map((task) => {
              const done = completedTasks.includes(task.id)
              return (
                <button
                  key={task.id}
                  onClick={() => !isCompleted && onTaskToggle(task.id)}
                  className="flex items-start gap-3 text-left group"
                >
                  <span
                    className={cn(
                      "font-pixel text-[10px] mt-0.5 transition-colors",
                      done ? "text-[#10b981]" : "text-[#6b6b8a] group-hover:text-[#7c3aed]"
                    )}
                  >
                    {done ? "✓" : "□"}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-xs transition-colors",
                      done ? "text-[#6b6b8a] line-through" : "text-[#a0a0b8] group-hover:text-[#e8e8f0]"
                    )}
                  >
                    {task.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* AI Output section */}
          <div className="flex flex-col gap-3 border-t border-[#1e1e2e] pt-4">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[8px] text-[#06b6d4]">✨ AI OUTPUT</span>
              <span className="font-mono text-[10px] text-[#6b6b8a]">{step.aiOutput}</span>
            </div>
            <AIOutput
              output={output}
              loading={loading}
              done={done}
              error={error}
              onGenerate={generate}
              label={step.aiOutput}
            />
          </div>

          {/* Complete step button */}
          {!isCompleted && allTasksDone && (
            <button
              onClick={onStepComplete}
              className="w-full font-pixel text-[10px] px-4 py-4 bg-[#10b981] text-[#0a0a0f] hover:bg-[#059669] transition-colors pixel-border"
              style={{ borderColor: "#10b981" }}
            >
              COMPLETE STEP → +{step.xpReward} XP
            </button>
          )}
        </div>
      )}
    </div>
  )
}
