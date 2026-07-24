import { Fraunces, IBM_Plex_Mono, Inter, Manrope } from "next/font/google";

import type { ReactNode } from "react";

import { rootMetadata, SEO } from "@/config/seo";
import { siteConfig } from "@/config/site";

import "./globals.css";

export const metadata = {
  ...rootMetadata,
  title: {
    default: SEO.title,
    template: `%s | ${siteConfig.name}`,
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-brand-white font-sans text-brand-ink">
        <a href="#conteudo-principal" className="skip-link">
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
