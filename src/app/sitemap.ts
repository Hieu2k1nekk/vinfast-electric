import type { MetadataRoute } from "next"

import { privacyPath, siteConfig } from "@/config/site"
import { vehicles } from "@/data/vehicles"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    ...vehicles.map((v) => ({
      url: `${siteConfig.url}/xe/${v.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${siteConfig.url}${privacyPath}`, changeFrequency: "yearly", priority: 0.2 },
  ]
}
