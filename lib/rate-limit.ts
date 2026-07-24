type RateLimitEntry = {
  timestamps: number[];
};

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };
  const recent = entry.timestamps.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    store.set(key, { timestamps: recent });
    return true;
  }

  recent.push(now);
  store.set(key, { timestamps: recent });
  return false;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}
