'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RealtimeCounter } from './RealtimeCounter';

export interface MetricTrendCardProps {
  id: string;
  label: string;
  value: number;
  format?: (val: number) => string;
  trendValue: number;
  trendLabel: string;
  icon: React.ReactNode;
  status: 'positive' | 'negative' | 'neutral';
}

export const MetricTrendCard: React.FC<MetricTrendCardProps> = ({
  label,
  value,
  format,
  trendValue,
  trendLabel,
  icon,
  status,
}) => {
  const isPositive = status === 'positive';
  const isNegative = status === 'negative';

  const statusColor = isPositive ? '#10b981' : isNegative ? '#ef4444' : '#64748b';
  const statusBg = isPositive
    ? 'rgba(16, 185, 129, 0.1)'
    : isNegative
      ? 'rgba(239, 68, 68, 0.1)'
      : 'rgba(100, 116, 139, 0.1)';

  return (
    <motion.div
      className="card card-hover"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        borderRadius: 12,
        padding: 20,
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Glow */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 60,
          height: 60,
          background: statusBg,
          filter: 'blur(30px)',
          borderRadius: '50%',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 20, color: 'var(--sky)' }}>{icon}</div>
        <div
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-space-mono)',
            color: statusColor,
            background: statusBg,
            padding: '2px 8px',
            borderRadius: 12,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {trendValue > 0 ? '↑' : trendValue < 0 ? '↓' : '→'} {Math.abs(trendValue)}%
        </div>
      </div>

      <div
        style={{ fontWeight: 800, fontSize: 36, lineHeight: 1, color: '#f8fafc', marginBottom: 8 }}
      >
        <RealtimeCounter value={value} format={format} />
      </div>

      <div style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 500 }}>{label}</div>
      <div
        style={{
          fontSize: 11,
          color: '#64748b',
          marginTop: 4,
          fontFamily: 'var(--font-space-mono)',
        }}
      >
        {trendLabel}
      </div>
    </motion.div>
  );
};
