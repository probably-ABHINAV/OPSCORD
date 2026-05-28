'use client';

import React, { useState } from 'react';
import OperatorStatusBoard from './OperatorStatusBoard';
import LiveCollaborationFeed from './LiveCollaborationFeed';

export default function WarRoomPanel({ incidentId }: { incidentId: string }) {
  const [inputText, setInputText] = useState('');

  const operators = [
    { name: 'Sarah J.', status: 'online' as const, role: 'L2 Support' },
    { name: 'Mike T.', status: 'busy' as const, role: 'DevOps' },
  ];

  const messages = [
    {
      author: 'SYSTEM',
      time: '14:22:01',
      text: `Incident ${incidentId} opened. AI Diagnostics attached.`,
      isSystem: true,
    },
    {
      author: 'Sarah J.',
      time: '14:23:45',
      text: 'Looking into the memory leak now. Pulling up Datadog.',
    },
    {
      author: 'SYSTEM',
      time: '14:24:10',
      text: 'Operator Mike T. joined the war room.',
      isSystem: true,
    },
    {
      author: 'Mike T.',
      time: '14:25:00',
      text: 'I think the recent deploy caused this. Should we roll back?',
    },
  ];

  return (
    <div
      className="card"
      style={{ borderRadius: 12, display: 'flex', flexDirection: 'column', height: 400 }}
    >
      <div
        style={{
          padding: '12px 18px',
          background: 'rgba(59,130,246,0.08)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 16 }}>🛡️</span>
        <span style={{ fontWeight: 700, fontSize: 14, color: '#60a5fa' }}>
          Incident War Room: {incidentId}
        </span>
      </div>

      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <OperatorStatusBoard operators={operators} />
        <div style={{ height: 1, background: 'var(--border)', margin: '8px 0 16px' }} />
        <LiveCollaborationFeed messages={messages} />

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <input
            type="text"
            placeholder="Type a message or /command..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '8px 12px',
              color: '#f1f5f9',
              fontSize: 13,
            }}
          />
          <button
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '0 16px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
