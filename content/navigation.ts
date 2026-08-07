import type { NavLink, NavLinkChild } from "@/types";

export const navigationLinks: NavLink[] = [
  { label: "O Plano", href: "#conceito" },
  { label: "Soluções", href: "#ecossistema" },
  { label: "Para sua organização", href: "#organizacoes" },
  { label: "Sobre", href: "#experiencia" },
  {
    label: "Cursos",
    children: [
      { label: "Cursos Livres", href: "https://redesabermais.com/" },
      { label: "Telemedicina", href: "https://aqua-tiger-671921.hostingersite.com/" },
      { label: "Ebook", href: "https://plataformadeensino.redesabermais.com/" },
    ],
  },
];

export const navigationSectionIds = navigationLinks.flatMap((link) =>
  link.href?.startsWith("#") ? [link.href.slice(1)] : [],
);

export function flattenNavigationLinks(links: NavLink[] = navigationLinks): NavLinkChild[] {
  return links.flatMap((link) =>
    link.children ?? (link.href ? [{ label: link.label, href: link.href }] : []),
  );
}

export const ctaLink: NavLinkChild = {
  label: "Agende uma apresentação",
  href: "#formulario",
};
