'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface CounterStatProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export default function CounterStat({
  end,
  duration = 1600,
  prefix = '',
  suffix = '',
}: CounterStatProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const animate = useCallback(() => {
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          animate();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate, started]);

  const formatted = count.toLocaleString();

  return (
    <span
      ref={ref}
      className="gradient-text"
      style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontWeight: 800,
        fontSize: 'clamp(32px, 5vw, 48px)',
        lineHeight: 1,
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
