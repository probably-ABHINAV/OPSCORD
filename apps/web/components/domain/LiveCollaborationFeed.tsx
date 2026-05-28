import React from 'react';

export default function LiveCollaborationFeed({
  messages,
}: {
  messages: Array<{ author: string; time: string; text: string; isSystem?: boolean }>;
}) {
  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        paddingRight: 8,
      }}
    >
      {messages.map((msg, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {msg.isSystem ? (
            <div
              style={{
                fontSize: 11,
                color: 'var(--sky)',
                fontFamily: 'var(--font-space-mono)',
                fontStyle: 'italic',
              }}
            >
              [{msg.time}] {msg.text}
            </div>
          ) : (
            <>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9' }}>
                  {msg.author}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-space-mono)',
                  }}
                >
                  {msg.time}
                </span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: '#cbd5e1',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '8px 12px',
                  borderRadius: 8,
                }}
              >
                {msg.text}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
