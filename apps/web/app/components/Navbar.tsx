'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function PulsingDot({ color = '#ef4444', size = 7 }: { color?: string; size?: number }) {
  return (
    <span
      style={{
        display: 'inline-block', width: size, height: size,
        borderRadius: '50%', background: color,
        animation: 'pulse 1.4s infinite', flexShrink: 0,
      }}
    />
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(5,10,20,0.95)',
        zIndex: 200, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 24,
      }}
      onClick={onClose}
    >
      {[
        { label: 'Features', href: '/features' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Architecture', href: '/architecture' },
        { label: 'Pricing', href: '/pricing' },
      ].map((l) => (
        <Link
          key={l.label}
          href={l.href}
          style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 600, textDecoration: 'none' }}
          onClick={onClose}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <nav className="sticky top-0 z-50 h-14 sm:h-16 px-4 sm:px-6 lg:px-[5vw] flex items-center justify-between bg-[rgba(5,10,20,0.85)] backdrop-blur-[16px] border-b border-border">
              <span
                className="gradient-text"
                style={{ fontFamily: 'var(--font-space-mono)', fontSize: 20, fontWeight: 700 }}
              >
                OpsCord
              </span>
      
             <div className="hidden md:flex items-center gap-7">
                {[
                  { label: 'Features', href: '/features' },
                  { label: 'How It Works', href: '/how-it-works' },
                  { label: 'Architecture', href: '/architecture' },
                  { label: 'Pricing', href: '/pricing' },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{
                      fontSize: 13,
                      color: 'var(--muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {l.label}
                  </Link>
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
                    className="inline-flex rounded-lg border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] px-3 py-2 text-sm text-[#818cf8] transition-colors"
                  >
                    Code Analyzer
                  </Link>
      
                  <Link
                    href="/sign-in"
                    className="inline-flex rounded-lg border border-border px-3 py-2 text-sm text-text transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
      
                <Link
                  href="/sign-up"
                  className="hidden sm:inline-flex items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-3 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
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
    </>
  );
}