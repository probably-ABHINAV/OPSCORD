'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { INCIDENTS, CHART_DATA } from '@/lib/mockData';

const EventFeed = dynamic(() => import('@/components/EventFeed'), { ssr: false });
const SwarmActivity = dynamic(() => import('@/components/SwarmActivity'), { ssr: false });

/* ── Recharts (client-only) ─────────────── */
const RechartsChart = dynamic(
  () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import('recharts').then((mod: any) => {
      const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } =
        mod;

      function Chart() {
        return (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={CHART_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="hour"
                tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'var(--font-space-mono)' }}
                stroke="rgba(255,255,255,0.05)"
                interval={2}
              />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} stroke="rgba(255,255,255,0.05)" />
              <Tooltip
                contentStyle={{
                  background: 'rgba(14,22,45,0.95)',
                  border: '1px solid rgba(99,139,255,0.2)',
                  borderRadius: 10,
                  fontSize: 12,
                  color: '#f1f5f9',
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#64748b' }} />
              <Line
                type="monotone"
                dataKey="events"
                name="Total Events"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#3b82f6' }}
              />
              <Line
                type="monotone"
                dataKey="incidents"
                name="Incidents"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#ef4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      }

      return Chart;
    }),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
        }}
      >
        Loading chart...
      </div>
    ),
  }
);

