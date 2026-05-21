'use client';

const milestones = [
  {
    label: 'Architecture Complete',
    description:
      'System design, microservices structure and data flow finalized.',
    status: 'complete',
  },
  {
    label: 'Event Ingestion',
    description:
      'Webhooks and polling from CircleCI, GitHub, K8s and Datadog live.',
    status: 'complete',
  },
  {
    label: 'Auth (Stack Auth)',
    description: 'Authentication and user management fully implemented.',
    status: 'complete',
  },
  {
    label: 'Causality Engine',
    description: 'AI scoring engine currently in active development.',
    status: 'active',
  },
  {
    label: 'Production Deploy',
    description: 'Cloud infrastructure setup and production deployment.',
    status: 'upcoming',
  },
  {
    label: 'Beta Launch',
    description: 'Public beta release with early access for waitlist members.',
    status: 'upcoming',
  },
];

export default function BuildingInPublicTimeline() {
  return (
    <div style={{ maxWidth: 480, margin: '32px auto 0', textAlign: 'left' }}>
      {milestones.map((milestone, i) => {
        const isComplete = milestone.status === 'complete';
        const isActive = milestone.status === 'active';
        const isLast = i === milestones.length - 1;

        const dotColor = isComplete
          ? '#10b981'
          : isActive
            ? '#fbbf24'
            : 'rgba(255,255,255,0.15)';
        const labelColor = isComplete
          ? '#6ee7b7'
          : isActive
            ? '#fcd34d'
            : 'var(--muted)';
        const borderColor = isComplete
          ? 'rgba(16,185,129,0.3)'
          : isActive
            ? 'rgba(251,191,36,0.3)'
            : 'rgba(255,255,255,0.08)';
        const bgColor = isComplete
          ? 'rgba(16,185,129,0.07)'
          : isActive
            ? 'rgba(251,191,36,0.07)'
            : 'transparent';

        return (
          <div key={milestone.label} style={{ display: 'flex', gap: 16 }}>
            {/* Left: dot + line */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: dotColor,
                  border: `2px solid ${dotColor}`,
                  boxShadow: isActive ? `0 0 10px ${dotColor}` : undefined,
                  animation: isActive ? 'pulseGlow 2s infinite' : undefined,
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              {/* Vertical line */}
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 24,
                    background: isComplete
                      ? 'rgba(16,185,129,0.3)'
                      : 'rgba(255,255,255,0.07)',
                    margin: '4px 0',
                  }}
                />
              )}
            </div>

            {/* Right: content */}
            <div
              style={{
                flex: 1,
                marginBottom: isLast ? 0 : 8,
                padding: '6px 14px 10px',
                borderRadius: 10,
                border: `1px solid ${borderColor}`,
                background: bgColor,
                transition: 'background 0.2s',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: labelColor,
                  }}
                >
                  {isComplete ? '✓' : isActive ? '◎' : '○'}{' '}
                  {milestone.label}
                </span>
                {isActive && (
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-space-mono)',
                      background: 'rgba(251,191,36,0.15)',
                      border: '1px solid rgba(251,191,36,0.3)',
                      color: '#fcd34d',
                      padding: '1px 8px',
                      borderRadius: 20,
                      fontWeight: 700,
                    }}
                  >
                    IN PROGRESS
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {milestone.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
