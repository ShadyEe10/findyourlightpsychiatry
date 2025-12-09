/**
 * Improved rate limiting with automatic cleanup
 * For production with multiple instances, use Redis or similar distributed cache
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitRecord>();
  private cleanupInterval: NodeJS.Timeout | null = null;
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly cleanupIntervalMs: number;

  constructor(maxRequests: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.cleanupIntervalMs = 5 * 60 * 1000; // Clean up every 5 minutes
    
    // Start cleanup interval
    this.startCleanup();
  }

  private normalizeIp(ip?: string): string {
    if (!ip || typeof ip !== 'string') {
      return 'unknown';
    }
    return ip.trim() || 'unknown';
  }

  check(ip: string): boolean {
    const normalizedIp = this.normalizeIp(ip);
    const now = Date.now();
    const record = this.store.get(normalizedIp);

    if (!record || now > record.resetTime) {
      this.store.set(normalizedIp, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  private startCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const toDelete: string[] = [];
      
      // Collect keys to delete (more efficient than deleting during iteration)
      for (const [ip, record] of this.store.entries()) {
        if (now > record.resetTime) {
          toDelete.push(ip);
        }
      }
      
      // Delete expired entries
      for (const ip of toDelete) {
        this.store.delete(ip);
      }
      
      // Prevent memory leaks - limit store size
      if (this.store.size > 10000) {
        // Remove oldest entries if store gets too large
        const entries = Array.from(this.store.entries());
        entries.sort((a, b) => a[1].resetTime - b[1].resetTime);
        const toRemove = entries.slice(0, entries.length - 5000);
        for (const [ip] of toRemove) {
          this.store.delete(ip);
        }
      }
    }, this.cleanupIntervalMs);
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.store.clear();
  }
}

// Singleton instance
const rateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 requests per 15 minutes

export function checkRateLimit(ip: string): boolean {
  return rateLimiter.check(ip);
}

// For production with multiple instances, use this pattern:
// import { Redis } from 'ioredis';
// const redis = new Redis(process.env.REDIS_URL);
// export async function checkRateLimit(ip: string): Promise<boolean> {
//   const key = `rate_limit:${ip}`;
//   const count = await redis.incr(key);
//   if (count === 1) {
//     await redis.expire(key, 900); // 15 minutes
//   }
//   return count <= 5;
// }

