import type { Metadata } from "next"
import { Press_Start_2P, JetBrains_Mono } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "zeroto.sale — From idea to first sale",
  description: "The gamified guide that takes SaaS builders from zero to their first sale.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://zeroto.sale"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#0a0a0f] text-[#e8e8f0]">
        {children}
      </body>
      <GoogleAnalytics gaId="G-3B3MBLG7N4" />
    </html>
  )
}
