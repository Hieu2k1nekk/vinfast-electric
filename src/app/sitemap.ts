import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { vehicles } from "@/data/vehicles"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    ...vehicles.map((v) => ({
      url: `${siteConfig.url}/xe/${v.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
