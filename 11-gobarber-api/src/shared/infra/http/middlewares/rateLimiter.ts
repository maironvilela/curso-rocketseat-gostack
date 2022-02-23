import { NextFunction, Request, Response } from "express";
import redis from 'redis'

import AppError from '@shared/errors/AppError'
import { RateLimiterRedis } from "rate-limiter-flexible";


const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 10, // quant  requests
  duration: 1, // per 1 second by IP
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {

  try {
    await limiter.consume(request.ip)
    return next();
  } catch (err) {
    throw new AppError('Too Many Requests', 429)

  }

}
