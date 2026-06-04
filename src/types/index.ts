export type { Database } from "./database"

export interface Affiliate {
  label: string
  url: string
  note?: string
}

export interface Step {
  id: number
  title: string
  description: string
  tasks: Task[]
  aiOutput: string
  xpReward: number
  act: 1 | 2
  affiliates: Affiliate[]
}

export interface Task {
  id: string
  label: string
  completed: boolean
}

export interface Project {
  id: string
  problem: string
  target: string
  name: string | null
  url: string | null
  currentStep: number
  completedSteps: number[]
}

export interface Profile {
  id: string
  email: string
  username: string | null
  currentLevel: number
  xp: number
  plan: "free" | "pro" | "lifetime"
}
