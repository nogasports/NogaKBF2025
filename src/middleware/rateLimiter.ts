import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { env } from '../config/env';
import { RateLimitError } from '../utils/errors';

let store;

if (env.REDIS_URL) {
  const redis = new Redis(env.REDIS_URL);
  store = new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  });
}

export const rateLimiter = rateLimit({
  store,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  handler: (req, res) => {
    throw new RateLimitError();
  },
  standardHeaders: true,
  legacyHeaders: false,
});