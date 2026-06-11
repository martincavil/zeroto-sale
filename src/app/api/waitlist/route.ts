import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getResend } from "@/lib/resend"

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 })

  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { error } = await db
    .from("waitlist")
    .insert({ email })

  // Ignore duplicate email errors
  if (error && !error.message.includes("duplicate")) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send confirmation email
  await getResend().emails.send({
    from: "Martin from zeroto.sale <martin@zeroto.sale>",
    to: email,
    subject: "You're on the zeroto.sale waitlist 🎮",
    html: `
<div style="background:#0a0a0f;color:#e8e8f0;font-family:monospace;max-width:520px;margin:0 auto;padding:40px 24px">
  <p style="font-size:20px;margin:0 0 8px">zeroto<span style="color:#7c3aed">.sale</span></p>
  <p style="font-size:12px;color:#8b8ba8;margin:0 0 32px">FROM IDEA TO FIRST SALE</p>
  <h2 style="font-size:14px;color:#e8e8f0;margin:0 0 16px">You're on the list. 🎉</h2>
  <p style="font-size:13px;color:#c4c4d4;line-height:1.7;margin:0 0 16px">
    We'll let you know the moment zeroto.sale launches. You'll be among the first to get access — and the first to get your first sale.
  </p>
  <p style="font-size:13px;color:#c4c4d4;line-height:1.7;margin:0 0 32px">
    In the meantime, follow the build on <a href="https://x.com" style="color:#7c3aed">Twitter/X</a>.
  </p>
  <p style="font-size:13px;color:#c4c4d4">— Martin</p>
</div>
    `.trim(),
  }).catch(() => {}) // Don't fail if email fails

  return NextResponse.json({ ok: true })
}
