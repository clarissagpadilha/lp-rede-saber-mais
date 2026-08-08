import type { NavLink, NavLinkChild } from "@/types";

/** Links do submenu Cursos (menu principal). */
export const courseSubmenuLinks: NavLinkChild[] = [
  { label: "Plataforma 1", href: "https://redesabermais.com/" },
  { label: "Plataforma 2", href: "https://aqua-tiger-671921.hostingersite.com/" },
  { label: "Ebooks/Duolingo", href: "https://plataformadeensino.redesabermais.com/" },
  { label: "EJA", href: "https://redesabermais.com/" },
  { label: "Cursos Técnicos", href: "https://redesabermais.com/" },
  { label: "Graduação", href: "https://redesabermais.com/" },
  { label: "Pós-Graduação", href: "https://redesabermais.com/" },
];

export const navigationLinks: NavLink[] = [
  { label: "O Plano", href: "#conceito" },
  { label: "Soluções", href: "#ecossistema" },
  { label: "Para sua organização", href: "#organizacoes" },
  { label: "Sobre", href: "#experiencia" },
  {
    label: "Cursos",
    children: courseSubmenuLinks,
  },
];

export const navigationSectionIds = navigationLinks.flatMap((link) =>
  link.href?.startsWith("#") ? [link.href.slice(1)] : [],
);

export function flattenNavigationLinks(links: NavLink[] = navigationLinks): NavLinkChild[] {
  return links.flatMap((link) => {
    if (link.children?.length) {
      return [{ label: link.label, href: "#", hasSubmenu: true }];
    }

    return link.href ? [{ label: link.label, href: link.href }] : [];
  });
}

export const ctaLink: NavLinkChild = {
  label: "Agende uma apresentação",
  href: "#formulario",
};