export default function DashboardOverview() {
  const [eventsCount, setEventsCount] = useState(1247);

  useEffect(() => {
    const iv = setInterval(() => {
      setEventsCount((c) => c + Math.floor(Math.random() * 5) + 1);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  const statCards = [
    {
      icon: '⚠️',
      number: '3',
      label: 'Total Incidents Today',
      footer: '↑ 2 from yesterday',
      footerColor: '#ef4444',
      numColor: '#ef4444',
    },
    {
      icon: '⚡',
      number: eventsCount.toLocaleString(),
      label: 'Events Ingested',
      footer: 'Last 24 hours',
      footerColor: 'var(--muted)',
      numColor: undefined,
    },
    {
      icon: '🕐',
      number: '4.2 min',
      label: 'Avg Resolution Time',
      footer: '↓ 38% vs last week',
      footerColor: '#10b981',
      numColor: '#f59e0b',
    },
    {
      icon: '🎯',
      number: '94%',
      label: 'Causality Score Accuracy',
      footer: 'Based on 47 incidents',
      footerColor: 'var(--muted)',
      numColor: '#10b981',
    },
  ];

  return (
    <div>
      {/* ── Stats Row ─────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {statCards.map((card, i) => (
          <div key={i} className="card card-hover" style={{ borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{card.icon}</div>
            <div
              className={!card.numColor ? 'gradient-text' : ''}
              style={{
                fontWeight: 800,
                fontSize: 36,
                lineHeight: 1,
                color: card.numColor,
              }}
            >
              {card.number}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6 }}>{card.label}</div>
            <div
              style={{
                fontSize: 11,
                color: card.footerColor,
                marginTop: 6,
                fontFamily: 'var(--font-space-mono)',
              }}
            >
              {card.footer}
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Grid ─────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* ── LEFT COLUMN ─────────── */}
        <div>
          {/* Incident Table */}
          <div className="card" style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
            <div
              style={{
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 18 }}>Recent Incidents</span>
              <a href="#" style={{ fontSize: 13, color: 'var(--sky)', textDecoration: 'none' }}>
                View all →
              </a>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr
                    style={{
                      background: 'var(bg)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {['#', 'Title', 'Source', 'Severity', 'Score', 'Status', 'Time'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '10px 14px',
                          textAlign: 'left',
                          fontFamily: 'var(--font-space-mono)',
                          fontSize: 11,
                          color: 'var(--muted)',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INCIDENTS.map((inc) => (
                    <tr
                      key={inc.id}
                      style={{
                        borderBottom: '1px solid rgba(99,139,255,0.06)',
                        transition: 'background 0.15s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td
                        style={{
                          padding: '10px 14px',
                          fontFamily: 'var(--font-space-mono)',
                          color: 'var(--muted)',
                          fontSize: 11,
                        }}
                      >
                        {inc.id}
                      </td>
                      <td
                        style={{
                          padding: '10px 14px',
                          maxWidth: 220,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {inc.title}
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 11,
                            fontFamily: 'var(--font-space-mono)',
                            background: inc.sourceColor + '22',
                            border: `1px solid ${inc.sourceColor}44`,
                            color: inc.sourceColor,
                            padding: '2px 8px',
                            borderRadius: 6,
                          }}
                        >
                          {inc.sourceIcon} {inc.source}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            background: inc.severityColor + '22',
                            border: `1px solid ${inc.severityColor}44`,
                            color: inc.severityColor,
                            padding: '2px 10px',
                            borderRadius: 20,
                            fontFamily: 'var(--font-space-mono)',
                          }}
                        >
                          {inc.severity}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 12 }}>
                            {inc.causalityScore}%
                          </span>
                          <div
                            style={{
                              height: 4,
                              background: 'rgba(255,255,255,0.06)',
                              borderRadius: 2,
                              width: 60,
                            }}
                          >
                            <div
                              style={{
                                height: '100%',
                                width: `${inc.causalityScore}%`,
                                background: inc.severityColor,
                                borderRadius: 2,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            background: inc.statusColor + '22',
                            border: `1px solid ${inc.statusColor}44`,
                            color: inc.statusColor,
                            padding: '2px 10px',
                            borderRadius: 6,
                            fontFamily: 'var(--font-space-mono)',
                          }}
                        >
                          {inc.status}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '10px 14px',
                          fontFamily: 'var(--font-space-mono)',
                          fontSize: 11,
                          color: 'var(--muted)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {inc.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recharts Line Chart */}
          <div className="card" style={{ borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
              Event Ingestion Over Time
            </div>
            <RechartsChart />
          </div>
        </div>

        {/* ── RIGHT COLUMN ────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Live Event Stream */}
          <div className="card" style={{ borderRadius: 12, overflow: 'hidden', flex: 1 }}>
            <div
              style={{
                padding: '12px 18px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#10b981',
                  animation: 'pulse 1.4s infinite',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Live Events</span>
            </div>
            <EventFeed maxItems={8} compact />
          </div>

          {/* AI Swarm Activity */}
          <div
            className="card"
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(5,10,20,0.4)',
            }}
          >
            <div
              style={{
                padding: '12px 18px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#7c3aed',
                  animation: 'pulseGlow 2s infinite',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontWeight: 700, fontSize: 13, color: '#a78bfa' }}>
                AI Swarm Activity
              </span>
            </div>
            <SwarmActivity />
          </div>

          {/* Causality Breakdown */}
          <div className="card" style={{ borderRadius: 12, padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                padding: '16px 20px',
                background: 'rgba(59,130,246,0.05)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 16 }}>🎯</span> Causality Chain ·{' '}
                <span style={{ fontFamily: 'var(--font-space-mono)', color: 'var(--sky)' }}>
                  INC-001
                </span>
              </div>
            </div>

            <div style={{ padding: 20 }}>
              {/* Root Cause */}
              <div
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: 12,
                  padding: '16px',
                  textAlign: 'center',
                  position: 'relative',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -8,
                    left: 16,
                    background: '#050a14',
                    color: '#fca5a5',
                    fontSize: 9,
                    fontFamily: 'var(--font-space-mono)',
                    padding: '2px 6px',
                    borderRadius: 4,
                    letterSpacing: '0.1em',
                    border: '1px solid rgba(239,68,68,0.3)',
                  }}
                >
                  ROOT CAUSE
                </div>
                <div style={{ fontWeight: 800, color: '#ef4444', fontSize: 15, marginBottom: 2 }}>
                  K8s pod OOMKilled
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-space-mono)',
                  }}
                >
                  87% CONFIDENCE SCORE
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', margin: '-4px 0' }}>
                <div
                  style={{
                    width: 1,
                    height: 20,
                    background: 'linear-gradient(to bottom, rgba(239,68,68,0.5), transparent)',
                  }}
                />
              </div>

              {/* Contributing */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    background: 'rgba(59,130,246,0.08)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: 10,
                    padding: '12px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -8,
                      left: 12,
                      background: '#050a14',
                      color: 'var(--sky)',
                      fontSize: 8,
                      fontFamily: 'var(--font-space-mono)',
                      padding: '1px 5px',
                      borderRadius: 4,
                    }}
                  >
                    PRIMARY REGRESSION
                  </div>
                  <div style={{ fontWeight: 700, color: '#60a5fa', fontSize: 13 }}>
                    Deploy #2847
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>64% correlation</div>
                </div>
                <div
                  style={{
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    borderRadius: 10,
                    padding: '12px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -8,
                      left: 12,
                      background: '#050a14',
                      color: '#fcd34d',
                      fontSize: 8,
                      fontFamily: 'var(--font-space-mono)',
                      padding: '1px 5px',
                      borderRadius: 4,
                    }}
                  >
                    RESOURCE LIMIT
                  </div>
                  <div style={{ fontWeight: 700, color: '#fcd34d', fontSize: 13 }}>
                    Memory limit cap
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>42% correlation</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', margin: '-4px 0' }}>
                <div
                  style={{
                    width: 1,
                    height: 20,
                    background: 'linear-gradient(to bottom, var(--border), transparent)',
                  }}
                />
              </div>

              {/* Impact */}
              <div
                style={{
                  background: 'rgba(124,58,237,0.08)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: 10,
                  padding: '16px',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -8,
                    left: 16,
                    background: '#050a14',
                    color: '#c4b5fd',
                    fontSize: 9,
                    fontFamily: 'var(--font-space-mono)',
                    padding: '2px 6px',
                    borderRadius: 4,
                    letterSpacing: '0.1em',
                    border: '1px solid rgba(124,58,237,0.3)',
                  }}
                >
                  DOWNSTREAM IMPACT
                </div>
                <div style={{ fontWeight: 800, color: '#a78bfa', fontSize: 15, marginBottom: 2 }}>
                  API degradation
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-space-mono)',
                  }}
                >
                  P99: 320ms → 4.2s ALERT
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.02)',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-space-mono)',
                }}
              >
                AGENT CONFIDENCE: 94.2%
              </span>
              <button
                style={{
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  color: 'var(--sky)',
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                RESCAN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
