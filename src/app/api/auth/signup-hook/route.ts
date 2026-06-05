import { NextRequest, NextResponse } from "next/server"
import { sendWelcomeEmail } from "@/lib/emails/welcome"

// Called by Supabase Auth webhook on user creation
// Configure in Supabase: Auth > Hooks > "Send email" or custom hook
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret")
  if (secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const email = body?.record?.email ?? body?.user?.email

  if (!email) {
    return NextResponse.json({ error: "No email" }, { status: 400 })
  }

  await sendWelcomeEmail(email)
  return NextResponse.json({ sent: true })
}
