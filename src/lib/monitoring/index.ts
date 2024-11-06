import { AnalyticsEvent, ErrorLog, PerformanceMetric } from './types';
import { MetricsService } from './metrics';
import { ErrorTracker } from './errorTracker';
import { PerformanceMonitor } from './performance';

class MonitoringService {
  private static instance: MonitoringService;
  private metricsService: MetricsService;
  private errorTracker: ErrorTracker;
  private performanceMonitor: PerformanceMonitor;

  private constructor() {
    this.metricsService = new MetricsService();
    this.errorTracker = new ErrorTracker();
    this.performanceMonitor = new PerformanceMonitor();
  }

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  trackEvent(eventName: string, data: any): void {
    const event: AnalyticsEvent = {
      name: eventName,
      timestamp: new Date().toISOString(),
      data,
    };
    this.metricsService.recordEvent(event);
  }

  logError(error: Error, context?: Record<string, any>): void {
    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context,
    };
    this.errorTracker.captureError(errorLog);
  }

  measurePerformance(metric: string, value?: number): void {
    const performanceMetric: PerformanceMetric = {
      name: metric,
      value: value || performance.now(),
      timestamp: new Date().toISOString(),
    };
    this.performanceMonitor.recordMetric(performanceMetric);
  }

  getMetrics(): Record<string, any> {
    return {
      events: this.metricsService.getMetrics(),
      errors: this.errorTracker.getErrorStats(),
      performance: this.performanceMonitor.getMetrics(),
    };
  }
}

export const monitoring = MonitoringService.getInstance();