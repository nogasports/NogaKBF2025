import { Request, Response, NextFunction } from 'express';
import { pinoHttp } from 'pino-http';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export const requestLogger = pinoHttp({
  logger,
  customLogLevel: function (res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
    if (res.statusCode >= 500 || err) return 'error';
    return 'info';
  },
  customSuccessMessage: function (res) {
    return `${res.req.method} ${res.req.url} completed with status ${res.statusCode}`;
  },
  customErrorMessage: function (error, res) {
    return `${res.req.method} ${res.req.url} failed with status ${res.statusCode}`;
  },
  customProps: function (req, res) {
    return {
      userAgent: req.headers['user-agent'],
      remoteAddress: req.ip,
      requestId: req.id,
    };
  },
  enabled: env.ENABLE_REQUEST_LOGGING,
});