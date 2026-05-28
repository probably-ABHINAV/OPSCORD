'use client';

import React from 'react';
import ServiceNode from './ServiceNode';
import ConnectionFlow from './ConnectionFlow';

export default function DependencyGraph() {
  return (
    <div
      className="card"
      style={{
        borderRadius: 12,
        padding: 20,
        minHeight: 320,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
        Realtime Service Topology
      </div>

      <div
        style={{
          position: 'relative',
          height: 260,
          width: '100%',
          background: 'rgba(5,10,20,0.4)',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Connections */}
        <ConnectionFlow x1={20} y1={50} x2={50} y2={30} status="healthy" />
        <ConnectionFlow x1={20} y1={50} x2={50} y2={70} status="warning" />
        <ConnectionFlow x1={50} y1={30} x2={80} y2={50} status="healthy" />
        <ConnectionFlow x1={50} y1={70} x2={80} y2={50} status="critical" />

        {/* Nodes */}
        <ServiceNode x={20} y={50} name="API Gateway" status="healthy" />
        <ServiceNode x={50} y={30} name="Auth Service" status="healthy" />
        <ServiceNode x={50} y={70} name="Payment Processor" status="warning" />
        <ServiceNode x={80} y={50} name="Inventory DB" status="critical" />
      </div>
    </div>
  );
}
