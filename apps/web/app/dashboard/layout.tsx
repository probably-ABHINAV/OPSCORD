'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Incidents', href: '/dashboard/incidents', icon: '🚨' },
  { label: 'Event Stream', href: '/dashboard/events', icon: '⚡' },
  { label: 'Causality', href: '/dashboard/causality', icon: '🧠' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/incidents': 'Incidents',
  '/dashboard/events': 'Event Stream',
  '/dashboard/causality': 'Causality Engine',
  '/dashboard/settings': 'Settings',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname] || 'Dashboard';

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* ── SIDEBAR ─────────────── */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: 'rgba(8,14,28,0.95)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 20px 4px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span
              className="gradient-text"
              style={{ fontFamily: 'var(--font-space-mono)', fontSize: 20, fontWeight: 700 }}
            >
              OpsCord
            </span>
          </Link>
          <div
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 12,
              color: 'var(--muted)',
              marginTop: 2,
            }}
          >
            Dashboard
          </div>
        </div>

        {/* Nav Items */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: '16px 12px',
            flex: 1,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 8,
                  fontSize: 14,
                  textDecoration: 'none',
                  color: active ? 'var(--text)' : 'var(--muted)',
                  background: active ? 'rgba(59,130,246,0.12)' : 'transparent',
                  borderLeft: active ? '2px solid var(--blue)' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 14,
                color: 'white',
                flexShrink: 0,
              }}
            >
              JD
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Jane Doe
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                jane@opscord.dev
              </div>
            </div>
          </div>
          <Link
            href="/"
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '8px',
              color: 'var(--muted)',
              fontSize: 13,
              textDecoration: 'none',
              transition: 'border-color 0.2s',
              cursor: 'pointer',
            }}
          >
            Sign Out
          </Link>
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-space-mono)',
              fontSize: 10,
              color: 'var(--muted)',
              marginTop: 10,
              opacity: 0.5,
            }}
          >
            v0.1.0 · seed
          </div>
        </div>
      </aside>

      {/* ── MAIN ────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* TOPBAR */}
        <header
          style={{
            height: 56,
            flexShrink: 0,
            background: 'rgba(5,10,20,0.9)',
            borderBottom: '1px solid var(--border)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{pageTitle}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: -2 }}>
              OpsCord / {pageTitle}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* LIVE badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 20,
                padding: '4px 12px',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#10b981',
                  animation: 'pulse 1.4s infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 11,
                  color: '#6ee7b7',
                  fontWeight: 700,
                }}
              >
                LIVE
              </span>
            </div>

            {/* Notification bell */}
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <span style={{ fontSize: 18, color: 'var(--muted)' }}>🔔</span>
              <span
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -6,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: 9,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                3
              </span>
            </div>

            {/* User avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                color: 'white',
                cursor: 'pointer',
              }}
            >
              JD
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 28 }}>{children}</main>
      </div>
    </div>
  );
}
