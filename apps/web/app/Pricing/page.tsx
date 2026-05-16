'use client';

import React from 'react';

export default function PricingPage() {
  return (
    <main>
      <section id="pricing" style={{ padding: '60px 5vw', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p className="section-label" style={{ color: 'var(--amber)', marginBottom: 12 }}>
            {'// WHY OPSCORD'}
          </p>
          <h2
            style={{
              fontWeight: 800,
              fontSize: 'clamp(26px,4vw,46px)',
              letterSpacing: '-0.025em',
              marginBottom: 12,
            }}
          >
            Your current tools cost a fortune
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 40, lineHeight: 1.75 }}>
            And they still don&apos;t tell you the root cause.
          </p>

          <div className="card" style={{ overflow: 'auto', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {['Tool', 'Causality AI', 'Real-time', 'Unified View', 'Price/mo'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '14px 16px',
                        textAlign: 'left',
                        fontFamily: 'var(--font-space-mono)',
                        fontSize: 11,
                        color: 'var(--muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        fontWeight: 600,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { tool: 'PagerDuty', ai: '✗', rt: '✓', uv: 'partial', price: '$299' },
                  { tool: 'Datadog APM', ai: '✗', rt: '✓', uv: '✗', price: '$420' },
                  { tool: 'OpsGenie', ai: '✗', rt: 'partial', uv: '✗', price: '$198' },
                  { tool: 'OpsCord', ai: '✓', rt: '✓', uv: '✓', price: 'TBD', highlight: true },
                ].map((row) => (
                  <tr
                    key={row.tool}
                    style={{
                      borderBottom: '1px solid rgba(99,139,255,0.08)',
                      background: row.highlight ? 'rgba(99,102,241,0.1)' : undefined,
                      ...(row.highlight
                        ? {
                            boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.3)',
                          }
                        : {}),
                    }}
                  >
                    <td style={{ padding: '12px 16px', fontWeight: row.highlight ? 700 : 400 }}>
                      {row.tool}
                    </td>
                    {[row.ai, row.rt, row.uv].map((val, j) => (
                      <td key={j} style={{ padding: '12px 16px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-space-mono)',
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '2px 10px',
                            borderRadius: 6,
                            ...(val === '✓'
                              ? {
                                  background: 'rgba(16,185,129,0.15)',
                                  color: '#10b981',
                                  border: '1px solid rgba(16,185,129,0.3)',
                                }
                              : val === '✗'
                                ? {
                                    background: 'rgba(239,68,68,0.15)',
                                    color: '#ef4444',
                                    border: '1px solid rgba(239,68,68,0.3)',
                                  }
                                : {
                                    background: 'rgba(245,158,11,0.15)',
                                    color: '#f59e0b',
                                    border: '1px solid rgba(245,158,11,0.3)',
                                  }),
                          }}
                        >
                          {val}
                        </span>
                      </td>
                    ))}
                    <td
                      style={{
                        padding: '12px 16px',
                        fontFamily: 'var(--font-space-mono)',
                        fontSize: 13,
                      }}
                    >
                      {row.highlight ? (
                        <span style={{ color: 'var(--sky)', fontWeight: 700 }}>{row.price}</span>
                      ) : (
                        row.price
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}