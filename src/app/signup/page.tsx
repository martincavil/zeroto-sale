import { AuthForm } from "@/components/auth/AuthForm"

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>
}) {
  const { plan } = await searchParams
  return <AuthForm mode="signup" redirectPlan={plan} />
}
