import React from 'react';
import { motion } from 'framer-motion';

export default function NotificationToast({
  id,
  title,
  message,
  priority,
  onAcknowledge,
}: {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  onAcknowledge: (id: string) => void;
}) {
  const colorMap = {
    low: '#64748b',
    medium: '#f59e0b',
    high: '#ef4444',
  };
  const color = colorMap[priority];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        background: 'rgba(14,22,45,0.95)',
        border: `1px solid ${color}40`,
        borderLeft: `4px solid ${color}`,
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `0 4px 12px rgba(0,0,0,0.2), 0 0 8px ${color}15`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#f1f5f9' }}>{title}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{message}</div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: 'var(--font-space-mono)',
            textTransform: 'uppercase',
            color: color,
            background: `${color}15`,
            padding: '2px 6px',
            borderRadius: 4,
          }}
        >
          {priority} Priority
        </span>
        <button
          onClick={() => onAcknowledge(id)}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--muted)',
            padding: '4px 12px',
            borderRadius: 6,
            fontSize: 12,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          Acknowledge
        </button>
      </div>
    </motion.div>
  );
}
