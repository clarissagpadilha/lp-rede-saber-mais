import type { NavLink } from "@/types";

export const navigationLinks: NavLink[] = [
  { label: "O Plano", href: "#conceito" },
  { label: "Soluções", href: "#ecossistema" },
  { label: "Para sua organização", href: "#organizacoes" },
  { label: "Sobre", href: "#experiencia" },
  { label: "Cursos Avulsos", href: "https://redesabermais.com/" },
];

export const navigationSectionIds = navigationLinks
  .filter((link) => link.href.startsWith("#"))
  .map((link) => link.href.slice(1));

export const ctaLink: NavLink = {
  label: "Agende uma apresentação",
  href: "#formulario",
};
