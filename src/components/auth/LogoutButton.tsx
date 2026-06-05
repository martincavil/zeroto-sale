"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <button
      onClick={handleLogout}
      className="font-pixel text-[14px] px-4 py-3 border-2 border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white transition-colors w-full"
    >
      LOG OUT
    </button>
  )
}
