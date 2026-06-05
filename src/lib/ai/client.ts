import { GoogleGenerativeAI } from "@google/generative-ai"
import Groq from "groq-sdk"

// Gemini — best for creative/writing steps (1,2,3,4,6,7)
let _gemini: GoogleGenerativeAI | null = null
export function getGemini() {
  if (!_gemini) _gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  return _gemini
}

// Groq — best for technical/fast steps (5)
let _groq: Groq | null = null
export function getGroq() {
  if (!_groq) _groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })
  return _groq
}

export const GEMINI_MODEL = "gemini-2.0-flash"
export const GROQ_MODEL = "llama-3.3-70b-versatile"

// Step 5 is technical — use Groq (fast + good at code/schemas)
// All other steps are creative — use Gemini (best quality for writing)
export function getProviderForStep(step: number): "gemini" | "groq" {
  return step === 5 ? "groq" : "gemini"
}
