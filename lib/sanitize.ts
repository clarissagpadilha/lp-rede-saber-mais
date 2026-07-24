export function sanitizeString(value: string, maxLength: number): string {
  return value.replace(/\0/g, "").trim().slice(0, maxLength);
}

export function sanitizeOptionalString(
  value: string | undefined,
  maxLength: number,
): string | undefined {
  if (value === undefined) return undefined;
  const sanitized = sanitizeString(value, maxLength);
  return sanitized.length > 0 ? sanitized : undefined;
}
