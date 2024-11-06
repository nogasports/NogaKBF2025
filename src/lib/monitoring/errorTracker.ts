import { ErrorLog, ErrorStats } from './types';

export class ErrorTracker {
  private errors: ErrorLog[];
  private readonly MAX_ERRORS = 100;

  constructor() {
    this.errors = [];
  }

  captureError(error: ErrorLog): void {
    this.errors.unshift(error);
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors.pop();
    }

    // Send error to external service if configured
    this.sendToExternalService(error);
  }

  private sendToExternalService(error: ErrorLog): void {
    // TODO: Implement integration with external error tracking service
    // Example: Sentry, LogRocket, etc.
    console.error('Error captured:', error);
  }

  getErrorStats(): ErrorStats {
    const byType: Record<string, number> = {};
    
    this.errors.forEach(error => {
      const type = error.context?.type || 'unknown';
      byType[type] = (byType[type] || 0) + 1;
    });

    return {
      total: this.errors.length,
      byType,
      recentErrors: this.errors.slice(0, 10),
    };
  }

  clearErrors(): void {
    this.errors = [];
  }
}