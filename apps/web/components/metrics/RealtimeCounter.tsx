'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface RealtimeCounterProps {
  value: number;
  format?: (val: number) => string;
  color?: string;
  delay?: number;
}

export const RealtimeCounter: React.FC<RealtimeCounterProps> = ({
  value,
  format = (val) => Math.round(val).toLocaleString(),
  color = '#f1f5f9',
  delay = 0,
}) => {
  const [isClient, setIsClient] = useState(false);
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setIsClient(true);
    const timeout = setTimeout(() => {
      springValue.set(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, springValue, delay]);

  const displayValue = useTransform(springValue, (latest) => format(latest));

  if (!isClient) return <span style={{ color }}>{format(value)}</span>;

  return <motion.span style={{ color }}>{displayValue}</motion.span>;
};
