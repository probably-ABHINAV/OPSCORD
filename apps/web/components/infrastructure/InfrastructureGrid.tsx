'use client';

import React, { useState, useEffect } from 'react';
import { ServiceHealthCard, ServiceHealthProps } from './ServiceHealthCard';

const initialServices: ServiceHealthProps[] = [
  {
    id: 'api-gateway',
    name: 'API Gateway',
    region: 'us-east-1',
    status: 'healthy',
    cpu: 42,
    memory: 56,
    latency: 120,
  },
  {
    id: 'auth-service',
    name: 'Auth Service',
    region: 'us-east-1',
    status: 'healthy',
    cpu: 15,
    memory: 34,
    latency: 45,
  },
  {
    id: 'ingestion-worker',
    name: 'Ingestion Worker',
    region: 'eu-west-1',
    status: 'healthy',
    cpu: 68,
    memory: 72,
    latency: 210,
  },
  {
    id: 'db-primary',
    name: 'Primary Database',
    region: 'us-east-1',
    status: 'degraded',
    cpu: 88,
    memory: 92,
    latency: 450,
  },
  {
    id: 'cache-redis',
    name: 'Redis Cache',
    region: 'us-east-1',
    status: 'healthy',
    cpu: 22,
    memory: 45,
    latency: 12,
  },
  {
    id: 'ai-engine',
    name: 'AI Engine',
    region: 'us-west-2',
    status: 'healthy',
    cpu: 54,
    memory: 80,
    latency: 850,
  },
];

export const InfrastructureGrid: React.FC = () => {
  const [services, setServices] = useState<ServiceHealthProps[]>(initialServices);

  // Simulate realtime metric fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((service) => {
          // Randomly fluctuate metrics
          const newCpu = Math.max(5, Math.min(100, service.cpu + (Math.random() * 10 - 5)));
          const newMem = Math.max(10, Math.min(100, service.memory + (Math.random() * 4 - 2)));
          const newLat = Math.max(5, service.latency + (Math.random() * 40 - 20));

          let newStatus = service.status;
          if (newCpu > 95 || newLat > 1000) newStatus = 'down';
          else if (newCpu > 85 || newLat > 500) newStatus = 'degraded';
          else newStatus = 'healthy';

          return {
            ...service,
            cpu: Math.round(newCpu),
            memory: Math.round(newMem),
            latency: Math.round(newLat),
            status: newStatus,
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="card"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 16 }}>Infrastructure Health</span>
        <div
          style={{
            display: 'flex',
            gap: 12,
            fontSize: 11,
            fontFamily: 'var(--font-space-mono)',
            color: 'var(--muted)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />{' '}
            Healthy
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />{' '}
            Degraded
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />{' '}
            Down
          </span>
        </div>
      </div>

      <div
        style={{
          padding: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
          overflowY: 'auto',
        }}
      >
        {services.map((service) => (
          <ServiceHealthCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
