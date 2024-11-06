import { useEffect, useCallback } from 'react';
import { monitoring } from '../lib/monitoring';

export function useMonitoring() {
  useEffect(() => {
    // Track page view on component mount
    monitoring.trackEvent('page_view', {
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackEvent = useCallback((eventName: string, data: any) => {
    monitoring.trackEvent(eventName, data);
  }, []);

  const logError = useCallback((error: Error, context?: Record<string, any>) => {
    monitoring.logError(error, context);
  }, []);

  const measurePerformance = useCallback((metric: string, value?: number) => {
    monitoring.measurePerformance(metric, value);
  }, []);

  return {
    trackEvent,
    logError,
    measurePerformance,
  };
}