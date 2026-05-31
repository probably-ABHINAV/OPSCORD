'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

/**
 * Skeleton placeholder for a single infrastructure service card.
 * Mirrors the header (dot + name + status badge) and stats (CPU bar,
 * Memory bar, pods / region footer) of the real card.
 */
export function InfraCardSkeleton() {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-2.5 h-2.5 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-5 w-16 rounded" />
      </div>

      {/* CPU row */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>

        {/* Memory row */}
        <div>
          <div className="flex justify-between mb-1">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-2 border-t border-border">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}
