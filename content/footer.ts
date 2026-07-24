import type { FooterColumn } from "@/types";

import { navigationLinks } from "./navigation";
import { siteConfig } from "@/config/site";

export const footerContent = {
  brand: siteConfig.name,
  description:
    "Um ecossistema educacional para empresas, cooperativas, sindicatos, associações, instituições de ensino e órgãos públicos.",
  columns: [
    {
      title: "Navegação",
      links: navigationLinks,
    },
    {
      title: "Contato",
      links: [
        {
          label: "@plataformaredesabermais",
          href: siteConfig.instagram,
        },
        {
          label: "redesabermais.com",
          href: siteConfig.website,
        },
      ],
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
};
