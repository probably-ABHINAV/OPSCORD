import React from 'react';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { SidebarSkeleton } from '@/components/ui/SidebarSkeleton';

/**
 * Next.js route-level loading UI for /incidents.
 * Mirrors the two-column layout: table on the left, timeline on the right.
 */
export default function IncidentsLoading() {
  return (
    <div className="flex flex-col h-full gap-6">
      {/* Page header */}
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="h-7 w-28 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-40 animate-pulse rounded bg-white/5" />
        </div>
        {/* Action buttons */}
        <div className="flex gap-3">
          <div className="h-8 w-20 animate-pulse rounded-md bg-white/5" />
          <div className="h-8 w-32 animate-pulse rounded-md bg-white/5" />
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex gap-6 flex-1 min-h-0">
        <div className="flex-1 min-w-0">
          <TableSkeleton rows={8} cols={7} />
        </div>
        <SidebarSkeleton rows={7} />
      </div>
    </div>
  );
}
