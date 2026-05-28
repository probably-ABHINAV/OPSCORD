'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatusPulse, StatusType } from './StatusPulse';

export interface ServiceHealthProps {
  id: string;
  name: string;
  region: string;
  status: StatusType;
  cpu: number;
  memory: number;
  latency: number;
}

export const ServiceHealthCard: React.FC<{ service: ServiceHealthProps }> = ({ service }) => {
  const isDown = service.status === 'down';
  const isDegraded = service.status === 'degraded';

  const borderColor = isDown
    ? 'rgba(239, 68, 68, 0.4)'
    : isDegraded
      ? 'rgba(245, 158, 11, 0.4)'
      : 'rgba(255, 255, 255, 0.05)';
  const bgColor = isDown
    ? 'rgba(239, 68, 68, 0.05)'
    : isDegraded
      ? 'rgba(245, 158, 11, 0.05)'
      : 'rgba(15, 23, 42, 0.4)';

  return (
    <motion.div
      layout
      className="card"
      style={{
        borderRadius: 10,
        padding: 16,
        background: bgColor,
        border: `1px solid ${borderColor}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#f8fafc' }}>{service.name}</div>
          <div
            style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-space-mono)' }}
          >
            {service.region}
          </div>
        </div>
        <StatusPulse status={service.status} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '6px 8px', borderRadius: 6 }}>
          <div
            style={{
              fontSize: 9,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              marginBottom: 2,
            }}
          >
            CPU
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-space-mono)',
              color: service.cpu > 80 ? '#ef4444' : '#e2e8f0',
            }}
          >
            {service.cpu}%
          </div>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '6px 8px', borderRadius: 6 }}>
          <div
            style={{
              fontSize: 9,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              marginBottom: 2,
            }}
          >
            RAM
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-space-mono)',
              color: service.memory > 85 ? '#f59e0b' : '#e2e8f0',
            }}
          >
            {service.memory}%
          </div>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '6px 8px', borderRadius: 6 }}>
          <div
            style={{
              fontSize: 9,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              marginBottom: 2,
            }}
          >
            PING
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-space-mono)',
              color: service.latency > 500 ? '#ef4444' : '#e2e8f0',
            }}
          >
            {service.latency}ms
          </div>
        </div>
      </div>
    </motion.div>
  );
};
