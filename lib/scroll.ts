const DEFAULT_HEADER_HEIGHT = 68;

export function getHeaderHeight(): number {
  if (typeof window === "undefined") return DEFAULT_HEADER_HEIGHT;

  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim();
  if (raw.endsWith("px")) return Number.parseFloat(raw);
  if (raw.endsWith("rem")) return Number.parseFloat(raw) * 16;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : DEFAULT_HEADER_HEIGHT;
}

export function scrollToSection(hash: string): void {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  const element = document.getElementById(id);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - getHeaderHeight();
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function getSectionIdFromHref(href: string): string | null {
  if (!href.startsWith("#") || href.length < 2) return null;
  return href.slice(1);
}
