'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { INCIDENTS, CHART_DATA } from '@/lib/mockData';

const EventFeed = dynamic(() => import('@/components/EventFeed'), { ssr: false });
const SwarmActivity = dynamic(() => import('@/components/SwarmActivity'), { ssr: false });

/* ── Recharts (client-only) ─────────────── */
const RechartsChart = dynamic(
  () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import('recharts').then((mod: any) => {
    .catch(err => console.error(err))