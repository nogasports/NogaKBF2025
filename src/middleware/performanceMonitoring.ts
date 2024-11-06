import { Request, Response, NextFunction } from 'express';
import { performance } from 'perf_hooks';
import { logger } from '../utils/logger';
import { env } from '../config/env';
import { debugMonitor } from '../lib/monitoring/debug';

export const performanceMonitoring = (req: Request, res: Response, next: NextFunction) => {
  if (!env.ENABLE_PERFORMANCE_MONITORING) {
    return next();
  }

  const start = performance.now();
  const startMemory = process.memoryUsage();
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();

  // Track request start
  debugMonitor.startPerfMeasure(`request-${requestId}`);

  // Track response time
  res.on('finish', () => {
    const duration = performance.now() - start;
    const endMemory = process.memoryUsage();
    
    // Calculate memory diff
    const memoryDiff = {
      heapUsed: endMemory.heapUsed - startMemory.heapUsed,
      heapTotal: endMemory.heapTotal - startMemory.heapTotal,
      external: endMemory.external - startMemory.external,
      rss: endMemory.rss - startMemory.rss,
    };

    // Log performance metrics
    logger.info({
      type: 'performance',
      requestId,
      path: req.path,
      method: req.method,
      statusCode: res.statusCode,
      duration: `${duration.toFixed(2)}ms`,
      memory: memoryDiff,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      contentLength: res.getHeader('content-length'),
    });

    // Track slow requests
    if (duration > 1000) { // 1 second threshold
      logger.warn('Slow request detected:', {
        requestId,
        path: req.path,
        duration: `${duration.toFixed(2)}ms`,
        method: req.method,
      });
    }

    // Track high memory usage
    const heapUsedMB = memoryDiff.heapUsed / 1024 / 1024;
    if (heapUsedMB > 50) { // 50MB threshold
      logger.warn('High memory usage detected:', {
        requestId,
        path: req.path,
        heapUsedMB: `${heapUsedMB.toFixed(2)}MB`,
        method: req.method,
      });
    }

    debugMonitor.endPerfMeasure(`request-${requestId}`);
  });

  next();
};