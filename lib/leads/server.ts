import { sanitizeOptionalString, sanitizeString } from "@/lib/sanitize";
import {
  type LeadSubmitInput,
  type WebhookLeadPayload,
  leadFieldsSchema,
} from "@/lib/schemas/lead-form";

export const MIN_SUBMIT_MS = 3_000;
export const MAX_PAYLOAD_BYTES = 10_240;

export function buildWebhookPayload(
  data: LeadSubmitInput,
  landingPage: string,
  referrer: string | undefined,
  submittedAt: string,
): WebhookLeadPayload {
  const fields = leadFieldsSchema.parse({
    nome: sanitizeString(data.nome, 100),
    empresa: sanitizeString(data.empresa, 150),
    cargo: sanitizeOptionalString(data.cargo, 100) ?? "",
    email: sanitizeString(data.email, 150),
    whatsapp: data.whatsapp.replace(/\D/g, ""),
    tipoOrganizacao: data.tipoOrganizacao,
    quantidadeBeneficiarios: data.quantidadeBeneficiarios,
    consentimento: true,
  });

  return {
    ...fields,
    utmSource: sanitizeOptionalString(data.utmSource, 200),
    utmMedium: sanitizeOptionalString(data.utmMedium, 200),
    utmCampaign: sanitizeOptionalString(data.utmCampaign, 200),
    utmContent: sanitizeOptionalString(data.utmContent, 200),
    utmTerm: sanitizeOptionalString(data.utmTerm, 200),
    gclid: sanitizeOptionalString(data.gclid, 200),
    fbclid: sanitizeOptionalString(data.fbclid, 200),
    landingPage,
    referrer: sanitizeOptionalString(referrer, 500),
    submittedAt,
  };
}

export async function forwardLeadToWebhook(payload: WebhookLeadPayload, webhookUrl: string) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.ok;
}
