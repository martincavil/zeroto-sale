import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"
import { XPBar } from "@/components/ui/XPBar"
import { LogoutButton } from "@/components/auth/LogoutButton"
import { ManageSubscriptionButton } from "@/components/billing/ManageSubscriptionButton"

const XP_PER_LEVEL = 200

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (supabase as any)
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const level = profile?.current_level ?? 1
  const xp = profile?.xp ?? 0

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-lg mx-auto flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="font-pixel text-[8px] text-[#6b6b8a] hover:text-[#a0a0b8]">
            ← DASHBOARD
          </Link>
        </div>

        <h1 className="font-pixel text-sm text-[#e8e8f0]">ACCOUNT</h1>

        {/* Character + XP */}
        <div className="pixel-border bg-[#12121a] p-6 flex items-center gap-6">
          <PixelCharacter level={level} size="lg" animated />
          <div className="flex-1 flex flex-col gap-3">
            <div>
              <p className="font-pixel text-[8px] text-[#6b6b8a]">LEVEL {level}</p>
              <p className="font-mono text-sm text-[#e8e8f0] mt-1">{user.email}</p>
            </div>
            <XPBar current={xp % XP_PER_LEVEL} max={XP_PER_LEVEL} label="XP" />
            <p className="font-pixel text-[8px] text-[#fbbf24]">{xp} total XP</p>
          </div>
        </div>

        {/* Plan */}
        <div className="pixel-border bg-[#12121a] p-6 flex flex-col gap-4">
          <span className="font-pixel text-[8px] text-[#6b6b8a]">PLAN</span>
          <div className="flex items-center justify-between">
            <span className="font-pixel text-sm text-[#e8e8f0] uppercase">
              {profile?.plan ?? "free"}
            </span>
            {profile?.plan === "free" && (
              <Link
                href="/pricing"
                className="font-pixel text-[8px] px-3 py-2 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors"
              >
                UPGRADE →
              </Link>
            )}
          </div>
          {profile?.plan === "pro" && (
            <ManageSubscriptionButton />
          )}
        </div>

        {/* Danger zone */}
        <div className="pixel-border border-[#ef4444] bg-[#12121a] p-6 flex flex-col gap-4">
          <span className="font-pixel text-[8px] text-[#ef4444]">SESSION</span>
          <LogoutButton />
        </div>
      </div>
    </main>
  )
}
