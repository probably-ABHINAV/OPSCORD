import React from 'react';
import DowntimeTracker from './DowntimeTracker';
import ComplianceChart from './ComplianceChart';

export default function SLAMonitor() {
  return (
    <div className="card" style={{ borderRadius: 12, padding: 20 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 16 }}>Infrastructure SLA Monitoring</div>
        <div
          style={{
            fontSize: 11,
            color: '#10b981',
            background: 'rgba(16,185,129,0.1)',
            padding: '4px 10px',
            borderRadius: 6,
            fontWeight: 700,
            border: '1px solid rgba(16,185,129,0.2)',
          }}
        >
          GLOBAL UPTIME: 99.98%
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <DowntimeTracker
          title="API Gateway (Global)"
          uptimePercentage={99.99}
          downtimeMinutes={4.2}
        />
        <DowntimeTracker
          title="Payment Processing"
          uptimePercentage={99.85}
          downtimeMinutes={64.0}
        />
        <DowntimeTracker
          title="Authentication Services"
          uptimePercentage={100}
          downtimeMinutes={0}
        />
      </div>

      <ComplianceChart />
    </div>
  );
}
