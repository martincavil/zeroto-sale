import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { anthropic, AI_MODEL } from "@/lib/ai/client"
import { buildPrompt } from "@/lib/ai/prompts"

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { step, projectId } = await req.json()

  if (!step || !projectId) {
    return new Response("Missing step or projectId", { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: project } = await (supabase as any)
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single()

  if (!project) {
    return new Response("Project not found", { status: 404 })
  }

  const prompt = buildPrompt(step, {
    problem: project.problem,
    target: project.target,
    name: project.name,
  })

  const stream = anthropic.messages.stream({
    model: AI_MODEL,
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
    system: "You are a direct, no-BS SaaS launch advisor. You give specific, actionable advice tailored to the exact product described. Never use filler phrases. Every sentence should be useful.",
  })

  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      stream.on("text", (text) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
      })

      stream.on("finalMessage", async (message) => {
        const fullText = message.content[0].type === "text" ? message.content[0].text : ""

        // Save output to DB
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).from("step_outputs").upsert({
          project_id: projectId,
          step,
          output: { content: fullText },
        })

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))
        controller.close()
      })

      stream.on("error", (err) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`))
        controller.close()
      })
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  })
}
