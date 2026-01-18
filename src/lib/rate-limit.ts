// Simple in-memory rate limiter
// Note: In a production serverless environment, use Redis (e.g., Upstash)
const trackers = new Map<string, { count: number; lastRequest: number }>();

export function isRateLimited(ip: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now();
  const tracker = trackers.get(ip);

  if (!tracker || now - tracker.lastRequest > windowMs) {
    trackers.set(ip, { count: 1, lastRequest: now });
    return false;
  }

  if (tracker.count >= limit) {
    return true;
  }

  tracker.count++;
  trackers.set(ip, tracker);
  return false;
}
