import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceNode({
  x,
  y,
  name,
  status = 'healthy',
}: {
  x: number;
  y: number;
  name: string;
  status?: 'healthy' | 'warning' | 'critical';
}) {
  const colorMap = {
    healthy: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444',
  };
  const color = colorMap[status];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        background: 'rgba(14,22,45,0.95)',
        border: `1px solid ${color}66`,
        borderRadius: 8,
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: `0 0 16px ${color}22`,
        zIndex: 10,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          marginBottom: 4,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
      <div style={{ fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{name}</div>
    </motion.div>
  );
}
