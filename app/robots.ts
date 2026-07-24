import type { MetadataRoute } from "next";

import { getSiteUrl, isProductionSite } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const allowIndexing = isProductionSite();

  return {
    rules: allowIndexing
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: allowIndexing ? `${siteUrl}/sitemap.xml` : undefined,
    host: allowIndexing ? siteUrl : undefined,
  };
}
