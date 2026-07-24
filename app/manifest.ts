import type { MetadataRoute } from "next";

import { SEO } from "@/config/seo";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: SEO.description,
    start_url: "/",
    display: "standalone",
    background_color: SEO.backgroundColor,
    theme_color: SEO.themeColor,
    lang: siteConfig.locale,
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
