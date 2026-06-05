import Link from "next/link"

interface LandingNavProps {
  isLoggedIn: boolean
}

export function LandingNav({ isLoggedIn }: LandingNavProps) {
  return (
    <nav className="border-b border-[#1e1e2e] px-8 py-5 flex items-center justify-between relative z-10">
      <Link href="/" className="font-pixel text-lg text-[#e8e8f0]">
        zeroto<span className="text-[#7c3aed]">.sale</span>
      </Link>
      <div className="flex items-center gap-8">
        <Link href="/pricing" className="font-mono text-base text-[#8b8ba8] hover:text-[#e8e8f0] transition-colors hidden sm:block">
          Pricing
        </Link>
        {isLoggedIn ? (
          <Link href="/dashboard" className="font-pixel text-sm px-5 py-3 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary">
            My dashboard →
          </Link>
        ) : (
          <>
            <Link href="/login" className="font-mono text-base text-[#8b8ba8] hover:text-[#e8e8f0] transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="font-pixel text-sm px-5 py-3 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary">
              Start free →
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
