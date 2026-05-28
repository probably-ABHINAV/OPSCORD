import React from 'react';

export default function OperatorStatusBoard({
  operators,
}: {
  operators: Array<{ name: string; status: 'online' | 'busy' | 'offline'; role: string }>;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          fontSize: 11,
          color: 'var(--muted)',
          fontFamily: 'var(--font-space-mono)',
          marginBottom: 8,
        }}
      >
        ACTIVE OPERATORS
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {operators.map((op, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.03)',
              padding: '4px 8px',
              borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background:
                  op.status === 'online' ? '#10b981' : op.status === 'busy' ? '#f59e0b' : '#64748b',
              }}
            />
            <span style={{ fontSize: 12, fontWeight: 600 }}>{op.name}</span>
            <span style={{ fontSize: 10, color: 'var(--muted)' }}>({op.role})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
