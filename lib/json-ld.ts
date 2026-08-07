import { SEO } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { faqItems } from "@/content/faq";
import { absoluteAssetUrl, getSiteUrl } from "@/lib/site-url";

export function getOrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    logo: absoluteAssetUrl("/icon.png"),
    description: SEO.organizationDescription,
    sameAs: [
      siteConfig.instagram,
      siteConfig.facebook,
      siteConfig.linkedin,
      siteConfig.website.replace(/\/+$/, ""),
    ],
  };
}

export function getWebSiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: SEO.description,
    inLanguage: siteConfig.locale,
  };
}

export function getFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getHomeJsonLd() {
  return [getOrganizationJsonLd(), getWebSiteJsonLd(), getFaqPageJsonLd()];
}
