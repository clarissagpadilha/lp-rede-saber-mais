import { z } from "zod";

export const ORGANIZATION_TYPES = [
  "Empresa",
  "Cooperativa",
  "Sindicato ou associação",
  "Instituição de ensino",
  "Órgão público",
  "Outra",
] as const;

export const SIZE_OPTIONS = [
  "Até 50 pessoas",
  "De 51 a 200",
  "De 201 a 500",
  "De 501 a 1.000",
  "Mais de 1.000",
  "Ainda não sei informar",
] as const;

const phoneDigitsRegex = /^\d{10,15}$/;

const asString = (value: unknown) => (value === undefined || value === null ? "" : String(value));

export const leadFieldsSchema = z.object({
  nome: z.preprocess(
    asString,
    z
      .string()
      .trim()
      .min(2, "Informe seu nome completo.")
      .max(100, "O nome deve ter no máximo 100 caracteres."),
  ),
  empresa: z.preprocess(
    asString,
    z
      .string()
      .trim()
      .min(2, "Informe o nome da empresa ou instituição.")
      .max(150, "O nome da organização deve ter no máximo 150 caracteres."),
  ),
  cargo: z.preprocess(
    asString,
    z.string().trim().max(100, "O cargo deve ter no máximo 100 caracteres."),
  ),
  email: z.preprocess(
    asString,
    z
      .string()
      .trim()
      .min(1, "Informe seu e-mail profissional.")
      .email("Informe um e-mail válido.")
      .max(150, "O e-mail deve ter no máximo 150 caracteres."),
  ),
  whatsapp: z.preprocess(
    asString,
    z
      .string()
      .trim()
      .min(1, "Informe seu WhatsApp.")
      .transform((value) => value.replace(/\D/g, ""))
      .refine((digits) => phoneDigitsRegex.test(digits), {
        message: "Informe um WhatsApp válido com DDD.",
      }),
  ),
  tipoOrganizacao: z.enum(ORGANIZATION_TYPES, {
    message: "Selecione o tipo de organização.",
  }),
  quantidadeBeneficiarios: z.enum(SIZE_OPTIONS, {
    message: "Selecione a quantidade aproximada de beneficiários.",
  }),
  consentimento: z.preprocess(
    (value) => value === true,
    z.boolean().refine((value) => value === true, {
      message: "É necessário aceitar a Política de Privacidade.",
    }),
  ),
});

export const utmFieldsSchema = z.object({
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  gclid: z.string().max(200).optional(),
  fbclid: z.string().max(200).optional(),
  landingPage: z.string().max(500).optional(),
  referrer: z.string().max(500).optional(),
});

export const antiSpamSchema = z.object({
  website: z.preprocess(asString, z.string()),
  formStartedAt: z.number().int().positive(),
});

export const leadSubmitSchema = leadFieldsSchema.merge(utmFieldsSchema).merge(antiSpamSchema);

export type LeadFields = z.infer<typeof leadFieldsSchema>;
export type UtmFields = z.infer<typeof utmFieldsSchema>;
export type LeadSubmitInput = z.infer<typeof leadSubmitSchema>;

export type WebhookLeadPayload = LeadFields & {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  landingPage: string;
  referrer?: string;
  submittedAt: string;
};

export const FIELD_LABELS: Record<keyof LeadFields, string> = {
  nome: "Nome",
  empresa: "Empresa ou instituição",
  cargo: "Cargo",
  email: "E-mail profissional",
  whatsapp: "WhatsApp",
  tipoOrganizacao: "Tipo de organização",
  quantidadeBeneficiarios: "Quantidade aproximada de pessoas beneficiadas",
  consentimento: "Consentimento",
};
