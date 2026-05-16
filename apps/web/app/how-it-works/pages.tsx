'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const EventFeed = dynamic(() => import('@/components/EventFeed'), { ssr: false });

function PulsingDot({ color = '#ef4444', size = 7 }: { color?: string; size?: number }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        animation: 'pulse 1.4s infinite',
        flexShrink: 0,
      }}
    />
  );
}

export default function HowItWorksPage() {
  return (
    <main>
      {/* ── HOW IT WORKS ── */}
      <section
        style={{
          padding: '80px 5vw',
          borderTop: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.01)',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p className="section-label" style={{ color: 'var(--violet)', marginBottom: 12 }}>
            {'// PIPELINE'}
          </p>
          <h2
            style={{
              fontWeight: 800,
              fontSize: 'clamp(26px,4vw,46px)',
              letterSpacing: '-0.025em',
              marginBottom: 12,
            }}
          >
            From noise to <span className="gradient-text">root cause</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 40, lineHeight: 1.75 }}>
            Four stages. Sub-second. Every time.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {[
              {
                num: '01',
                icon: '📥',
                label: 'Events In',
                color: '#3b82f6',
                body: 'CircleCI, GitHub, K8s & Datadog push events via webhooks or polling',
              },
              {
                num: '02',
                icon: '⚙️',
                label: 'Normalize',
                color: '#6366f1',
                body: 'Event Processor & Normalizer creates a unified event schema',
              },
              {
                num: '03',
                icon: '🧠',
                label: 'AI Score',
                color: '#7c3aed',
                body: 'Causality Scoring Engine ranks root causes with confidence scores',
              },
              {
                num: '04',
                icon: '📣',
                label: 'Alert Team',
                color: '#38bdf8',
                body: 'Results delivered to Slack, Dashboard & Webhooks. Sub-second.',
              },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  padding: '32px 24px',
                  borderRight: i < 3 ? '1px solid var(--border)' : undefined,
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: 10,
                    color: 'var(--muted)',
                    marginBottom: 12,
                  }}
                >
                  STEP {step.num}
                </div>
                <div style={{ fontSize: 30, marginBottom: 12 }}>{step.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: step.color, marginBottom: 8 }}>
                  {step.label}
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* ── LIVE EVENT DEMO ── */}
      <section style={{ padding: '80px 5vw', borderTop: '1px solid var(--border)' }}>
       <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
          }}
         >
          {/* Left */}
          <div>
            <p className="section-label" style={{ color: 'var(--sky)', marginBottom: 12 }}>
              {'// LIVE DEMO'}
            </p>
            <h2
              style={{
                fontWeight: 800,
                fontSize: 'clamp(26px,4vw,46px)',
                letterSpacing: '-0.025em',
                marginBottom: 12,
              }}
            >
              Watch it <span className="gradient-text">work</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
              This simulation shows how OpsCord processes real-time events and produces causality
              scores for active incidents.
            </p>

            {/* Causality Scores */}
            <div className="card" style={{ padding: 22, marginBottom: 16 }}>
              <div
                style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                  marginBottom: 16,
                  letterSpacing: '0.06em',
                }}
              >
                ◆ CAUSALITY SCORE · latest incident
              </div>
              {[
                { label: 'K8s pod OOMKilled', pct: 87, color: '#ef4444' },
                { label: 'CircleCI deploy #2847', pct: 64, color: '#f97316' },
                { label: 'Redis cache miss', pct: 31, color: '#eab308' },
              ].map((bar) => (
                <div key={bar.label} style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    <span>{bar.label}</span>
                    <span style={{ fontFamily: 'var(--font-space-mono)', color: bar.color }}>
                      {bar.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        background: bar.color,
                        borderRadius: 2,
                        width: `${bar.pct}%`,
                        animation: 'barGrow 1.2s ease',
                        ['--bar-width' as string]: `${bar.pct}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Root Cause Box */}
            <div
              style={{
                border: '1px solid rgba(124,58,237,0.3)',
                borderRadius: 12,
                padding: '16px 20px',
                background: 'rgba(124,58,237,0.08)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                  marginBottom: 8,
                  letterSpacing: '0.06em',
                }}
              >
                ROOT CAUSE IDENTIFIED
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#a78bfa' }}>
                🔍 K8s pod OOMKilled
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                Confidence: 87% · 3 contributing factors
              </div>
            </div>
          </div>

          {/* Right — Live Event Feed */}
          <div
            style={{
              background: 'rgba(8,14,28,0.95)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid var(--border)',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <PulsingDot color="#10b981" />
              <span
                style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 11,
                  color: '#10b981',
                  fontWeight: 700,
                }}
              >
                LIVE
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                }}
              >
                streaming events
              </span>
            </div>
            <EventFeed maxItems={8} />
          </div>
        </div>
      </section>
    </main>
  );
}