import React from 'react';

export default function DowntimeTracker({
  title,
  uptimePercentage,
  downtimeMinutes,
}: {
  title: string;
  uptimePercentage: number;
  downtimeMinutes: number;
}) {
  const isHealthy = uptimePercentage >= 99.9;
  const color = isHealthy ? '#10b981' : '#f59e0b';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.05)',
        marginBottom: 8,
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{title}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
          {downtimeMinutes}m downtime (30d)
        </div>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 14,
          fontWeight: 800,
          color: color,
          background: `${color}15`,
          padding: '4px 10px',
          borderRadius: 6,
          border: `1px solid ${color}30`,
        }}
      >
        {uptimePercentage.toFixed(2)}%
      </div>
    </div>
  );
}
