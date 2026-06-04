"use client"

import { PixelCharacter } from "@/components/pixel/PixelCharacter"
import { XPBar } from "@/components/ui/XPBar"
import { StepCard } from "@/components/dashboard/StepCard"
import { STEPS } from "@/lib/steps"
import type { Database } from "@/types/database"

type Project = Database["public"]["Tables"]["projects"]["Row"]
type Profile = Database["public"]["Tables"]["profiles"]["Row"] | null

interface DashboardViewProps {
  project: Project
  profile: Profile
}

const XP_PER_LEVEL = 100

export function DashboardView({ project, profile }: DashboardViewProps) {
  const level = profile?.current_level ?? 1
  const xp = profile?.xp ?? 0

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b border-[#1e1e2e] bg-[#12121a] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <span className="font-pixel text-xs text-[#7c3aed]">zeroto.sale</span>

          <div className="flex items-center gap-4 flex-1 max-w-xs">
            <PixelCharacter level={level} size="sm" />
            <div className="flex-1">
              <XPBar current={xp} max={XP_PER_LEVEL} label={`LVL ${level}`} />
            </div>
          </div>

          <span className="font-mono text-xs text-[#6b6b8a]">
            {profile?.plan ?? "free"}
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {/* Project context */}
        <div className="pixel-border bg-[#12121a] p-4 flex flex-col gap-2">
          <span className="font-pixel text-[8px] text-[#6b6b8a]">YOUR SAAS</span>
          <p className="font-mono text-sm text-[#e8e8f0]">{project.problem}</p>
          <p className="font-mono text-xs text-[#6b6b8a]">→ {project.target}</p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4">
          <span className="font-pixel text-[8px] text-[#6b6b8a]">ACT 1 — IDEA TO FIRST SALE</span>
          {STEPS.filter((s) => s.act === 1).map((step) => (
            <StepCard
              key={step.id}
              step={step}
              isActive={project.current_step === step.id}
              isCompleted={project.completed_steps.includes(step.id)}
              isLocked={step.id > project.current_step}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
