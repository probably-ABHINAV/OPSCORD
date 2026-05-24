'use client';

import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  unit?: string;
  tooltip?: string;
}

export default function MetricCard({
  label,
  value,
  change,
  changeType = 'neutral',
  unit,
  tooltip,
}: MetricCardProps) {
  const changeColor =
    changeType === 'up' ? 'text-red' : changeType === 'down' ? 'text-green' : 'text-muted';
  const changeArrow = changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '';

  return (
    <div className="relative bg-bg-card border border-border rounded-lg p-5 hover:border-border-hover transition-colors group">
      <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold tracking-tight tabular-nums">{value}</span>
        {unit && <span className="text-sm font-mono text-muted mb-1">{unit}</span>}
      </div>
      {change && (
        <p className={`text-xs font-mono mt-2 ${changeColor}`}>
          {changeArrow} {change}
        </p>
      )}
      {tooltip && (
        <div className="absolute left-1/2 top-full z-20 mt-2 hidden -translate-x-1/2 rounded-md border border-border bg-black px-3 py-2 text-xs text-white shadow-lg group-hover:block">
          {tooltip}
        </div>
      )}
    </div>
  );
}
