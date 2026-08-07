export const siteConfig = {
  name: "Rede Saber Mais",
  locale: "pt-BR",
  instagram: "https://www.instagram.com/plataformaredesabermais",
  facebook: "https://www.facebook.com/plataformaredesabermais",
  linkedin: "https://www.linkedin.com/company/plataformaredesabermais",
  website: "https://redesabermais.com/",
  contact: {
    whatsapp: {
      display: "(51) 99538-0955",
      href: "https://wa.me/5551995380955",
    },
    email: {
      display: "planodeeducacao@redesabermais.com",
      href: "mailto:planodeeducacao@redesabermais.com",
    },
  },
  credits: {
    agencyName: "Sire Marketing",
    agencyUrl: "https://www.siremarketing.com.br/",
  },
} as const;

export const socialLinks = [
  { id: "instagram", label: "Instagram", href: siteConfig.instagram },
  { id: "facebook", label: "Facebook", href: siteConfig.facebook },
  { id: "linkedin", label: "LinkedIn", href: siteConfig.linkedin },
] as const;
