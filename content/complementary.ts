import type { ComplementaryItem } from "@/types";

export const complementaryContent = {
  eyebrow: "Recursos complementares",
  title: "Benefícios que podem compor o Plano",
  description:
    "A disponibilidade de cada recurso pode variar conforme o plano contratado e as condições dos parceiros.",
};

export const complementaryItems: ComplementaryItem[] = [
  {
    id: "club",
    title: "Clube de vantagens",
    description: "Conforme parceiros vigentes",
    icon: "external-link",
  },
  {
    id: "telemedicine",
    title: "Telemedicina",
    description: "Conforme disponibilidade do parceiro",
    icon: "sun",
  },
  {
    id: "legal",
    title: "Teleorientação jurídica familiar",
    description: "Conforme disponibilidade do parceiro",
    icon: "shield",
  },
  {
    id: "certificates",
    title: "Certificados digitais",
    description: "Emitidos conforme a formação concluída",
    icon: "award",
  },
  {
    id: "recognition",
    title: "Programa de reconhecimento",
    description: "Por engajamento no Plano de Educação",
    icon: "zap",
  },
  {
    id: "wellness",
    title: "Saúde mental e qualidade de vida",
    description: "Conteúdos disponíveis na biblioteca digital",
    icon: "heart",
  },
];
