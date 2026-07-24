const LOCAL_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"];

function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/+$/, "");
  if (!trimmed) return trimmed;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured) {
    return normalizeSiteUrl(configured);
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  if (process.env.VERCEL_URL) {
    return normalizeSiteUrl(process.env.VERCEL_URL);
  }

  return "http://localhost:3000";
}

export function isLocalSiteUrl(url: string = getSiteUrl()): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return LOCAL_HOSTS.includes(hostname) || hostname.endsWith(".local");
  } catch {
    return true;
  }
}

export function isProductionSite(): boolean {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configured || process.env.NODE_ENV !== "production") {
    return false;
  }

  return !isLocalSiteUrl(normalizeSiteUrl(configured));
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath === "/" ? "" : normalizedPath}` || base;
}

export function absoluteAssetUrl(assetPath: string): string {
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return absoluteUrl(path);
}
