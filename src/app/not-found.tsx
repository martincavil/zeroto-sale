import Link from "next/link"
import { PixelCharacter } from "@/components/pixel/PixelCharacter"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-8">
      <PixelCharacter level={0} size="lg" />
      <div className="flex flex-col gap-3">
        <p className="font-pixel text-[16px] text-[#8b8ba8]">ERROR 404</p>
        <h1 className="font-pixel text-lg text-[#e8e8f0]">PAGE NOT FOUND</h1>
        <p className="font-mono text-sm text-[#8b8ba8]">This level doesn&apos;t exist yet.</p>
      </div>
      <Link
        href="/"
        className="font-pixel text-[16px] px-6 py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors pixel-border-primary"
      >
        ← GO HOME
      </Link>
    </main>
  )
}
