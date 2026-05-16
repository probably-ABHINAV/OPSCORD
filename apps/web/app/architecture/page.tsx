'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ArchitectureDiagram = dynamic(() => import('@/components/ArchitectureDiagram'), { ssr: false });

export default function ArchitecturePage() {
  return (
    <main>
      <section
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
    </main>
  );
}
