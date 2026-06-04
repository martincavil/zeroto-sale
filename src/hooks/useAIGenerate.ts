"use client"

import { useState, useCallback } from "react"

interface UseAIGenerateOptions {
  step: number
  projectId: string
}

export function useAIGenerate({ step, projectId }: UseAIGenerateOptions) {
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async () => {
    setLoading(true)
    setOutput("")
    setDone(false)
    setError(null)

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step, projectId }),
      })

      if (!res.ok) {
        throw new Error(`${res.status}: ${await res.text()}`)
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error("No stream")

      const decoder = new TextDecoder()

      while (true) {
        const { done: streamDone, value } = await reader.read()
        if (streamDone) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n\n").filter(Boolean)

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = JSON.parse(line.slice(6))

          if (data.text) setOutput((prev) => prev + data.text)
          if (data.done) setDone(true)
          if (data.error) setError(data.error)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [step, projectId])

  return { output, loading, done, error, generate }
}
