import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { routes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { securityMiddleware } from './middleware/security';
import { requestLogger } from './middleware/requestLogger';
import { performanceMonitoring } from './middleware/performanceMonitoring';
import { healthCheck } from './middleware/healthCheck';
import { initSentry } from './config/sentry';
import { logger } from './utils/logger';

// Initialize Sentry
initSentry();

const app = express();

// Security middleware
app.use(securityMiddleware);

// Request logging
app.use(requestLogger);

// Performance monitoring
app.use(performanceMonitoring);

// Health check endpoint
app.get('/health', healthCheck);

// CORS configuration
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiting
app.use('/api/', rateLimiter);

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error logging
app.on('error', (error) => {
  logger.error('Server error:', error);
});

export { app };