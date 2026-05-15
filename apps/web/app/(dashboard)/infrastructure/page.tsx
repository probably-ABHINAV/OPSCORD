'use client';

import React, { useState, useEffect } from 'react';
import InfrastructureLoading from './loading';

interface ServiceNode {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  cpu: number;
  memory: number;
  pods: number;
  region: string;
}

const SERVICES: ServiceNode[] = [
  { name: 'api-gateway', status: 'healthy', cpu: 34, memory: 62, pods: 4, region: 'us-east-1' },
  {
    name: 'ingestion-worker',
    status: 'healthy',
    cpu: 71,
    memory: 48,
    pods: 8,
    region: 'us-east-1',
  },
  {
    name: 'ai-causality-engine',
    status: 'degraded',
    cpu: 89,
    memory: 87,
    pods: 2,
    region: 'us-east-1',
  },
  {
    name: 'postgres-primary',
    status: 'healthy',
    cpu: 42,
    memory: 76,
    pods: 1,
    region: 'us-east-1',
  },
  { name: 'redis-cluster', status: 'healthy', cpu: 18, memory: 55, pods: 3, region: 'us-east-1' },
  {
    name: 'websocket-gateway',
    status: 'healthy',
    cpu: 12,
    memory: 31,
    pods: 2,
    region: 'us-east-1',
  },
  {
    name: 'notification-service',
    status: 'healthy',
    cpu: 8,
    memory: 22,
    pods: 1,
    region: 'us-west-2',
  },
  { name: 'scheduler-cron', status: 'down', cpu: 0, memory: 0, pods: 0, region: 'us-west-2' },
];

const statusConfig = {
  healthy: { color: '#17c964', label: 'Healthy', dot: 'bg-green' },
  degraded: { color: '#F5A623', label: 'Degraded', dot: 'bg-amber' },
  down: { color: '#F31260', label: 'Down', dot: 'bg-red' },
};

function UsageBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-1.5 bg-bg-surface rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${value}%`,
          background: value > 80 ? '#F31260' : value > 60 ? '#F5A623' : color,
        }}
      />
    </div>
  );
}

export default function InfrastructurePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <InfrastructureLoading />;

  const healthyCount = SERVICES.filter((s) => s.status === 'healthy').length;
  const degradedCount = SERVICES.filter((s) => s.status === 'degraded').length;
  const downCount = SERVICES.filter((s) => s.status === 'down').length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Infrastructure</h1>
        <p className="text-muted text-sm font-mono mt-1">System health and resource utilization</p>
      </div>

      {/* Status Summary */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-green/5 border border-green/20 rounded-md">
          <span className="w-2 h-2 rounded-full bg-green" />
          <span className="font-mono text-xs text-green">{healthyCount} Healthy</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber/5 border border-amber/20 rounded-md">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <span className="font-mono text-xs text-amber">{degradedCount} Degraded</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red/5 border border-red/20 rounded-md">
          <span className="w-2 h-2 rounded-full bg-red" />
          <span className="font-mono text-xs text-red">{downCount} Down</span>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-2 gap-4">
        {SERVICES.map((service) => {
          const config = statusConfig[service.status];
          return (
            <div
              key={service.name}
              className="bg-bg-card border border-border rounded-lg p-5 hover:border-border-hover transition-colors group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                  <span className="font-mono text-sm font-medium group-hover:text-blue transition-colors">
                    {service.name}
                  </span>
                </div>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider"
                  style={{
                    color: config.color,
                    background: config.color + '15',
                    border: `1px solid ${config.color}30`,
                  }}
                >
                  {config.label}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-muted mb-1">
                    <span>CPU</span>
                    <span>{service.cpu}%</span>
                  </div>
                  <UsageBar value={service.cpu} color="#0070F3" />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-muted mb-1">
                    <span>Memory</span>
                    <span>{service.memory}%</span>
                  </div>
                  <UsageBar value={service.memory} color="#50E3C2" />
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-mono text-[11px] text-muted">
                    Pods: <span className="text-text">{service.pods}</span>
                  </span>
                  <span className="font-mono text-[11px] text-muted">{service.region}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
