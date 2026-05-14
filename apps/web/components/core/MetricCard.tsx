'use client';

import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  unit?: string;
}

export default function MetricCard({
  label,
  value,
  change,
  changeType = 'neutral',
  unit,
}: MetricCardProps) {
  const changeColor =
    changeType === 'up' ? 'text-red' : changeType === 'down' ? 'text-green' : 'text-muted';
  const changeArrow = changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '';

  return (
    <div className="bg-bg-card border border-border rounded-lg p-5 hover:border-border-hover transition-colors group">
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
    </div>
  );
}
