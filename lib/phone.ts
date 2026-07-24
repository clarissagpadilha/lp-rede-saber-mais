export function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatBrazilPhone(value: string): string {
  const digits = normalizePhone(value).slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function isPlausiblePhone(digits: string): boolean {
  return digits.length >= 10 && digits.length <= 15;
}
