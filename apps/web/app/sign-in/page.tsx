'use client';

import React from 'react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420, padding: '0 20px' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              OpsCord
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'rgba(8,16,36,0.92)',
            border: '1px solid rgba(99,139,255,0.15)',
            borderRadius: 20,
            padding: '32px 24px',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 40px rgba(99,102,241,0.12)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: 999,
              padding: '6px 12px',
              marginBottom: 18,
              fontSize: 11,
              fontFamily: 'var(--font-space-mono)',
              color: '#93c5fd',
              letterSpacing: '0.08em',
            }}
          >
            SECURE ACCESS
          </div>
          <h1
            style={{
              fontWeight: 800,
              fontSize: 32,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Welcome back
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>
            Sign in to your OpsCord dashboard
          </p>
          <div
            style={{
              height: 1,
              background: 'rgba(255,255,255,0.06)',
              margin: '20px 0',
            }}
          />

          {/* Stack Auth SignIn placeholder — replace with <SignIn /> */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label
                style={{ display: 'block', fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '12px 16px',
                  color: 'var(--text)',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label
                style={{ display: 'block', fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="you@company.com"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '12px 16px',
                  color: 'var(--text)',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <Link
              href="/dashboard"
              className="glow-btn"
              style={{
                display: 'block',
                width: '100%',
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                color: 'white',
                fontWeight: 700,
                padding: '14px',
                borderRadius: 10,
                border: 'none',
                fontSize: 15,
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(99,102,241,0.3)',
                cursor: 'pointer',
                marginTop: 4,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 28px rgba(99,102,241,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.3)';
              }}
            >
              Sign In
            </Link>
          </div>

          <p
            style={{
              textAlign: 'center',
              fontSize: 11,
              color: 'var(--muted)',
              marginTop: 18,
              fontFamily: 'var(--font-space-mono)',
              letterSpacing: '0.05em',
            }}
          >
            Protected by enterprise-grade authentication
          </p>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 24 }}>
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" style={{ color: 'var(--sky)', textDecoration: 'none' }}>
              Sign up →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
