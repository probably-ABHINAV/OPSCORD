'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import CounterStat from '@/components/CounterStat';
import { EVENTS, INTEGRATION_LOGOS } from '@/lib/mockData';
import { FOOTER_NAV_ITEMS, SITE_CONFIG } from './src/config/site';
import BuildingInPublicTimeline from '@/components/BuildingInPublicTimeline';

const CanvasBackground = dynamic(() => import('@/components/CanvasBackground'), { ssr: false });
const EventFeed = dynamic(() => import('@/components/EventFeed'), {
  ssr: false,
});
const ArchitectureDiagram = dynamic(() => import('@/components/ArchitectureDiagram'), {
  ssr: false,
});

/* ── Pulsing Dot ──────────────────────────── */
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

/* ── Mobile Menu ──────────────────────────── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5,10,20,0.95)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
      onClick={onClose}
    >
      {['Features', 'How It Works', 'Architecture', 'Pricing'].map((l) => (
        <a
          className="tags"
          key={l}
          href={`#${l.toLowerCase().replace(/ /g, '-')}`}
          style={{ fontSize: 20, fontWeight: 600 }}
          onClick={onClose}
        >
          {l}
        </a>
      ))}
    </div>
  );
}

/* ── Inline Event Card for Hero ───────────── */
function MiniEventPreview() {
  const [events, setEvents] = useState(EVENTS.slice(0, 3));
  const [count, setCount] = useState(1247);

  useEffect(() => {
    const iv = setInterval(() => {
      const next = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      setEvents((p) => [next, ...p].slice(0, 3));
      setCount((c) => c + Math.floor(Math.random() * 5) + 1);
    }, 2200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        maxWidth: 520,
        margin: '48px auto 0',
        background: 'rgba(8,16,36,0.92)',
        border: '1px solid rgba(99,139,255,0.15)',
        borderRadius: 14,
        padding: '16px 20px',
        backdropFilter: 'blur(12px)',
        textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span
          style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', flexShrink: 0 }}
        />
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
        <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--muted)' }}>
          EVENT STREAM — DEMO
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-space-mono)',
            fontSize: 11,
            color: 'var(--muted)',
          }}
        >
          {count.toLocaleString()} events ingested
        </span>
      </div>
      {events.map((ev, i) => (
        <div
          key={i}
          className={i === 0 ? 'event-new' : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 0',
            borderTop: i > 0 ? '1px solid rgba(99,139,255,0.08)' : undefined,
          }}
        >
          <span style={{ fontSize: 12 }}>{ev.icon}</span>
          <span
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 11,
              color: ev.color,
              minWidth: 55,
            }}
          >
            {ev.src}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: 6,
              background: ev.color + '22',
              border: `1px solid ${ev.color}44`,
              color: ev.color,
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            {ev.type}
          </span>
          <span
            style={{
              fontSize: 12,
              color: 'var(--muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {ev.msg}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  LANDING PAGE                              */
/* ═══════════════════════════════════════════ */
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [archOpen, setArchOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [email, setEmail] = useState('');
  const [epsCount, setEpsCount] = useState(847);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setEpsCount(800 + Math.floor(Math.random() * 100)), 3000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

      const threshold = isMobile ? 10 : 50;
      setShowScrollTop(scrollTop > threshold);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setToast(true);
    setEmail('');
    setTimeout(() => setToast(false), 3500);
  };

  return (
    <>
      {toast && <div className="toast">✓ You&apos;re on the waitlist!</div>}

      {/* Architecture Modal */}
      {archOpen && (
        <div
          onClick={() => setArchOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 900,
              width: '100%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: 24,
              position: 'relative',
            }}
          >
            <button
              onClick={() => setArchOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                fontSize: 24,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
            <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 16 }}>System Architecture</h3>
            <div style={{ width: '100%', overflowX: 'hidden' }}>
              <ArchitectureDiagram />
            </div>
          </div>
        </div>
      )}

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── NAVBAR ──────────────────────── */}
      <nav className="sticky top-0 z-50 h-14 sm:h-16 px-4 sm:px-6 lg:px-[5vw] flex items-center justify-between bg-[rgba(5,10,20,0.85)] backdrop-blur-[16px] border-b border-border">
        <span
          className="gradient-text"
          style={{ fontFamily: 'var(--font-space-mono)', fontSize: 20, fontWeight: 700 }}
        >
          OpsCord
        </span>

        <div className="hidden md:flex items-center gap-7">
          {['Features', 'How It Works', 'Architecture', 'Pricing'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, '-')}`}
              style={{
                fontSize: 13,
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.35)] bg-[rgba(220,38,38,0.12)] px-3 py-1">
              <PulsingDot />
              <span
                className="font-space-mono text-[10px] uppercase tracking-[0.1em]"
                style={{ color: '#fca5a5' }}
              >
                SEED STAGE
              </span>
            </div>

            <Link
              href="/analyzer"
              className="inline-flex rounded-lg border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] px-3 py-2 text-sm text-[#818cf8] transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:text-white hover:bg-cyan-400/5 hover:shadow-[0_0_0_1px_#67e8f9,0_0_8px_#22d3ee]"
            >
              Code Analyzer
            </Link>

            <Link
              href="/sign-in"
              className="inline-flex rounded-lg border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] px-3 py-2 text-sm text-[#818cf8] transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:text-white hover:bg-cyan-400/5 hover:shadow-[0_0_0_1px_#67e8f9,0_0_8px_#22d3ee]"
            >
              Sign In
            </Link>
          </div>

          <Link
            href="/sign-up"
            className="inline-flex rounded-lg border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] px-3 py-2 text-sm text-[#818cf8] transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:text-white hover:bg-cyan-400/5 hover:shadow-[0_0_0_1px_#67e8f9,0_0_8px_#22d3ee]"
          >
            Get Early Access →
          </Link>

          <button
            className="md:hidden ml-2 text-2xl flex items-center justify-center"
            onClick={() => setMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────── */}
      <section
        style={{
          minHeight: '92vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 16px 60px',
          textAlign: 'center',
        }}
      >
        <CanvasBackground />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 800,
            width: '100%',
            padding: '0 8px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(220,38,38,0.12)',
              border: '1px solid rgba(220,38,38,0.35)',
              borderRadius: 20,
              padding: '7px 16px',
              marginBottom: 28,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <PulsingDot />
            <span
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 'clamp(10px, 2vw, 11px)',
                color: '#fca5a5',
              }}
            >
              LIVE BUILD · PRESENTING TODAY
            </span>
          </div>

          <h1
            style={{
              fontWeight: 800,
              fontSize: 'clamp(32px, 8vw, 84px)',
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              animation: 'fadeUp 0.6s ease',
            }}
          >
            <span className="gradient-text">Stop Firefighting.</span>
            <br />
            <span style={{ color: '#f1f5f9' }}>Start Understanding.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(14px, 2.5vw, 19px)',
              color: '#94a3b8',
              maxWidth: 540,
              padding: '0 8px',
              margin: '24px auto 0',
              lineHeight: 1.75,
              position: 'relative',
              zIndex: 3,
            }}
          >
            OpsCord ingests events from CircleCI, GitHub, Kubernetes &amp; Datadog, then uses AI
            causality scoring to tell you exactly what broke — and{' '}
            <em style={{ color: 'var(--sky)', fontStyle: 'italic' }}>why</em>.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              marginTop: 32,
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#waitlist"
              className="glow-btn"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                color: 'white',
                padding: '15px 34px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 0 32px rgba(99,102,241,0.4)',
                display: 'inline-block',
              }}
            >
              Request Demo →
            </a>
            <button
              className="glow-btn"
              onClick={() => setArchOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                color: 'white',
                padding: '15px 34px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 0 32px rgba(99,102,241,0.4)',
                display: 'inline-block',
              }}
            >
              View Architecture ↗
            </button>
          </div>

          <MiniEventPreview />
        </div>
      </section>

      {/* ── STATS ROW ──────────────────── */}
      <section
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        {[
          { end: 1247, suffix: '+', label: 'Events ingested', dur: 1600 },
          { end: 3, suffix: ' active', label: 'Incidents resolved', dur: 1200 },
          { end: 94, suffix: '%', label: 'Causality accuracy', dur: 2000 },
          { end: 0, suffix: '', label: 'p99 ingestion latency', dur: 0, static: '<40ms' },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: '36px 20px',
              textAlign: 'center',
              borderRight: i < 3 ? '1px solid var(--border)' : undefined,
            }}
          >
            {s.static ? (
              <span
                className="gradient-text"
                style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontWeight: 800,
                  fontSize: 'clamp(32px,5vw,48px)',
                  lineHeight: 1,
                }}
              >
                {s.static}
              </span>
            ) : (
              <CounterStat end={s.end} suffix={s.suffix} duration={s.dur} />
            )}
            <div
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 11,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginTop: 8,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* ── MARQUEE ────────────────────── */}
      <section
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '22px 0',
          background: 'rgba(255,255,255,0.01)',
          overflow: 'hidden',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          const inner = e.currentTarget.querySelector('.marquee-track') as HTMLElement;
          if (inner) inner.style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          const inner = e.currentTarget.querySelector('.marquee-track') as HTMLElement;
          if (inner) inner.style.animationPlayState = 'running';
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 20s linear infinite',
          }}
        >
          {[...INTEGRATION_LOGOS, ...INTEGRATION_LOGOS].map((logo, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--muted)',
                  padding: '0 24px',
                  whiteSpace: 'nowrap',
                }}
              >
                {logo}
              </span>
              {i < INTEGRATION_LOGOS.length * 2 - 1 && (
                <span style={{ width: 1, background: 'var(--border)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── FEATURES BENTO GRID ─────────── */}
      <section id="features" style={{ padding: '80px 5vw', maxWidth: 1080, margin: '0 auto' }}>
        <p className="section-label" style={{ color: 'var(--blue)', marginBottom: 12 }}>
          {'// CAPABILITIES'}
        </p>
        <h2
          style={{
            fontWeight: 800,
            fontSize: 'clamp(26px,4vw,46px)',
            letterSpacing: '-0.025em',
            marginBottom: 12,
          }}
        >
          Everything your <span className="gradient-text">on-call team</span> needs
        </h2>
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
      </section>

      {/* ── HOW IT WORKS ───────────────── */}
      <section
        id="how-it-works"
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
              backgroundColor: 'rgba(168, 85, 247, 0.08)',
              border: '1px solid #a855f7',
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
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
                className="step-card"
                style={{
                  padding: '32px 24px',
                  borderRight: i < 3 ? '1px solid var(--border)' : undefined,
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
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
                <div className="step-icon" style={{ fontSize: 30, marginBottom: 12 }}>
                  {step.icon}
                </div>
                <div
                  className="step-label"
                  style={{ fontWeight: 700, fontSize: 16, color: step.color, marginBottom: 8 }}
                >
                  {step.label}
                </div>
                <p
                  className="step-body"
                  style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE EVENT DEMO ─────────────── */}
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

      {/* ── ARCHITECTURE ───────────────── */}
      <section
        id="architecture"
        style={{
          padding: '80px 5vw',
          borderTop: '1px solid var(--border)',
          background: 'rgba(99,139,255,0.02)',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p className="section-label" style={{ color: 'var(--blue)', marginBottom: 12 }}>
            {'// ARCHITECTURE'}
          </p>
          <h2
            style={{
              fontWeight: 800,
              fontSize: 'clamp(26px,4vw,46px)',
              letterSpacing: '-0.025em',
              marginBottom: 12,
            }}
          >
            Built to <span className="gradient-text">scale</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 40, lineHeight: 1.75 }}>
            Event-driven microservices. PostgreSQL + Redis + SQS. Express.js REST API.
          </p>

          <ArchitectureDiagram />

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24 }}>
            {[
              { label: '10 services', c: '#3b82f6' },
              { label: '3 data stores', c: '#7c3aed' },
              { label: '4 input sources', c: '#10b981' },
            ].map((p) => (
              <span
                key={p.label}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '7px 16px',
                  borderRadius: 20,
                  background: p.c + '18',
                  border: `1px solid ${p.c}44`,
                  color: p.c,
                }}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPETITOR COMPARISON ─────── */}
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

      {/* ── BUILDING IN PUBLIC / WAITLIST ── */}
      <section
        id="waitlist"
        style={{
          padding: '80px 5vw',
          borderTop: '1px solid var(--border)',
          background: 'linear-gradient(180deg, rgba(37,99,235,0.07) 0%, transparent 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p className="section-label" style={{ color: 'var(--amber)', marginBottom: 12 }}>
            {'// BUILDING IN PUBLIC'}
          </p>
          <h2
            style={{
              fontWeight: 800,
              fontSize: 'clamp(26px,4vw,46px)',
              letterSpacing: '-0.025em',
              marginBottom: 12,
            }}
          >
            We&apos;re building this <span className="gradient-text">live</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 32, lineHeight: 1.75 }}>
            OpsCord is in active development. Join early to shape the product and get beta access at
            launch.
          </p>

          <form
            onSubmit={handleWaitlist}
            style={{
              display: 'flex',
              gap: 10,
              maxWidth: 460,
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '14px 18px',
                color: 'var(--text)',
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--blue)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button
              type="submit"
              className="glow-btn"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                color: 'white',
                fontWeight: 700,
                padding: '14px 24px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                boxShadow: '0 0 20px rgba(99,102,241,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              Join Waitlist →
            </button>
          </form>

          <BuildingInPublicTimeline />
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: 16,
            right: isMobile ? 16 : 34,
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'rgba(8,16,36,0.92)',
            color: 'white',
            cursor: 'pointer',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99,102,241,0.3)',
          }}
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* ── FOOTER ─────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '32px 5vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <span
          className="gradient-text"
          style={{ fontFamily: 'var(--font-space-mono)', fontSize: 18, fontWeight: 700 }}
        >
          {SITE_CONFIG.name}
        </span>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{SITE_CONFIG.description}</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {FOOTER_NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {item.label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
