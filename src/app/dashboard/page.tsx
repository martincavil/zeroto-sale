import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardView } from "@/components/dashboard/DashboardView"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const [{ data: project }, { data: profile }] = await Promise.all([
    db.from("projects").select("*").eq("user_id", user.id).single(),
    db.from("profiles").select("*").eq("id", user.id).single(),
  ])

  if (!project) redirect("/onboarding")

  const { data: taskCompletions } = await db
    .from("task_completions")
    .select("task_id")
    .eq("project_id", project.id)

  const initialTaskCompletions = (taskCompletions ?? []).map(
    (t: { task_id: string }) => t.task_id
  )

  return (
    <DashboardView
      project={project}
      profile={profile}
      initialTaskCompletions={initialTaskCompletions}
    />
  )
}
