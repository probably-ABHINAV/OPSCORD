'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

/**
 * Skeleton placeholder for MetricCard.
 * Mirrors the label / value / change layout of the real component.
 */
export function MetricCardSkeleton() {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      {/* label */}
      <Skeleton className="h-3 w-24 mb-3" />
      {/* value + unit */}
      <div className="flex items-end gap-2 mb-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-8 mb-1" />
      </div>
      {/* change text */}
      <Skeleton className="h-3 w-32 mt-2" />
    </div>
  );
}
