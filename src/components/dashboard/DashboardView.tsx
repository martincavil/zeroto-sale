"use client"

import { useState, useOptimistic, useTransition } from "react"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"
import { XPBar } from "@/components/ui/XPBar"
import { StepCard } from "@/components/dashboard/StepCard"
import { STEPS } from "@/lib/steps"
import { completeStep, toggleTask } from "@/app/dashboard/actions"
import type { Database } from "@/types/database"

type Project = Database["public"]["Tables"]["projects"]["Row"]
type Profile = Database["public"]["Tables"]["profiles"]["Row"] | null

interface DashboardViewProps {
  project: Project
  profile: Profile
}

const XP_PER_LEVEL = 200

export function DashboardView({ project, profile }: DashboardViewProps) {
  const [, startTransition] = useTransition()

  const [optimisticProject, updateProject] = useOptimistic(
    project,
    (state, update: Partial<Project>) => ({ ...state, ...update })
  )

  const [optimisticXP, updateXP] = useOptimistic(
    profile?.xp ?? 0,
    (state, xp: number) => state + xp
  )

  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const level = profile?.current_level ?? 1
  const xp = optimisticXP

  function handleTaskToggle(taskId: string) {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    )
    startTransition(() => toggleTask(project.id, taskId))
  }

  function handleStepComplete(stepId: number, xpReward: number) {
    const newCompleted = [...optimisticProject.completed_steps, stepId]
    startTransition(() => {
      updateProject({ completed_steps: newCompleted, current_step: stepId + 1 })
      updateXP(xpReward)
      completeStep(project.id, stepId, xpReward)
    })
  }

  const act1Steps = STEPS.filter((s) => s.act === 1)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b border-[#1e1e2e] bg-[#12121a] px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <span className="font-pixel text-xs text-[#7c3aed]">zeroto.sale</span>

          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <PixelCharacter level={level} size="sm" />
            <div className="flex-1">
              <XPBar
                current={xp % XP_PER_LEVEL}
                max={XP_PER_LEVEL}
                label={`LVL ${level}`}
              />
            </div>
          </div>

          <span className="font-mono text-xs text-[#6b6b8a] hidden sm:block">
            {profile?.plan ?? "free"}
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {/* Project context */}
        <div className="pixel-border bg-[#12121a] p-4 flex flex-col gap-2">
          <span className="font-pixel text-[8px] text-[#6b6b8a]">YOUR SAAS</span>
          <p className="font-mono text-sm text-[#e8e8f0]">{optimisticProject.problem}</p>
          <p className="font-mono text-xs text-[#6b6b8a]">→ {optimisticProject.target}</p>
        </div>

        {/* Progress summary */}
        <div className="flex gap-3">
          <div className="flex-1 pixel-border bg-[#12121a] p-3 text-center">
            <span className="font-pixel text-lg text-[#7c3aed]">
              {optimisticProject.completed_steps.length}
            </span>
            <p className="font-pixel text-[8px] text-[#6b6b8a] mt-1">STEPS DONE</p>
          </div>
          <div className="flex-1 pixel-border bg-[#12121a] p-3 text-center">
            <span className="font-pixel text-lg text-[#fbbf24]">{xp}</span>
            <p className="font-pixel text-[8px] text-[#6b6b8a] mt-1">TOTAL XP</p>
          </div>
          <div className="flex-1 pixel-border bg-[#12121a] p-3 text-center">
            <span className="font-pixel text-lg text-[#06b6d4]">{level}</span>
            <p className="font-pixel text-[8px] text-[#6b6b8a] mt-1">LEVEL</p>
          </div>
        </div>

        {/* Act 1 steps */}
        <div className="flex flex-col gap-3">
          <span className="font-pixel text-[8px] text-[#6b6b8a]">
            ACT I — IDEA TO FIRST SALE
          </span>
          {act1Steps.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              isActive={optimisticProject.current_step === step.id}
              isCompleted={optimisticProject.completed_steps.includes(step.id)}
              isLocked={step.id > optimisticProject.current_step}
              projectId={project.id}
              completedTasks={completedTasks}
              onTaskToggle={handleTaskToggle}
              onStepComplete={() => handleStepComplete(step.id, step.xpReward)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
