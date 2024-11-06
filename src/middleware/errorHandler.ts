import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import { logger } from '../utils/logger';
import { AppError, ValidationError } from '../utils/errors';
import { env } from '../config/env';
import { debugMonitor } from '../lib/monitoring/debug';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log detailed error information
  logger.error('Error:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    query: req.query,
    body: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });

  // Track error metrics
  debugMonitor.trackError(err, {
    path: req.path,
    method: req.method,
    statusCode: res.statusCode
  });

  // Send error to Sentry in production
  if (env.NODE_ENV === 'production') {
    Sentry.captureException(err, {
      extra: {
        path: req.path,
        method: req.method,
        query: req.query,
        body: req.body
      }
    });
  }

  // Handle known errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.name,
      ...(env.NODE_ENV === 'development' && { 
        stack: err.stack,
        context: err.context 
      }),
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors,
      code: 'VALIDATION_ERROR'
    });
  }

  // Handle unknown errors
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    code: 'INTERNAL_ERROR',
    ...(env.NODE_ENV === 'development' && { 
      stack: err.stack,
      timestamp: new Date().toISOString()
    }),
  });
};