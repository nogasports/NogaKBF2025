import { PerformanceMetric, MetricAggregation } from './types';

export class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric[]>;
  private readonly MAX_METRICS_PER_TYPE = 1000;

  constructor() {
    this.metrics = new Map();
  }

  recordMetric(metric: PerformanceMetric): void {
    const metrics = this.metrics.get(metric.name) || [];
    metrics.unshift(metric);
    
    if (metrics.length > this.MAX_METRICS_PER_TYPE) {
      metrics.pop();
    }

    this.metrics.set(metric.name, metrics);
  }

  getMetrics(): Record<string, MetricAggregation> {
    const result: Record<string, MetricAggregation> = {};

    this.metrics.forEach((metrics, name) => {
      const values = metrics.map(m => m.value);
      result[name] = {
        count: metrics.length,
        sum: values.reduce((a, b) => a + b, 0),
        avg: values.reduce((a, b) => a + b, 0) / metrics.length,
        min: Math.min(...values),
        max: Math.max(...values),
        lastValue: metrics[0]?.value || 0,
        lastTimestamp: metrics[0]?.timestamp || new Date().toISOString(),
      };
    });

    return result;
  }

  clearMetrics(): void {
    this.metrics.clear();
  }
}