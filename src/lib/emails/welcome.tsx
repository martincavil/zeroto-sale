import { resend } from "@/lib/resend"

export async function sendWelcomeEmail(email: string) {
  await resend.emails.send({
    from: "Martin from zeroto.sale <martin@zeroto.sale>",
    to: email,
    subject: "Welcome to zeroto.sale — let's get you your first sale",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { background: #0a0a0f; color: #e8e8f0; font-family: monospace; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
    .header { border: 2px solid #7c3aed; padding: 24px; margin-bottom: 32px; text-align: center; }
    .logo { font-size: 20px; color: #e8e8f0; margin: 0 0 8px; }
    .logo span { color: #7c3aed; }
    .tagline { font-size: 12px; color: #6b6b8a; margin: 0; }
    h2 { font-size: 14px; color: #e8e8f0; margin: 0 0 16px; }
    p { font-size: 13px; color: #a0a0b8; line-height: 1.7; margin: 0 0 16px; }
    .steps { border: 1px solid #1e1e2e; padding: 20px; margin: 24px 0; }
    .step { font-size: 12px; color: #a0a0b8; padding: 6px 0; border-bottom: 1px solid #1e1e2e; }
    .step:last-child { border-bottom: none; }
    .step span { color: #7c3aed; }
    .cta { display: block; background: #7c3aed; color: #ffffff; text-decoration: none; text-align: center; padding: 16px; font-size: 13px; margin: 24px 0; border: 2px solid #7c3aed; }
    .footer { font-size: 11px; color: #6b6b8a; text-align: center; margin-top: 32px; }
    strong { color: #e8e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="logo">zeroto<span>.sale</span></p>
      <p class="tagline">LEVEL 0 — YOUR JOURNEY STARTS NOW</p>
    </div>

    <h2>Hey, welcome aboard.</h2>

    <p>
      You just took the first step most people never take. Most builders spend months
      tweaking their product before talking to a single customer.
      <strong>You're about to do it differently.</strong>
    </p>

    <p>Here's your path to first sale:</p>

    <div class="steps">
      <div class="step"><span>LVL 1</span> — Crystallize your idea</div>
      <div class="step"><span>LVL 2</span> — Validate before coding</div>
      <div class="step"><span>LVL 3</span> — Landing page live</div>
      <div class="step"><span>LVL 4</span> — 100 real visitors</div>
      <div class="step"><span>LVL 5</span> — Build your MVP</div>
      <div class="step"><span>LVL 6</span> — Convert your waitlist</div>
      <div class="step"><span>LVL 7</span> — 🎉 First sale</div>
    </div>

    <p>
      Each step unlocks the next. Each step has AI-generated output
      tailored to <strong>your exact product</strong>.
      No generic advice. No fluff.
    </p>

    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="cta">
      START YOUR JOURNEY →
    </a>

    <p>
      If you have any questions, just reply to this email.
      I read every message.
    </p>

    <p>— Martin<br>Builder of zeroto.sale</p>

    <div class="footer">
      zeroto.sale · You're receiving this because you signed up.<br>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #6b6b8a;">zeroto.sale</a>
    </div>
  </div>
</body>
</html>
    `.trim(),
  })
}
