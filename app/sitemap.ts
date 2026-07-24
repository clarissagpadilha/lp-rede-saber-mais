import type { MetadataRoute } from "next";

import { absoluteUrl, isProductionSite } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionSite()) {
    return [];
  }

  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/politica-de-privacidade"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/termos-de-uso"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
