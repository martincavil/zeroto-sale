import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getGemini, getGroq, GEMINI_MODEL, GROQ_MODEL, getProviderForStep } from "@/lib/ai/client"
import { buildPrompt } from "@/lib/ai/prompts"

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response("Unauthorized", { status: 401 })

  const { step, projectId } = await req.json()
  if (!step || !projectId) return new Response("Missing params", { status: 400 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data: project } = await db
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single()

  if (!project) return new Response("Project not found", { status: 404 })

  const prompt = buildPrompt(step, {
    problem: project.problem,
    target: project.target,
    name: project.name,
  })

  const provider = getProviderForStep(step)
  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      const send = (data: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))

      try {
        let fullText = ""

        if (provider === "gemini") {
          const model = getGemini().getGenerativeModel({
            model: GEMINI_MODEL,
            systemInstruction:
              "You are a direct, no-BS SaaS launch advisor. Give specific, actionable advice tailored to the exact product described. Never use filler phrases. Every sentence should be useful. Format in clean markdown.",
          })

          const result = await model.generateContentStream(prompt)

          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              fullText += text
              send({ text })
            }
          }
        } else {
          // Groq
          const stream = await getGroq().chat.completions.create({
            model: GROQ_MODEL,
            messages: [
              {
                role: "system",
                content:
                  "You are a direct, no-BS SaaS launch advisor. Give specific, actionable advice tailored to the exact product described. Never use filler phrases. Every sentence should be useful. Format in clean markdown.",
              },
              { role: "user", content: prompt },
            ],
            stream: true,
            max_tokens: 4096,
          })

          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? ""
            if (text) {
              fullText += text
              send({ text })
            }
          }
        }

        // Persist output
        await db.from("step_outputs").upsert({
          project_id: projectId,
          step,
          output: { content: fullText, provider },
        })

        send({ done: true })
      } catch (err) {
        send({ error: err instanceof Error ? err.message : "Unknown error" })
      } finally {
        controller.close()
      }
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
