'use client';

import React from 'react';
import Link from 'next/link';

export default function SignUpPage() {
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
          width: '55%',
          height: '55%',
          background: 'radial-gradient(circle, rgba(80,227,194,0.08), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '55%',
          height: '55%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(80,227,194,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(80,227,194,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 440,
          padding: '24px 20px',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              OpsCord
            </span>
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 10,
              color: 'var(--cyan)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginTop: 6,
              opacity: 0.7,
            }}
          >
            // OPS INTELLIGENCE PLATFORM
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'rgba(10,10,10,0.95)',
            border: '1px solid rgba(80,227,194,0.18)',
            borderRadius: 16,
            padding: '36px 32px',
            boxShadow: '0 0 40px rgba(80,227,194,0.05), 0 24px 48px rgba(0,0,0,0.5)',
          }}
        >
          {/* Cyan top accent line */}
          <div
            style={{
              height: 2,
              background: 'linear-gradient(90deg, var(--cyan), transparent)',
              borderRadius: 2,
              marginBottom: 28,
              opacity: 0.6,
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 10,
              color: 'var(--cyan)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: 8,
              opacity: 0.8,
            }}
          >
            // EARLY ACCESS
          </p>
          <h1
            style={{
              fontWeight: 800,
              fontSize: 26,
              marginBottom: 6,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
            }}
          >
            Create your account
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>
            Join OpsCord early access — AI-powered incident intelligence for your stack.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Full Name field */}
            <div>
              <label
                htmlFor="signup-name"
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontFamily: 'var(--font-space-mono)',
                  color: 'var(--cyan)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 7,
                  opacity: 0.85,
                }}
              >
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                placeholder="Jane Doe"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(80,227,194,0.2)',
                  borderRadius: 10,
                  padding: '12px 16px',
                  color: 'var(--text)',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(80,227,194,0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(80,227,194,0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(80,227,194,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="signup-email"
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontFamily: 'var(--font-space-mono)',
                  color: 'var(--cyan)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 7,
                  opacity: 0.85,
                }}
              >
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@company.com"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(80,227,194,0.2)',
                  borderRadius: 10,
                  padding: '12px 16px',
                  color: 'var(--text)',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(80,227,194,0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(80,227,194,0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(80,227,194,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="signup-password"
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontFamily: 'var(--font-space-mono)',
                  color: 'var(--cyan)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 7,
                  opacity: 0.85,
                }}
              >
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(80,227,194,0.2)',
                  borderRadius: 10,
                  padding: '12px 16px',
                  color: 'var(--text)',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(80,227,194,0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(80,227,194,0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(80,227,194,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Create Account button */}
            <Link
              href="/dashboard"
              className="glow-btn"
              style={{
                display: 'block',
                width: '100%',
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                color: 'white',
                fontWeight: 700,
                padding: '13px',
                borderRadius: 10,
                border: 'none',
                fontSize: 14,
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(99,102,241,0.35)',
                cursor: 'pointer',
                marginTop: 4,
                letterSpacing: '0.02em',
              }}
            >
              Create Account →
            </Link>
          </div>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              margin: '24px 0',
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 10,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              or
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
            Already have an account?{' '}
            <Link
              href="/sign-in"
              style={{
                color: 'var(--cyan)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Sign in →
            </Link>
          </p>
        </div>

        {/* Footer note */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 11,
            color: 'var(--muted)',
            marginTop: 20,
            fontFamily: 'var(--font-space-mono)',
            opacity: 0.5,
          }}
        >
          Secured · SOC2 Ready · Zero-trust
        </p>
      </div>
    </div>
  );
}
