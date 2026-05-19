'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
}

/**
 * Base skeleton block with pulse animation.
 * Use this to build more specific skeleton components.
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded bg-white/5 ${className}`} />;
}
