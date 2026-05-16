'use client';

import React, { useState, useEffect } from 'react';

export default function FeaturesPage() {
  const [epsCount, setEpsCount] = useState(847);

  useEffect(() => {
    const iv = setInterval(() => setEpsCount(800 + Math.floor(Math.random() * 100)), 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <main style={{ padding: '80px 5vw', maxWidth: 1080, margin: '0 auto' }}>
      <p className="section-label" style={{ color: 'var(--blue)', marginBottom: 12 }}>
        {'// CAPABILITIES'}
      </p>
      <h1
        style={{
          fontWeight: 800,
          fontSize: 'clamp(26px,4vw,46px)',
          letterSpacing: '-0.025em',
          marginBottom: 12,
        }}
      >
        Everything your <span className="gradient-text">on-call team</span> needs
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 40, lineHeight: 1.75 }}>
        From raw webhook noise to a ranked root-cause list in under 40ms.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {/* Card 1 — Causality Scoring */}
          <div
            className="card-hover"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(14,22,45,0.95))',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: 16,
              padding: 28,
              minHeight: 300,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-space-mono)',
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.3)',
                color: '#a78bfa',
                padding: '3px 10px',
                borderRadius: 6,
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              Core AI
            </span>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
              Causality Scoring Engine
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              AI ranks which event caused the incident. Not just correlation — actual root cause
              with per-event confidence scores and signal ranking.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['root cause', 'confidence %', 'multi-signal', 'ranked list'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: 11,
                    background: 'rgba(124,58,237,0.15)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    color: '#a78bfa',
                    padding: '3px 10px',
                    borderRadius: 6,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 — Real-Time Ingestion */}
          <div
            className="card-hover"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(14,22,45,0.95))',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: 16,
              padding: 28,
              minHeight: 300,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-space-mono)',
                background: 'rgba(59,130,246,0.15)',
                border: '1px solid rgba(59,130,246,0.3)',
                color: '#60a5fa',
                padding: '3px 10px',
                borderRadius: 6,
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              Event Layer
            </span>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚡</div>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Real-Time Ingestion</h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Webhooks, API watch &amp; polling. Express.js receiver processes all sources in under
              40ms p99 with Redis-backed deduplication.
            </p>
            <div
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '14px 18px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                  marginBottom: 4,
                }}
              >
                events / second
              </div>
              <span
                className="gradient-text"
                style={{ fontFamily: 'var(--font-space-mono)', fontWeight: 800, fontSize: 32 }}
              >
                {epsCount}
              </span>
            </div>
          </div>

          {/* Card 3 — Unified Incident View (span 2) */}
          <div
            className="card-hover"
            style={{
              gridColumn: 'span 2',
              background: 'linear-gradient(100deg, rgba(56,189,248,0.1), rgba(124,58,237,0.1))',
              border: '1px solid rgba(56,189,248,0.2)',
              borderRadius: 16,
              padding: 28,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: 260 }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-space-mono)',
                  background: 'rgba(56,189,248,0.15)',
                  border: '1px solid rgba(56,189,248,0.3)',
                  color: '#7dd3fc',
                  padding: '3px 10px',
                  borderRadius: 6,
                  display: 'inline-block',
                  marginBottom: 16,
                }}
              >
                Dashboard
              </span>
              <h3 style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>
                🎯 Unified Incident View
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>
                Every incident, every source, every signal — one dashboard. Ranked by causality,
                filterable by severity, and updated in real-time.
              </p>
            </div>
            <div
              style={{
                minWidth: 260,
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '16px 18px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                  letterSpacing: '0.08em',
                }}
              >
                ACTIVE INCIDENTS
              </div>
              {[
                {
                  dot: '#ef4444',
                  title: 'K8s pod crash → deploy #2847',
                  sev: 'Critical',
                  sevC: '#ef4444',
                },
                { dot: '#f97316', title: 'Redis cache miss storm', sev: 'High', sevC: '#f97316' },
                { dot: '#eab308', title: 'GitHub webhook spike', sev: 'Medium', sevC: '#eab308' },
              ].map((r, i) => (
                <div
                  key={i}
                  className="event-new"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 0',
                    borderBottom: i < 2 ? '1px solid rgba(99,139,255,0.08)' : undefined,
                    animationDelay: `${i * 0.15}s`,
                    animationFillMode: 'backwards',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: r.dot,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.title}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: r.sevC + '22',
                      border: `1px solid ${r.sevC}44`,
                      color: r.sevC,
                      fontFamily: 'var(--font-space-mono)',
                      flexShrink: 0,
                    }}
                  >
                    {r.sev}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4 — Multi-Source Intelligence */}
          <div
            className="card-hover"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(14,22,45,0.95))',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 16,
              padding: 28,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-space-mono)',
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#6ee7b7',
                padding: '3px 10px',
                borderRadius: 6,
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              Integrations
            </span>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔗</div>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
              Multi-Source Intelligence
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              All normalized into one event stream. One schema. One place.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { name: 'CircleCI', c: '#00D4AA' },
                { name: 'GitHub', c: '#f0883e' },
                { name: 'Kubernetes', c: '#326CE5' },
                { name: 'Datadog', c: '#a78bfa' },
              ].map((s) => (
                <span
                  key={s.name}
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-space-mono)',
                    background: s.c + '18',
                    border: `1px solid ${s.c}44`,
                    color: s.c,
                    padding: '5px 10px',
                    borderRadius: 8,
                    textAlign: 'center',
                  }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Card 5 — Instant Alerting */}
          <div
            className="card-hover"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(14,22,45,0.95))',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 16,
              padding: 28,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-space-mono)',
                background: 'rgba(245,158,11,0.15)',
                border: '1px solid rgba(245,158,11,0.3)',
                color: '#fcd34d',
                padding: '3px 10px',
                borderRadius: 6,
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              Outputs
            </span>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔔</div>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Instant Alerting</h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Push causality-ranked summaries to your team instantly. Fully programmable via REST
              API.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Slack Bot', 'React Dashboard', 'Webhooks API', 'Mobile App'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-space-mono)',
                    background: 'rgba(245,158,11,0.15)',
                    border: '1px solid rgba(245,158,11,0.3)',
                    color: '#fcd34d',
                    padding: '3px 10px',
                    borderRadius: 6,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>}

    </main>
  );
