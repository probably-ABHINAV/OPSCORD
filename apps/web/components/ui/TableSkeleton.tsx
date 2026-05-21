'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

interface TableSkeletonProps {
  /** Number of placeholder rows to render (default: 6) */
  rows?: number;
  /** Number of columns to render (default: 7, matching Incidents table) */
  cols?: number;
}

/**
 * Skeleton placeholder for table views (e.g. Incidents page).
 * Renders a header row + configurable body rows.
 */
export function TableSkeleton({ rows = 6, cols = 7 }: TableSkeletonProps) {
  return (
    <div className="w-full border border-border bg-bg-card rounded-lg overflow-hidden flex flex-col">
      {/* thead */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-bg-surface">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>

      {/* tbody */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0"
        >
          {Array.from({ length: cols }).map((_, colIdx) => (
            <Skeleton
              key={colIdx}
              // Make first column narrower (ID), last column narrower (time)
              className={`h-4 ${colIdx === 0 || colIdx === cols - 1 ? 'w-12' : 'flex-1'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
