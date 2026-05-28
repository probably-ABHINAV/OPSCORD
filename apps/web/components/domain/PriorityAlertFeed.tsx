'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import NotificationToast from './NotificationToast';

export default function PriorityAlertFeed() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      title: 'High CPU Usage',
      message: 'API Gateway node-1 is at 98% CPU.',
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Database Latency',
      message: 'Read replica lag exceeded 200ms.',
      priority: 'medium' as const,
    },
    {
      id: '3',
      title: 'New Deployment',
      message: 'Service "auth" deployed to prod.',
      priority: 'low' as const,
    },
  ]);

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8 }}>
        <AnimatePresence>
          {alerts.map((alert) => (
            <NotificationToast
              key={alert.id}
              id={alert.id}
              title={alert.title}
              message={alert.message}
              priority={alert.priority}
              onAcknowledge={handleAcknowledge}
            />
          ))}
        </AnimatePresence>

        {alerts.length === 0 && (
          <div
            style={{ textAlign: 'center', padding: '32px 0', color: 'var(--muted)', fontSize: 13 }}
          >
            All alerts acknowledged. You are caught up!
          </div>
        )}
      </div>
    </div>
  );
}
