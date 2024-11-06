import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { redisClient } from '../lib/redis';
import { logger } from '../utils/logger';

export const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check database connection
    const dbStatus = AppDataSource.isInitialized;
    
    // Check Redis connection
    const redisStatus = redisClient.status === 'ready';
    
    // Get system metrics
    const metrics = {
      uptime: process.uptime(),
      responseTime: process.hrtime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
    };

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus ? 'connected' : 'disconnected',
        redis: redisStatus ? 'connected' : 'disconnected',
      },
      metrics,
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
};