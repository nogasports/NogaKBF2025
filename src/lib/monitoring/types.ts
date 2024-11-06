export interface AnalyticsEvent {
  name: string;
  timestamp: string;
  data: any;
}

export interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: string;
  context?: Record<string, any>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
}

export interface MetricAggregation {
  count: number;
  sum: number;
  avg: number;
  min: number;
  max: number;
  lastValue: number;
  lastTimestamp: string;
}

export interface ErrorStats {
  total: number;
  byType: Record<string, number>;
  recentErrors: ErrorLog[];
}

export type MetricType = 'counter' | 'gauge' | 'histogram';