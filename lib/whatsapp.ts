import { siteConfig } from "@/config/site";
import { formatBrazilPhone } from "@/lib/phone";
import type { LeadFields } from "@/lib/schemas/lead-form";

const DEFAULT_MESSAGE =
  "Olá! Conheci o Plano de Educação Rede Saber Mais e gostaria de agendar uma apresentação para minha organização.";

export function buildWhatsAppUrl(number: string, message = DEFAULT_MESSAGE): string | null {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppUrlFromEnv(): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (!number) return null;
  return buildWhatsAppUrl(number);
}

function getWhatsAppNumberFromSiteConfig(): string | null {
  const match = siteConfig.contact.whatsapp.href.match(/wa\.me\/(\d+)/);
  return match?.[1] ?? null;
}

export function getWhatsAppUrl(message = DEFAULT_MESSAGE): string {
  const fromEnvNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (fromEnvNumber) {
    return buildWhatsAppUrl(fromEnvNumber, message) ?? siteConfig.contact.whatsapp.href;
  }

  const number = getWhatsAppNumberFromSiteConfig();
  if (number) {
    return buildWhatsAppUrl(number, message) ?? siteConfig.contact.whatsapp.href;
  }

  return siteConfig.contact.whatsapp.href;
}

export function buildLeadWhatsAppMessage(data: LeadFields): string {
  const lines = [
    "Olá! Gostaria de agendar uma apresentação do Plano de Educação Rede Saber Mais.",
    "",
    `Nome: ${data.nome}`,
    `Empresa ou instituição: ${data.empresa}`,
  ];

  if (data.cargo.trim()) {
    lines.push(`Cargo: ${data.cargo}`);
  }

  lines.push(
    `E-mail: ${data.email}`,
    `WhatsApp: ${formatBrazilPhone(data.whatsapp)}`,
    `Tipo de organização: ${data.tipoOrganizacao}`,
    `Quantidade aproximada de pessoas beneficiadas: ${data.quantidadeBeneficiarios}`,
  );

  return lines.join("\n");
}

export function buildLeadWhatsAppUrl(data: LeadFields): string {
  return getWhatsAppUrl(buildLeadWhatsAppMessage(data));
}
