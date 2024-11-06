import { AnalyticsEvent, MetricAggregation, MetricType } from './types';

export class MetricsService {
  private metrics: Map<string, MetricAggregation>;
  private events: AnalyticsEvent[];
  private readonly MAX_EVENTS = 1000;

  constructor() {
    this.metrics = new Map();
    this.events = [];
  }

  recordEvent(event: AnalyticsEvent): void {
    this.events.unshift(event);
    if (this.events.length > this.MAX_EVENTS) {
      this.events.pop();
    }

    this.updateMetric(event.name, event.data);
  }

  private updateMetric(name: string, value: number): void {
    const existing = this.metrics.get(name) || {
      count: 0,
      sum: 0,
      avg: 0,
      min: Number.MAX_VALUE,
      max: Number.MIN_VALUE,
      lastValue: 0,
      lastTimestamp: new Date().toISOString(),
    };

    existing.count++;
    existing.sum += value;
    existing.avg = existing.sum / existing.count;
    existing.min = Math.min(existing.min, value);
    existing.max = Math.max(existing.max, value);
    existing.lastValue = value;
    existing.lastTimestamp = new Date().toISOString();

    this.metrics.set(name, existing);
  }

  getMetrics(): Record<string, MetricAggregation> {
    const result: Record<string, MetricAggregation> = {};
    this.metrics.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  getEvents(filter?: {
    name?: string;
    startTime?: string;
    endTime?: string;
  }): AnalyticsEvent[] {
    let filtered = this.events;

    if (filter?.name) {
      filtered = filtered.filter(event => event.name === filter.name);
    }

    if (filter?.startTime) {
      filtered = filtered.filter(event => event.timestamp >= filter.startTime!);
    }

    if (filter?.endTime) {
      filtered = filtered.filter(event => event.timestamp <= filter.endTime!);
    }

    return filtered;
  }

  clearMetrics(): void {
    this.metrics.clear();
    this.events = [];
  }
}