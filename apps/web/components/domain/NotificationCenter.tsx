import React from 'react';
import PriorityAlertFeed from './PriorityAlertFeed';

export default function NotificationCenter() {
  return (
    <div
      className="card"
      style={{ borderRadius: 12, display: 'flex', flexDirection: 'column', height: 400 }}
    >
      <div
        style={{
          padding: '12px 18px',
          background: 'rgba(5,10,20,0.4)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>🔔</span>
          <span style={{ fontWeight: 700, fontSize: 14 }}>Realtime Notifications</span>
        </div>
        <div
          style={{
            background: 'rgba(239,68,68,0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239,68,68,0.2)',
            padding: '2px 8px',
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          3 UNREAD
        </div>
      </div>

      <div style={{ padding: 16, flex: 1, overflow: 'hidden' }}>
        <PriorityAlertFeed />
      </div>
    </div>
  );
}
