'use client';

import React, { useState, useEffect } from 'react';
import { MetricTrendCard, MetricTrendCardProps } from './MetricTrendCard';
import { useReplayStore } from '../../store/useReplayStore';

export const MetricsCommandCenter: React.FC = () => {
  const { timeOffset } = useReplayStore();
  const [liveEventAdd, setLiveEventAdd] = useState(0);
  const [liveCausalityVariance, setLiveCausalityVariance] = useState(0);

  // Simulate slight live fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEventAdd((prev) => prev + Math.floor(Math.random() * 8));
      setLiveCausalityVariance(Math.random() * 0.4 - 0.2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Determine values based on timeOffset (Incident occurred between -30m and Live)
  const isPreIncident = timeOffset < -30;

  const incidentsVal = isPreIncident ? 0 : 3;
  const eventsVal = Math.round(12470 + timeOffset * 5.2 + liveEventAdd);
  const mttrVal = isPreIncident ? 0 : 4.2;
  const causalityVal = isPreIncident
    ? Math.min(99.9, 99.4 + liveCausalityVariance)
    : Math.min(99.9, Math.max(85, 94.2 + liveCausalityVariance));

  const metrics: MetricTrendCardProps[] = [
    {
      id: 'incidents',
      label: 'Active Incidents',
      value: incidentsVal,
      trendValue: isPreIncident ? 0 : 12,
      trendLabel: isPreIncident ? 'no incidents' : 'vs yesterday',
      icon: '⚠️',
      status: incidentsVal === 0 ? 'positive' : 'negative',
    },
    {
      id: 'events',
      label: 'Events Ingested',
      value: eventsVal,
      format: (v) => Math.round(v).toLocaleString(),
      trendValue: 8.4,
      trendLabel: 'last 24h log',
      icon: '⚡',
      status: 'positive',
    },
    {
      id: 'mttr',
      label: 'MTTR',
      value: mttrVal,
      format: (v) => (mttrVal === 0 ? '0.0m' : `${v.toFixed(1)}m`),
      trendValue: isPreIncident ? 0 : -38,
      trendLabel: isPreIncident ? 'no telemetry' : 'vs last week',
      icon: '🕐',
      status: isPreIncident ? 'neutral' : 'positive',
    },
    {
      id: 'causality',
      label: 'Causality Confidence',
      value: causalityVal,
      format: (v) => `${v.toFixed(1)}%`,
      trendValue: isPreIncident ? 0.4 : 1.2,
      trendLabel: isPreIncident ? 'stable baseline' : 'based on 47 models',
      icon: '🎯',
      status: isPreIncident ? 'positive' : 'neutral',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
      {/* Historical Playback warning banner */}
      {timeOffset !== 0 && (
        <div
          style={{
            background: 'rgba(251, 191, 36, 0.08)',
            border: '1px solid rgba(251, 191, 36, 0.25)',
            borderRadius: 8,
            padding: '6px 12px',
            fontSize: 11,
            color: '#fbbf24',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontWeight: 700,
            fontFamily: 'var(--font-space-mono)',
          }}
        >
          <span>⏳</span> HISTORICAL DATA REPLAY ENGINE ACTIVE (SCROLLING MOCK DATA FOR
          VERIFICATION)
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}
      >
        {metrics.map((metric) => (
          <MetricTrendCard key={metric.id} {...metric} />
        ))}
      </div>
    </div>
  );
};
