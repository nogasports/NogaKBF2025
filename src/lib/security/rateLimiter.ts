export class RateLimiter {
  private static instance: RateLimiter;
  private requests: Map<string, { count: number; resetTime: number }>;
  private readonly windowMs: number;
  private readonly maxRequests: number;

  private constructor() {
    this.requests = new Map();
    this.windowMs = 15 * 60 * 1000; // 15 minutes
    this.maxRequests = 100; // 100 requests per window
  }

  static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  checkLimit(clientId: string): boolean {
    const now = Date.now();
    const clientRequests = this.requests.get(clientId);

    if (!clientRequests || now > clientRequests.resetTime) {
      this.requests.set(clientId, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (clientRequests.count >= this.maxRequests) {
      return false;
    }

    clientRequests.count++;
    return true;
  }

  getRemainingRequests(clientId: string): number {
    const clientRequests = this.requests.get(clientId);
    if (!clientRequests) return this.maxRequests;
    return Math.max(0, this.maxRequests - clientRequests.count);
  }

  getResetTime(clientId: string): number {
    const clientRequests = this.requests.get(clientId);
    if (!clientRequests) return Date.now() + this.windowMs;
    return clientRequests.resetTime;
  }
}