'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AGENTS = [
  { id: 'security', name: 'Security Auditor', color: '#ef4444', icon: '🛡️' },
  { id: 'performance', name: 'Performance Engineer', color: '#f59e0b', icon: '⚡' },
  { id: 'architecture', name: 'Architecture Lead', color: '#8b5cf6', icon: '🏛️' },
];

const LOGS = [
  { agent: 'security', msg: 'Scanning K8s pod manifests for OOM history...', status: 'running' },
  {
    agent: 'performance',
    msg: 'Analyzing p99 latency spike in api-gateway...',
    status: 'complete',
  },
  { agent: 'architecture', msg: 'Tracing service graph for dependency loop...', status: 'running' },
  { agent: 'security', msg: 'CVE-2024-1234 check completed on 4 containers.', status: 'complete' },
  {
    agent: 'performance',
    msg: 'Heap dump analysis: memory leak in auth-srv detected.',
    status: 'complete',
  },
  {
    agent: 'architecture',
    msg: 'Cross-referencing deploy #2847 with incident start.',
    status: 'complete',
  },
];

export default function SwarmActivity() {
  const [activeLogs, setActiveLogs] = useState<{ agent: string; msg: string; status: string }[]>(
    []
  );

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setActiveLogs((prev) => {
        const next = LOGS[i % LOGS.length];
        i++;
        return [next, ...prev].slice(0, 5);
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 20px' }}>
      <AnimatePresence>
        {activeLogs.map((log, idx) => {
          const agent = AGENTS.find((a) => a.id === log.agent);
          return (
            <motion.div
              key={idx + log.msg}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${agent?.color}22`,
                borderRadius: 10,
                padding: '10px 14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12 }}>{agent?.icon}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: agent?.color,
                    fontFamily: 'var(--font-space-mono)',
                    letterSpacing: '0.05em',
                  }}
                >
                  [{agent?.name.toUpperCase()}]
                </span>
                <span
                  style={{
                    marginLeft: 'auto',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: log.status === 'running' ? 'var(--sky)' : 'var(--muted)',
                    animation: log.status === 'running' ? 'pulse 1.4s infinite' : 'none',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-space-mono)',
                  lineHeight: 1.4,
                }}
              >
                {log.msg}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {activeLogs.length === 0 && (
        <div
          style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}
        >
          Initializing Swarm Agents...
        </div>
      )}
    </div>
  );
}
