import React from 'react';

export type StatusType = 'healthy' | 'degraded' | 'down';

export const StatusPulse: React.FC<{ status: StatusType }> = ({ status }) => {
  const config = {
    healthy: { color: '#10b981', anim: 'pulse 2s infinite' },
    degraded: { color: '#f59e0b', anim: 'pulse 1s infinite' },
    down: { color: '#ef4444', anim: 'pulse 0.5s infinite' },
  }[status];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: config.color,
          animation: config.anim,
          display: 'inline-block',
          boxShadow: `0 0 8px ${config.color}`,
        }}
      />
      <span
        style={{
          color: config.color,
          fontSize: 11,
          textTransform: 'uppercase',
          fontWeight: 700,
          fontFamily: 'var(--font-space-mono)',
          letterSpacing: '0.05em',
        }}
      >
        {status}
      </span>
    </div>
  );
};
