'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { EVENTS, type EventItem } from '@/lib/mockData';

interface EventFeedProps {
  maxItems?: number;
  compact?: boolean;
}

interface FeedEvent extends EventItem {
  id: number;
  timestamp: string;
}

let eventCounter = 0;

function getTimestamp(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
    2,
    '0'
  )}:${String(now.getSeconds()).padStart(2, '0')}`;
}

export default function EventFeed({ maxItems = 8, compact = false }: EventFeedProps) {
  const [feed, setFeed] = useState<FeedEvent[]>([]);

  const addEvent = useCallback(() => {
    const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    eventCounter++;
    const newEvent: FeedEvent = {
      ...randomEvent,
      id: eventCounter,
      timestamp: getTimestamp(),
    };
    setFeed((prev) => [newEvent, ...prev].slice(0, maxItems));
  }, [maxItems]);

  useEffect(() => {
    // Seed initial events
    const initial: FeedEvent[] = [];
    for (let i = 0; i < Math.min(maxItems, 5); i++) {
      eventCounter++;
      initial.push({
        ...EVENTS[Math.floor(Math.random() * EVENTS.length)],
        id: eventCounter,
        timestamp: getTimestamp(),
      });
    }
    setFeed(initial);

    const interval = setInterval(addEvent, 2200);
    return () => clearInterval(interval);
  }, [addEvent, maxItems]);

  return (
    <div
      style={{
        maxHeight: compact ? '240px' : '380px',
        overflowY: 'auto',
      }}
    >
      {feed.map((event, idx) => (
        <div
          key={event.id}
          className={idx === 0 ? 'event-new' : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: compact ? '8px' : '12px',
            padding: compact ? '8px 14px' : '11px 20px',
            borderBottom: '1px solid rgba(99,139,255,0.08)',
            transition: 'background 0.15s',
            cursor: 'default',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(card)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <span
            style={{
              fontSize: compact ? '12px' : '14px',
              width: '20px',
              textAlign: 'center',
              flexShrink: 0,
            }}
          >
            {event.icon}
          </span>

          <span
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '11px',
              color: event.color,
              minWidth: compact ? '50px' : '60px',
              flexShrink: 0,
            }}
          >
            {event.src}
          </span>

          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
              background: event.color + '22',
              border: `1px solid ${event.color}44`,
              color: event.color,
              flexShrink: 0,
              fontFamily: 'var(--font-space-mono), monospace',
            }}
          >
            {event.type}
          </span>

          <span
            style={{
              fontSize: '12px',
              color: 'var(--muted)',
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {event.msg}
          </span>

          {!compact && (
            <span
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '10px',
                color: 'var(--muted)',
                flexShrink: 0,
              }}
            >
              {event.timestamp}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
