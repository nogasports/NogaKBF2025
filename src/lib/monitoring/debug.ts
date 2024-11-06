import { performance, PerformanceObserver } from 'perf_hooks';

export class DebugMonitor {
  private static instance: DebugMonitor;
  private performanceMarks: Map<string, number> = new Map();
  private memorySnapshots: any[] = [];
  private readonly MAX_SNAPSHOTS = 50;

  private constructor() {
    this.setupPerformanceObserver();
    this.startMemoryMonitoring();
  }

  static getInstance(): DebugMonitor {
    if (!DebugMonitor.instance) {
      DebugMonitor.instance = new DebugMonitor();
    }
    return DebugMonitor.instance;
  }

  private setupPerformanceObserver() {
    const obs = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.debug(`Performance Entry: ${entry.name} - Duration: ${entry.duration}ms`);
      });
    });
    
    obs.observe({ entryTypes: ['measure'] });
  }

  private startMemoryMonitoring() {
    setInterval(() => {
      if (window.performance && (performance as any).memory) {
        const memory = (performance as any).memory;
        this.memorySnapshots.push({
          timestamp: Date.now(),
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
        });

        if (this.memorySnapshots.length > this.MAX_SNAPSHOTS) {
          this.memorySnapshots.shift();
        }

        // Check for potential memory leaks
        this.detectMemoryLeaks();
      }
    }, 30000); // Every 30 seconds
  }

  private detectMemoryLeaks() {
    if (this.memorySnapshots.length < 2) return;

    const latest = this.memorySnapshots[this.memorySnapshots.length - 1];
    const previous = this.memorySnapshots[this.memorySnapshots.length - 2];

    const growthRate = (latest.usedJSHeapSize - previous.usedJSHeapSize) / previous.usedJSHeapSize;

    if (growthRate > 0.1) { // 10% growth threshold
      console.warn('Potential memory leak detected:', {
        growthRate: `${(growthRate * 100).toFixed(2)}%`,
        previousUsage: `${(previous.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        currentUsage: `${(latest.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      });
    }
  }

  startPerfMeasure(markName: string) {
    const startTime = performance.now();
    this.performanceMarks.set(markName, startTime);
  }

  endPerfMeasure(markName: string) {
    const startTime = this.performanceMarks.get(markName);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.performanceMarks.delete(markName);
      
      console.debug(`Performance measurement '${markName}': ${duration.toFixed(2)}ms`);
      
      if (duration > 100) { // Log slow operations
        console.warn(`Slow operation detected: ${markName} took ${duration.toFixed(2)}ms`);
      }
    }
  }

  logRenderInfo(componentName: string, props: any, renderTime: number) {
    if (renderTime > 16) { // 60fps threshold
      console.warn(`Slow render detected in ${componentName}:`, {
        renderTime: `${renderTime.toFixed(2)}ms`,
        props
      });
    }
  }

  getMemoryStats() {
    if (this.memorySnapshots.length === 0) return null;
    
    const latest = this.memorySnapshots[this.memorySnapshots.length - 1];
    return {
      usedMemory: `${(latest.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      totalMemory: `${(latest.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      snapshots: this.memorySnapshots
    };
  }
}

export const debugMonitor = DebugMonitor.getInstance();