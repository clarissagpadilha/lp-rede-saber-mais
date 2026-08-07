import { siteConfig } from "@/config/site";

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

export function getWhatsAppUrl(): string {
  const fromEnv = getWhatsAppUrlFromEnv();
  if (fromEnv) return fromEnv;

  const number = getWhatsAppNumberFromSiteConfig();
  if (number) {
    return buildWhatsAppUrl(number) ?? siteConfig.contact.whatsapp.href;
  }

  return siteConfig.contact.whatsapp.href;
}
