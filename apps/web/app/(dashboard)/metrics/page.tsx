'use client';

import React from 'react';
import MetricCard from '@/components/core/MetricCard';
import { CHART_DATA } from '@/lib/mockData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const LATENCY_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  p50: 45 + Math.floor(Math.random() * 30),
  p95: 120 + Math.floor(Math.random() * 80),
  p99: 280 + Math.floor(Math.random() * 200),
}));

const ERROR_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  '4xx': Math.floor(Math.random() * 50),
  '5xx': Math.floor(Math.random() * 15),
}));

interface TooltipPayloadEntry {
  color: string;
  name: string;
  value: number;
}

function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="bg-bg-surface border border-border rounded-md px-3 py-2 shadow-xl">
      <p className="font-mono text-[11px] text-muted mb-1">{label}</p>
      {payload.map((entry: TooltipPayloadEntry, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="font-mono text-xs text-text">
            {entry.name}: <strong>{entry.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Metrics</h1>
        <p className="text-muted text-sm font-mono mt-1">
          System performance overview — last 24 hours
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          label="Events Ingested"
          value="24,847"
          change="12% from yesterday"
          changeType="up"
        />
        <MetricCard
          label="Avg Latency (p99)"
          value="312"
          unit="ms"
          change="8% improvement"
          changeType="down"
        />
        <MetricCard label="Error Rate" value="0.42" unit="%" change="Stable" changeType="neutral" />
        <MetricCard
          label="Uptime"
          value="99.97"
          unit="%"
          change="SLA target: 99.9%"
          changeType="neutral"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Event Volume */}
        <div className="bg-bg-card border border-border rounded-lg p-5">
          <p className="font-mono text-[11px] text-muted uppercase tracking-wider mb-4">
            Event Volume
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: '#888' }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                interval={3}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#888' }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="events" fill="#0070F3" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Latency Distribution */}
        <div className="bg-bg-card border border-border rounded-lg p-5">
          <p className="font-mono text-[11px] text-muted uppercase tracking-wider mb-4">
            Latency Distribution
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={LATENCY_DATA}>
              <defs>
                <linearGradient id="gradP99" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F31260" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#F31260" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradP95" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5A623" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradP50" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#50E3C2" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#50E3C2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: '#888' }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                interval={3}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#888' }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="p99"
                stroke="#F31260"
                fill="url(#gradP99)"
                strokeWidth={1.5}
              />
              <Area
                type="monotone"
                dataKey="p95"
                stroke="#F5A623"
                fill="url(#gradP95)"
                strokeWidth={1.5}
              />
              <Area
                type="monotone"
                dataKey="p50"
                stroke="#50E3C2"
                fill="url(#gradP50)"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Error Rate Chart — Full Width */}
      <div className="bg-bg-card border border-border rounded-lg p-5">
        <p className="font-mono text-[11px] text-muted uppercase tracking-wider mb-4">
          Error Rate Breakdown
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ERROR_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 10, fill: '#888' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              interval={3}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#888' }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="4xx" stackId="errors" fill="#F5A623" radius={[0, 0, 0, 0]} />
            <Bar dataKey="5xx" stackId="errors" fill="#F31260" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
