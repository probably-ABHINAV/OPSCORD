import React from 'react';
import { motion } from 'framer-motion';

export default function ConnectionFlow({
  x1,
  y1,
  x2,
  y2,
  status = 'healthy',
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  status?: 'healthy' | 'warning' | 'critical';
}) {
  const colorMap = {
    healthy: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444',
  };
  const color = colorMap[status];

  // Draw a curved line between the two nodes
  const path = `M ${x1} ${y1} C ${x1 + (x2 - x1) / 2} ${y1}, ${x1 + (x2 - x1) / 2} ${y2}, ${x2} ${y2}`;

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <path d={path} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={2} />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray="4 8"
        initial={{ strokeDashoffset: 100 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}
