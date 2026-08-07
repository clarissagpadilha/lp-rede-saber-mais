import type { FooterColumn } from "@/types";

import { siteConfig } from "@/config/site";
import { flattenNavigationLinks, navigationLinks } from "./navigation";

export const footerContent = {
  brand: siteConfig.name,
  description:
    "Um ecossistema educacional para empresas, cooperativas, sindicatos, associações, instituições de ensino e órgãos públicos.",
  contact: siteConfig.contact,
  columns: [
    {
      title: "Navegação",
      links: flattenNavigationLinks(navigationLinks),
    },
    {
      title: "Institucional",
      links: [
        { label: "Política de Privacidade", href: "/politica-de-privacidade" },
        { label: "Termos de Uso", href: "/termos-de-uso" },
      ],
    },
  ] as FooterColumn[],
  copyright: `© ${new Date().getFullYear()} Rede Saber Mais. Todos os direitos reservados.`,
  credits: siteConfig.credits,
};
