import React from 'react';
import { MetricCardSkeleton } from '@/components/ui/MetricCardSkeleton';
import { ChartSkeleton } from '@/components/ui/ChartSkeleton';

/**
 * Next.js route-level loading UI for /metrics.
 * Shown automatically while the page component suspends.
 */
export default function MetricsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="space-y-2">
        <div className="h-7 w-32 animate-pulse rounded bg-white/5" />
        <div className="h-4 w-56 animate-pulse rounded bg-white/5" />
      </div>

      {/* KPI row — 4 metric cards */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        <ChartSkeleton height={240} />
        <ChartSkeleton height={240} />
      </div>

      {/* Full-width error rate chart */}
      <ChartSkeleton height={200} />
    </div>
  );
}
