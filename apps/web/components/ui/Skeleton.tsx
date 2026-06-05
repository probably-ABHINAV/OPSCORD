'use client';

import React from 'react';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Base skeleton block with pulse animation.
 * Use this to build more specific skeleton components.
 */
export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return <div className={`animate-pulse rounded bg-white/5 ${className}`} {...props} />;
}
