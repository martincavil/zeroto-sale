"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"
import { XPBar } from "@/components/ui/XPBar"

const STEPS = [
  {
    id: 1,
    field: "problem",
    label: "WHAT PROBLEM DOES YOUR SAAS SOLVE?",
    placeholder: "e.g. Freelancers lose hours chasing late invoices",
    hint: "One sentence. Be specific.",
    required: true,
  },
  {
    id: 2,
    field: "target",
    label: "WHO HAS THIS PROBLEM?",
    placeholder: "e.g. Freelance designers with 5-20 clients",
    hint: "Describe your target as precisely as possible.",
    required: true,
  },
  {
    id: 3,
    field: "name",
    label: "DO YOU HAVE A NAME OR URL YET?",
    placeholder: "e.g. invoicebot.io (optional)",
    hint: "Skip if you don't have one yet.",
    required: false,
  },
]

export function OnboardingForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({ problem: "", target: "", name: "" })
  const [loading, setLoading] = useState(false)

  const current = STEPS[step]
  const xp = (step / STEPS.length) * 100

  async function handleNext() {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("projects").insert({
      user_id: user.id,
      problem: values.problem,
      target: values.target,
      name: values.name || null,
      url: null,
      current_step: 1,
      completed_steps: [],
    })

    router.push("/dashboard")
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <PixelCharacter level={0} animated size="md" />
          <div className="w-full max-w-xs">
            <XPBar current={xp} max={100} label={`STEP ${step + 1}/${STEPS.length}`} />
          </div>
        </div>

        {/* Question */}
        <div className="pixel-border bg-[#12121a] p-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-pixel text-[11px] text-[#6b6b8a]">
              QUESTION {current.id}
            </span>
            <h2 className="font-pixel text-[14px] text-[#e8e8f0] leading-loose">
              {current.label}
            </h2>
            <p className="font-mono text-sm text-[#6b6b8a]">{current.hint}</p>
          </div>

          <textarea
            value={values[current.field as keyof typeof values]}
            onChange={(e) =>
              setValues({ ...values, [current.field]: e.target.value })
            }
            placeholder={current.placeholder}
            rows={3}
            className="w-full bg-[#0a0a0f] border-2 border-[#1e1e2e] px-4 py-4 font-mono text-sm text-[#e8e8f0] focus:outline-none focus:border-[#7c3aed] transition-colors resize-none"
          />

          <button
            onClick={handleNext}
            disabled={
              (current.required && !values[current.field as keyof typeof values].trim()) ||
              loading
            }
            className="w-full font-pixel text-[14px] px-6 py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors pixel-border-primary"
          >
            {loading
              ? "SAVING..."
              : step === STEPS.length - 1
              ? "START JOURNEY →"
              : "NEXT →"}
          </button>

          {!current.required && (
            <button
              onClick={handleNext}
              className="font-mono text-sm text-[#6b6b8a] hover:text-[#a0a0b8] transition-colors text-center"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
