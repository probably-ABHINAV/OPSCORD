import React from 'react';
import { InfraCardSkeleton } from '@/components/ui/InfraCardSkeleton';

/**
 * Next.js route-level loading UI for /infrastructure.
 * Mirrors the status pills + 2-column service card grid.
 */
export default function InfrastructureLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="space-y-2">
        <div className="h-7 w-40 animate-pulse rounded bg-white/5" />
        <div className="h-4 w-64 animate-pulse rounded bg-white/5" />
      </div>
      {/* Status summary pills */}
      <div className="flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 animate-pulse rounded-md bg-white/5"
          />
        ))}
      </div>
      {/* 2-column service grid — 8 cards matching mock data length */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <InfraCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
