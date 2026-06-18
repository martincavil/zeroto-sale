import Link from "next/link"

interface LandingNavProps {
  isLoggedIn: boolean
}

export function LandingNav({ isLoggedIn }: LandingNavProps) {
  return (
    <div className="sticky top-4 z-50 px-4 pointer-events-none">
      <nav
        className="pointer-events-auto mx-auto max-w-4xl flex items-center justify-between px-6 py-3 rounded-2xl border border-[#ffffff0f] bg-[#0a0a0fcc] backdrop-blur-md"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)" }}
      >
        <Link href="/" className="font-pixel text-base text-[#e8e8f0]">
          zeroto<span className="text-[#7c3aed]">.sale</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/pricing" className="font-mono text-sm text-[#8b8ba8] hover:text-[#e8e8f0] transition-colors hidden sm:block">
            Pricing
          </Link>
          {isLoggedIn ? (
            <Link href="/dashboard" className="font-pixel text-[13px] px-4 py-2 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary rounded-lg">
              Dashboard →
            </Link>
          ) : (
            <>
              <Link href="/login" className="font-mono text-sm text-[#8b8ba8] hover:text-[#e8e8f0] transition-colors hidden sm:block">
                Log in
              </Link>
              <Link href="/signup" className="font-pixel text-[13px] px-4 py-2 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary rounded-lg">
                Start free →
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}
