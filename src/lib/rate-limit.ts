// Simple in-memory rate limiter
// Note: This will not work across multiple serverless instances
// In a real production environment, use Upstash Redis or similar

const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();

export function isRateLimited(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const info = rateLimitMap.get(ip) || { count: 0, lastAttempt: now };

  if (now - info.lastAttempt > windowMs) {
    info.count = 1;
    info.lastAttempt = now;
  } else {
    info.count++;
  }

  rateLimitMap.set(ip, info);
  return info.count > limit;
}
