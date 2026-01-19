import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
    points: 5, // 5 requests
    duration: 60, // per 60 seconds by default
});

const aiRateLimiter = new RateLimiterMemory({
    points: 3, // 3 AI requests
    duration: 60, // per minute (prevent bill shock / abuse)
});

export async function rateLimit(key: string, type: 'general' | 'ai' = 'general') {
    const limiter = type === 'ai' ? aiRateLimiter : rateLimiter;
    try {
        await limiter.consume(key);
        return { success: true };
    } catch {
        return { success: false };
    }
}
