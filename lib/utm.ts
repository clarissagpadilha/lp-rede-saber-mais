export type UtmParams = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
};

const STORAGE_KEY = "rsm_utm_params";

const UTM_QUERY_MAP: Record<keyof UtmParams, string> = {
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  utmContent: "utm_content",
  utmTerm: "utm_term",
  gclid: "gclid",
  fbclid: "fbclid",
};

function readStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}

function writeStoredUtm(params: UtmParams): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // Ignore storage failures (private mode, quota, etc.)
  }
}

function mergeUtmParams(current: UtmParams, incoming: UtmParams): UtmParams {
  const merged: UtmParams = { ...current };

  (Object.keys(incoming) as Array<keyof UtmParams>).forEach((key) => {
    const value = incoming[key]?.trim();
    if (value) {
      merged[key] = value;
    }
  });

  return merged;
}

export function captureUtmFromSearchParams(searchParams: URLSearchParams): UtmParams {
  const incoming: UtmParams = {};

  (Object.entries(UTM_QUERY_MAP) as Array<[keyof UtmParams, string]>).forEach(
    ([key, queryKey]) => {
      const value = searchParams.get(queryKey)?.trim();
      if (value) incoming[key] = value;
    },
  );

  if (Object.keys(incoming).length === 0) return readStoredUtm();

  const merged = mergeUtmParams(readStoredUtm(), incoming);
  writeStoredUtm(merged);
  return merged;
}

export function initUtmCapture(): UtmParams {
  if (typeof window === "undefined") return {};
  return captureUtmFromSearchParams(new URLSearchParams(window.location.search));
}

export function getStoredUtmParams(): UtmParams {
  return readStoredUtm();
}

export function getClientAttribution(): UtmParams & {
  landingPage: string;
  referrer?: string;
} {
  const utm = readStoredUtm();

  return {
    ...utm,
    landingPage: window.location.href,
    referrer: document.referrer || undefined,
  };
}
