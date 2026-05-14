'use client';

import React from 'react';

interface TimelineEvent {
  id: string;
  time: string;
  source: string;
  sourceIcon: string;
  sourceColor: string;
  message: string;
  type: 'trigger' | 'propagation' | 'resolution';
}

const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: 'evt_1',
    time: '14:32:08',
    source: 'GitHub',
    sourceIcon: '⬡',
    sourceColor: '#f0883e',
    message: 'PR #142 merged: feat/causality-engine-v2',
    type: 'trigger',
  },
  {
    id: 'evt_2',
    time: '14:32:44',
    source: 'CircleCI',
    sourceIcon: '◎',
    sourceColor: '#00D4AA',
    message: 'Pipeline #2847 triggered → building sha:8a3f2c',
    type: 'propagation',
  },
  {
    id: 'evt_3',
    time: '14:35:56',
    source: 'CircleCI',
    sourceIcon: '◎',
    sourceColor: '#00D4AA',
    message: 'Deploy #2847 succeeded → pushed to production',
    type: 'propagation',
  },
  {
    id: 'evt_4',
    time: '14:36:12',
    source: 'K8s',
    sourceIcon: '⎈',
    sourceColor: '#326CE5',
    message: 'Rolling update started: api-deployment (0/4 ready)',
    type: 'propagation',
  },
  {
    id: 'evt_5',
    time: '14:38:41',
    source: 'Datadog',
    sourceIcon: '◈',
    sourceColor: '#a78bfa',
    message: 'Alert: p99 latency spike 320ms → 4.2s',
    type: 'trigger',
  },
  {
    id: 'evt_6',
    time: '14:39:03',
    source: 'K8s',
    sourceIcon: '⎈',
    sourceColor: '#326CE5',
    message: 'Pod api-7f8b OOMKilled (512Mi limit exceeded)',
    type: 'trigger',
  },
  {
    id: 'evt_7',
    time: '14:39:18',
    source: 'Redis',
    sourceIcon: '◆',
    sourceColor: '#DC382D',
    message: 'Cache miss rate spiked: 12% → 94%',
    type: 'propagation',
  },
  {
    id: 'evt_8',
    time: '14:42:00',
    source: 'K8s',
    sourceIcon: '⎈',
    sourceColor: '#326CE5',
    message: 'HPA scaled api-deployment: 4 → 8 replicas',
    type: 'resolution',
  },
];

const typeColors: Record<TimelineEvent['type'], string> = {
  trigger: '#F31260',
  propagation: '#F5A623',
  resolution: '#17c964',
};

export default function AlertTimeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-[19px] top-2 bottom-2 w-px"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />

      <div className="space-y-0">
        {MOCK_TIMELINE.map((event, i) => (
          <div key={event.id} className="relative flex items-start gap-4 group py-3">
            {/* Dot on the timeline */}
            <div className="relative z-10 shrink-0 mt-1">
              <div
                className="w-[10px] h-[10px] rounded-full border-2"
                style={{
                  borderColor: typeColors[event.type],
                  background: i === 0 ? typeColors[event.type] : 'transparent',
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[11px] text-muted tabular-nums">{event.time}</span>
                <span className="text-xs" style={{ color: event.sourceColor }}>
                  {event.sourceIcon}
                </span>
                <span
                  className="font-mono text-[11px] font-medium"
                  style={{ color: event.sourceColor }}
                >
                  {event.source}
                </span>
                <span
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider"
                  style={{
                    color: typeColors[event.type],
                    background: typeColors[event.type] + '15',
                    border: `1px solid ${typeColors[event.type]}30`,
                  }}
                >
                  {event.type}
                </span>
              </div>
              <p className="text-sm text-text/80 group-hover:text-text transition-colors truncate">
                {event.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
