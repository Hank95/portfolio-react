// Core Web Vitals and Performance Monitoring

interface PerformanceMetric {
  name: string;
  value: number;
  delta?: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializeWebVitals();
    this.initializeResourceTiming();
    this.initializeNavigationTiming();
    this.initializeLongTasks();
  }

  private initializeWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeMetric('largest-contentful-paint', (entry) => {
      const value = entry.startTime;
      this.recordMetric({
        name: 'LCP',
        value,
        rating: this.getRating('LCP', value),
        timestamp: Date.now(),
      });
    });

    // First Input Delay (FID)
    this.observeMetric('first-input', (entry) => {
      const value = entry.processingStart - entry.startTime;
      this.recordMetric({
        name: 'FID',
        value,
        rating: this.getRating('FID', value),
        timestamp: Date.now(),
      });
    });

    // Cumulative Layout Shift (CLS)
    this.observeMetric('layout-shift', (entry) => {
      if (!entry.hadRecentInput) {
        const value = entry.value;
        this.recordMetric({
          name: 'CLS',
          value,
          rating: this.getRating('CLS', value),
          timestamp: Date.now(),
        });
      }
    });

    // First Contentful Paint (FCP)
    this.observeMetric('paint', (entry) => {
      if (entry.name === 'first-contentful-paint') {
        const value = entry.startTime;
        this.recordMetric({
          name: 'FCP',
          value,
          rating: this.getRating('FCP', value),
          timestamp: Date.now(),
        });
      }
    });

    // Time to First Byte (TTFB)
    this.measureTTFB();
  }

  private initializeResourceTiming() {
    this.observeMetric('resource', (entry) => {
      const duration = entry.responseEnd - entry.startTime;
      
      // Track slow resources
      if (duration > 1000) {
        this.recordMetric({
          name: 'Slow Resource',
          value: duration,
          timestamp: Date.now(),
        });
      }
    });
  }

  private initializeNavigationTiming() {
    this.observeMetric('navigation', (entry) => {
      const loadTime = entry.loadEventEnd - entry.startTime;
      const domContentLoaded = entry.domContentLoadedEventEnd - entry.startTime;
      
      this.recordMetric({
        name: 'Load Time',
        value: loadTime,
        timestamp: Date.now(),
      });

      this.recordMetric({
        name: 'DOM Content Loaded',
        value: domContentLoaded,
        timestamp: Date.now(),
      });
    });
  }

  private initializeLongTasks() {
    this.observeMetric('longtask', (entry) => {
      this.recordMetric({
        name: 'Long Task',
        value: entry.duration,
        timestamp: Date.now(),
      });
    });
  }

  private observeMetric(entryType: string, callback: (entry: any) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(callback);
      });
      
      observer.observe({ type: entryType, buffered: true });
    } catch (e) {
      console.warn(`PerformanceObserver not supported for ${entryType}`);
    }
  }

  private measureTTFB() {
    // Measure Time to First Byte using Navigation Timing API
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing;
      const ttfb = timing.responseStart - timing.navigationStart;
      
      this.recordMetric({
        name: 'TTFB',
        value: ttfb,
        rating: this.getRating('TTFB', ttfb),
        timestamp: Date.now(),
      });
    }
  }

  private getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  private recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    
    // Send to analytics
    this.sendToAnalytics(metric);
    
    // Log for debugging
    if (import.meta.env.DEV) {
      console.log(`Performance: ${metric.name} = ${metric.value.toFixed(2)}ms (${metric.rating || 'n/a'})`);
    }
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_parameter_1: metric.rating,
      });
    }

    // Send to custom analytics endpoint (if you have one)
    this.sendToCustomAnalytics(metric);
  }

  private async sendToCustomAnalytics(metric: PerformanceMetric) {
    try {
      // You can replace this with your own analytics endpoint
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          timestamp: metric.timestamp,
          url: window.location.pathname,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      console.warn('Failed to send performance data to analytics:', error);
    }
  }

  // Public methods
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  public getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name);
  }

  public getAverageMetric(name: string): number {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  public measureCustomMetric(name: string, startTime?: number) {
    const start = startTime || performance.now();
    
    return {
      end: () => {
        const value = performance.now() - start;
        this.recordMetric({
          name,
          value,
          timestamp: Date.now(),
        });
        return value;
      }
    };
  }

  public disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export types
export type { PerformanceMetric };