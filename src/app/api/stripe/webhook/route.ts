import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { createAdminClient } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"

async function updateUserPlan(userId: string, plan: "pro" | "lifetime") {
  const supabase = createAdminClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any)
    .from("profiles")
    .update({ plan })
    .eq("id", userId)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id
      const planKey = session.metadata?.plan as "monthly" | "lifetime" | undefined

      if (userId && planKey) {
        const plan = planKey === "monthly" ? "pro" : "lifetime"
        await updateUserPlan(userId, plan)
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const supabase = createAdminClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from("profiles")
        .update({ plan: "free" })
        .eq("stripe_customer_id", customerId)
      break
    }

    case "invoice.payment_failed": {
      // Could send an email via Resend here
      break
    }
  }

  return NextResponse.json({ received: true })
}
