'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

interface ChartSkeletonProps {
  /** Height of the chart area in pixels (default: 240) */
  height?: number;
}

/**
 * Skeleton placeholder for chart panels (e.g. Metrics page).
 * Renders a label row + a blank chart area of configurable height.
 */
export function ChartSkeleton({ height = 240 }: ChartSkeletonProps) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      {/* Chart label */}
      <Skeleton className="h-3 w-32 mb-4" />
      {/* Chart area */}
      <Skeleton className="w-full rounded-md" style={{ height }} />
    </div>
  );
}
