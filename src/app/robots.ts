import type { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zeroto.sale"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/account", "/onboarding", "/welcome", "/success", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
