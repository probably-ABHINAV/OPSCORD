'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import CounterStat from '@/components/CounterStat';
import { EVENTS, INTEGRATION_LOGOS } from '@/lib/mockData';
import { FOOTER_NAV_ITEMS, SITE_CONFIG } from './src/config/site';

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
              color: 'var(--muted)',
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
              onClick={() => setArchOpen(true)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                padding: '15px 34px',
                borderRadius: 10,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'border-color 0.2s',
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

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              marginTop: 24,
            }}
          >
            {[
              { label: '✓ Architecture Complete', type: 'green' },
              { label: '✓ Event Ingestion', type: 'green' },
              { label: '✓ Auth (Stack Auth)', type: 'green' },
              { label: '◎ Causality Engine', type: 'amber' },
              { label: '○ Production Deploy', type: 'dim' },
              { label: '○ Beta Launch', type: 'dim' },
            ].map((pill) => (
              <span
                key={pill.label}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '7px 14px',
                  borderRadius: 20,
                  ...(pill.type === 'green'
                    ? {
                        background: 'rgba(16,185,129,0.12)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: '#6ee7b7',
                      }
                    : pill.type === 'amber'
                      ? {
                          background: 'rgba(251,191,36,0.12)',
                          border: '1px solid rgba(251,191,36,0.3)',
                          color: '#fcd34d',
                          animation: 'pulseGlow 2s infinite',
                        }
                      : {
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--muted)',
                        }),
                }}
              >
                {pill.label}
              </span>
            ))}
          </div>
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
