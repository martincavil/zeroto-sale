export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string | null
          avatar_url: string | null
          current_level: number
          xp: number
          plan: "free" | "pro" | "lifetime"
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username?: string | null
          avatar_url?: string | null
          current_level?: number
          xp?: number
          plan?: "free" | "pro" | "lifetime"
          stripe_customer_id?: string | null
        }
        Update: {
          email?: string
          username?: string | null
          avatar_url?: string | null
          current_level?: number
          xp?: number
          plan?: "free" | "pro" | "lifetime"
          stripe_customer_id?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          problem: string
          target: string
          name: string | null
          url: string | null
          current_step: number
          completed_steps: number[]
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          problem: string
          target: string
          name?: string | null
          url?: string | null
          current_step?: number
          completed_steps?: number[]
        }
        Update: {
          problem?: string
          target?: string
          name?: string | null
          url?: string | null
          current_step?: number
          completed_steps?: number[]
        }
      }
      step_outputs: {
        Row: {
          id: string
          project_id: string
          step: number
          output: Json
          created_at: string
        }
        Insert: {
          project_id: string
          step: number
          output: Json
        }
        Update: never
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      plan_type: "free" | "pro" | "lifetime"
    }
  }
}
