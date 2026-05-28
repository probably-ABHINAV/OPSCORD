'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const RechartsChart = dynamic(
  () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import('recharts').then((mod: any) => {
      const { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } = mod;

      function Chart() {
        const data = [
          { name: 'Mon', uptime: 100 },
          { name: 'Tue', uptime: 99.9 },
          { name: 'Wed', uptime: 98.5 },
          { name: 'Thu', uptime: 100 },
          { name: 'Fri', uptime: 100 },
          { name: 'Sat', uptime: 99.99 },
          { name: 'Sun', uptime: 100 },
        ];

        return (
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#64748b', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[95, 100]}
                tick={{ fill: '#64748b', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  background: 'rgba(14,22,45,0.95)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="uptime" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.uptime >= 99.9 ? '#10b981' : '#f59e0b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      }
      return Chart;
    }),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: 140, color: 'var(--muted)', textAlign: 'center' }}>
        Loading Chart...
      </div>
    ),
  }
);

export default function ComplianceChart() {
  return (
    <div style={{ marginTop: 16 }}>
      <div
        style={{
          fontSize: 11,
          color: 'var(--muted)',
          fontFamily: 'var(--font-space-mono)',
          marginBottom: 12,
        }}
      >
        7-DAY COMPLIANCE TREND
      </div>
      <RechartsChart />
    </div>
  );
}
