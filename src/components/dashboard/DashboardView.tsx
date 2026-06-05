"use client"

import { useState, useOptimistic, useTransition } from "react"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"
import { XPBar } from "@/components/ui/XPBar"
import { StepCard } from "@/components/dashboard/StepCard"
import { LevelUpToast } from "@/components/ui/LevelUpToast"
import { FirstSaleCelebration } from "@/components/ui/FirstSaleCelebration"
import { ACT1_STEPS, ACT2_STEPS } from "@/lib/steps"
import { completeStep, toggleTask } from "@/app/dashboard/actions"
import type { Database } from "@/types/database"

type Project = Database["public"]["Tables"]["projects"]["Row"]
type Profile = Database["public"]["Tables"]["profiles"]["Row"] | null

interface DashboardViewProps {
  project: Project
  profile: Profile
  initialTaskCompletions: string[]
  savedOutputs: Record<number, string>
}

const XP_PER_LEVEL = 200

export function DashboardView({ project, profile, initialTaskCompletions, savedOutputs }: DashboardViewProps) {
  const [, startTransition] = useTransition()
  const [completedTasks, setCompletedTasks] = useState<string[]>(initialTaskCompletions)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [newLevel, setNewLevel] = useState(1)
  const [showFirstSale, setShowFirstSale] = useState(false)

  const [optimisticProject, updateProject] = useOptimistic(
    project,
    (state, update: Partial<Project>) => ({ ...state, ...update })
  )

  const [optimisticXP, updateXP] = useOptimistic(
    profile?.xp ?? 0,
    (state, xp: number) => state + xp
  )

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
    const newXP = xp + xpReward
    const nextLevel = Math.floor(newXP / XP_PER_LEVEL) + 1

    if (nextLevel > level) {
      setNewLevel(nextLevel)
      setShowLevelUp(true)
    }

    if (stepId === 7) {
      setShowFirstSale(true)
    }

    startTransition(() => {
      updateProject({ completed_steps: newCompleted, current_step: stepId + 1 })
      updateXP(xpReward)
      completeStep(project.id, stepId, xpReward)
    })
  }

  const act2Unlocked = optimisticProject.completed_steps.includes(7)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Overlays */}
      {showLevelUp && !showFirstSale && (
        <LevelUpToast level={newLevel} onDone={() => setShowLevelUp(false)} />
      )}
      {showFirstSale && (
        <FirstSaleCelebration onDone={() => setShowFirstSale(false)} />
      )}

      {/* Top bar */}
      <header className="border-b border-[#1e1e2e] bg-[#12121a] px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <span className="font-pixel text-sm text-[#7c3aed]">zeroto.sale</span>
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <PixelCharacter level={level} size="sm" />
            <div className="flex-1">
              <XPBar current={xp % XP_PER_LEVEL} max={XP_PER_LEVEL} label={`LVL ${level}`} />
            </div>
          </div>
          <a href="/account" className="font-mono text-sm text-[#8b8ba8] hover:text-[#c4c4d4] hidden sm:block">
            {profile?.plan ?? "free"}
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {/* Project context */}
        <div className="pixel-border bg-[#12121a] p-5 flex flex-col gap-2">
          <span className="font-pixel text-[13px] text-[#8b8ba8]">YOUR SAAS</span>
          <p className="font-mono text-sm text-[#e8e8f0]">{optimisticProject.problem}</p>
          <p className="font-mono text-sm text-[#8b8ba8]">→ {optimisticProject.target}</p>
        </div>

        {/* Progress summary */}
        <div className="flex gap-3">
          <div className="flex-1 pixel-border bg-[#12121a] p-5 text-center">
            <span className="font-pixel text-lg text-[#7c3aed]">
              {optimisticProject.completed_steps.length}
            </span>
            <p className="font-pixel text-[13px] text-[#8b8ba8] mt-1">STEPS</p>
          </div>
          <div className="flex-1 pixel-border bg-[#12121a] p-5 text-center">
            <span className="font-pixel text-lg text-[#fbbf24]">{xp}</span>
            <p className="font-pixel text-[13px] text-[#8b8ba8] mt-1">XP</p>
          </div>
          <div className="flex-1 pixel-border bg-[#12121a] p-5 text-center">
            <span className="font-pixel text-lg text-[#06b6d4]">{level}</span>
            <p className="font-pixel text-[13px] text-[#8b8ba8] mt-1">LEVEL</p>
          </div>
        </div>

        {/* Act 1 */}
        <div className="flex flex-col gap-3">
          <span className="font-pixel text-[13px] text-[#8b8ba8]">
            ACT I — IDEA TO FIRST SALE
          </span>
          {ACT1_STEPS.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              isActive={optimisticProject.current_step === step.id}
              isCompleted={optimisticProject.completed_steps.includes(step.id)}
              isLocked={step.id > optimisticProject.current_step}
              projectId={project.id}
              completedTasks={completedTasks}
              savedOutput={savedOutputs[step.id]}
              onTaskToggle={handleTaskToggle}
              onStepComplete={() => handleStepComplete(step.id, step.xpReward)}
            />
          ))}
        </div>

        {/* Act 2 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[13px] text-[#8b8ba8]">
              ACT II — FIRST SALE TO $10K MRR
            </span>
            {!act2Unlocked && (
              <span className="font-pixel text-[13px] text-[#8b8ba8]">🔒 LOCKED</span>
            )}
          </div>
          {ACT2_STEPS.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              isActive={act2Unlocked && optimisticProject.current_step === step.id}
              isCompleted={optimisticProject.completed_steps.includes(step.id)}
              isLocked={!act2Unlocked || step.id > optimisticProject.current_step}
              projectId={project.id}
              completedTasks={completedTasks}
              savedOutput={savedOutputs[step.id]}
              onTaskToggle={handleTaskToggle}
              onStepComplete={() => handleStepComplete(step.id, step.xpReward)}
            />
          ))}
        </div>

        {/* Upgrade CTA for free users */}
        {profile?.plan === "free" && (
          <div className="pixel-border-primary bg-[#12121a] p-7 flex flex-col gap-4 text-center">
            <span className="font-pixel text-[13px] text-[#7c3aed]">UNLOCK EVERYTHING</span>
            <p className="font-mono text-sm text-[#c4c4d4]">
              Get unlimited AI generations and access to all 14 levels.
            </p>
            <a
              href="/pricing"
              className="font-pixel text-[16px] px-4 py-3 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary"
            >
              GO PRO — $9/MO →
            </a>
          </div>
        )}
      </main>
    </div>
  )
}
