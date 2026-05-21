'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

interface SidebarSkeletonProps {
  /** Number of timeline event rows to render (default: 6) */
  rows?: number;
}

/**
 * Skeleton placeholder for the right-hand sidebar / timeline panel
 * used on the Incidents page.
 */
export function SidebarSkeleton({ rows = 6 }: SidebarSkeletonProps) {
  return (
    <div className="w-80 shrink-0 border border-border bg-bg-card rounded-lg overflow-hidden flex flex-col">
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-border bg-bg-surface">
        <Skeleton className="h-3 w-24" />
      </div>

      {/* Timeline rows */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-3 items-start">
            {/* dot */}
            <Skeleton className="w-2 h-2 rounded-full mt-1.5 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
