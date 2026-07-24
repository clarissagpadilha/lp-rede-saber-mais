import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { absoluteAssetUrl, absoluteUrl, getSiteUrl, isProductionSite } from "@/lib/site-url";

export const SEO = {
  title: "Plano de Educação para Empresas | Rede Saber Mais",
  description:
    "Conheça o Plano de Educação Rede Saber Mais: uma solução educacional para empresas, cooperativas, sindicatos, associações, instituições de ensino e órgãos públicos.",
  organizationDescription:
    "Plano de Educação e ecossistema educacional para empresas, cooperativas, sindicatos, associações, instituições de ensino e órgãos públicos.",
  keywords: [
    "plano de educação para empresas",
    "benefício educacional corporativo",
    "educação corporativa",
    "plataforma de educação para colaboradores",
    "benefício de educação para funcionários",
    "plano educacional para colaboradores e familiares",
    "educação para cooperativas",
    "educação para sindicatos",
    "projeto educacional para órgãos públicos",
    "desenvolvimento de colaboradores",
    "ecossistema educacional",
    "educação corporativa online",
  ],
  ogImagePath: "/images/social/og-rede-saber-mais.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt:
    "Rede Saber Mais — Plano de Educação para empresas, cooperativas e instituições",
  themeColor: "#0F2A4A",
  backgroundColor: "#FAFBFC",
  category: "education",
} as const;

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function createPageMetadata(options: PageMetadataOptions = {}): Metadata {
  const siteUrl = getSiteUrl();
  const path = options.path ?? "/";
  const title = options.title ?? SEO.title;
  const description = options.description ?? SEO.description;
  const ogImageUrl = absoluteAssetUrl(SEO.ogImagePath);
  const shouldIndex = isProductionSite() && !options.noIndex;

  return {
    metadataBase: new URL(siteUrl),
    title: options.title ? { absolute: options.title } : SEO.title,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: SEO.category,
    keywords: [...SEO.keywords],
    alternates: {
      canonical: path,
    },
    robots: shouldIndex
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: SEO.ogImageWidth,
          height: SEO.ogImageHeight,
          alt: SEO.ogImageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    other: {
      "theme-color": SEO.themeColor,
    },
  };
}

export const rootMetadata: Metadata = createPageMetadata();

// Backward-compatible exports used by JSON-LD
export const siteMetadata = {
  title: SEO.title,
  description: SEO.description,
  ogImage: SEO.ogImagePath,
} as const;
