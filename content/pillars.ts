import type { PillarItem } from "@/types";

export const ecosystemContent = {
  eyebrow: "Como o Plano se organiza",
  title: "Cinco pilares conectados em um único Plano de Educação",
  description:
    "A Rede Saber Mais conecta educação profissional, tecnologia, desenvolvimento humano e conteúdos para diferentes etapas da vida em um único ecossistema. O ecossistema pode reunir, de acordo com o plano contratado, as seguintes frentes educacionais.",
};

export const pillars: PillarItem[] = [
  {
    id: "professional",
    title: "Educação Profissional",
    description:
      "Cursos avulsos, capacitações corporativas e trilhas de desenvolvimento. Dependendo do plano contratado até 83% de desconto em EJA, técnicos, graduação e pós-graduação.",
    icon: "layers",
  },
  {
    id: "ai",
    title: "IA Aplicada à Educação",
    description:
      "Apoio individualizado ao estudo, com orientação para dúvidas de aprendizagem.",
    icon: "monitor",
  },
  {
    id: "family",
    title: "Educação para Toda a Família",
    description: "Reforço escolar, preparação para o Enem e conteúdos para diferentes idades.",
    icon: "user",
  },
  {
    id: "inclusive",
    title: "Educação Inclusiva",
    description:
      "Recursos pensados para diferentes necessidades de aprendizagem, conforme disponibilidade.",
    icon: "check-circle",
  },
  {
    id: "library",
    title: "Biblioteca Digital",
    description:
      "Livros digitais, audiolivros e conteúdos de saúde mental, educação financeira e qualidade de vida.",
    icon: "book",
  },
];
