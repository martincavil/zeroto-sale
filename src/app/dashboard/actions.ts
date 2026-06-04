"use server"

import { createClient } from "@/lib/supabase/server"

export async function completeStep(projectId: string, stepId: number, xpReward: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data: project } = await db
    .from("projects")
    .select("completed_steps")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single()

  if (!project) return

  const newCompleted = [...(project.completed_steps ?? []), stepId]

  await db
    .from("projects")
    .update({ completed_steps: newCompleted, current_step: stepId + 1 })
    .eq("id", projectId)

  const { data: profile } = await db
    .from("profiles")
    .select("xp, current_level")
    .eq("id", user.id)
    .single()

  if (profile) {
    const XP_PER_LEVEL = 200
    const newXP = (profile.xp ?? 0) + xpReward
    const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1
    await db
      .from("profiles")
      .update({ xp: newXP, current_level: newLevel })
      .eq("id", user.id)
  }
}

export async function toggleTask(projectId: string, taskId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data: existing } = await db
    .from("task_completions")
    .select("id")
    .eq("project_id", projectId)
    .eq("task_id", taskId)
    .single()

  if (existing) {
    await db.from("task_completions").delete().eq("id", existing.id)
  } else {
    await db.from("task_completions").insert({ project_id: projectId, task_id: taskId })
  }
}
