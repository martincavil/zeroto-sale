import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { LandingNav } from "@/components/landing/LandingNav"
import { LandingClient } from "@/components/landing/LandingClient"

export const metadata: Metadata = {
  title: "zeroto.sale — From idea to first sale",
  description: "The gamified roadmap that takes SaaS builders from zero to their first paying customer.",
}

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen flex flex-col">
      <LandingNav isLoggedIn={!!user} />
      <LandingClient />
    </main>
  )
}
