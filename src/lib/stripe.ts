import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-05-27.dahlia",
    })
  }
  return _stripe
}

// Keep named export for convenience in server contexts
export { getStripe as stripe }

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID ?? "",
    amount: 900,
    label: "$9/mo",
  },
  lifetime: {
    priceId: process.env.STRIPE_LIFETIME_PRICE_ID ?? "",
    amount: 8900,
    label: "$89 LTD",
  },
} as const
