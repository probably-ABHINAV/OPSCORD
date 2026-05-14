'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Node = ({
  x,
  y,
  width,
  height,
  label,
  color,
  icon,
  sublabel,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
  icon: React.ReactNode;
  sublabel?: string;
}) => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={12}
      fill={color + '11'}
      stroke={color + '44'}
      strokeWidth={1.5}
    />
    <text
      x={x + 16}
      y={y + 28}
      fill={color}
      fontSize={13}
      fontWeight={800}
      fontFamily="var(--font-space-mono)"
    >
      {icon} {label}
    </text>
    {sublabel && (
      <text x={x + 16} y={y + 46} fill="#64748b" fontSize={10} fontFamily="var(--font-space-mono)">
        {sublabel}
      </text>
    )}
  </motion.g>
);

export default function ArchitectureDiagram() {
  const primaryColor = '#3b82f6'; // Blue
  const secondaryColor = '#7c3aed'; // Violet
  const accentColor = '#10b981'; // Green
  const dangerColor = '#ef4444'; // Red
  const warningColor = '#f59e0b'; // Amber
  const mutedColor = '#64748b'; // Slate

  // Data flows (lines between blocks)
  const flows = [
    // Inputs to Ingestion
    { from: [100, 100], to: [250, 200], duration: 3, delay: 0 },
    { from: [100, 200], to: [250, 200], duration: 3.5, delay: 0.5 },
    { from: [100, 300], to: [250, 200], duration: 4, delay: 1 },
    { from: [100, 400], to: [250, 450], duration: 3.2, delay: 0.2 },

    // Ingestion to Core
    { from: [400, 250], to: [500, 250], duration: 2.5, delay: 0 },
    { from: [400, 450], to: [500, 250], duration: 3, delay: 0.5, dashed: true },

    // Core to Storage
    { from: [650, 200], to: [750, 150], duration: 2, delay: 0 },
    { from: [650, 300], to: [750, 250], duration: 2.2, delay: 0.3 },
    { from: [650, 350], to: [750, 400], duration: 2.8, delay: 0.6, dashed: true },

    // Storage to API
    { from: [850, 150], to: [950, 250], duration: 1.8, delay: 0 },
    { from: [850, 250], to: [950, 250], duration: 2, delay: 0.2 },

    // API to Outputs
    { from: [1050, 250], to: [1150, 100], duration: 2.4, delay: 0.1 },
    { from: [1050, 250], to: [1150, 200], duration: 2.6, delay: 0.2 },
    { from: [1050, 250], to: [1150, 300], duration: 2.8, delay: 0.3 },
    { from: [1050, 250], to: [1150, 450], duration: 3, delay: 0.4 },
  ];

  return (
    <div
      style={{ width: '100%', overflowX: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: 16 }}
    >
      <svg
        viewBox="0 0 1300 550"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', minWidth: 1000 }}
      >
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="1300" height="550" fill="url(#grid)" />

        {/* Connections (Lines) */}
        {flows.map(
          (
            flow: {
              from: number[];
              to: number[];
              duration: number;
              delay: number;
              dashed?: boolean;
            },
            i: number
          ) => (
            <g key={i}>
              <line
                x1={flow.from[0]}
                y1={flow.from[1]}
                x2={flow.to[0]}
                y2={flow.to[1]}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
                strokeDasharray={flow.dashed ? '4 4' : ''}
              />
              {/* Animated Data Point */}
              <motion.circle
                r={1.5}
                fill={flow.dashed ? warningColor : primaryColor}
                animate={{
                  cx: [flow.from[0], flow.to[0]],
                  cy: [flow.from[1], flow.to[1]],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: flow.duration,
                  repeat: Infinity,
                  delay: flow.delay,
                  ease: 'linear',
                }}
              />
            </g>
          )
        )}

        {/* INPUT SOURCES */}
        <text
          x={20}
          y={40}
          fill={mutedColor}
          fontSize={10}
          fontWeight={700}
          fontFamily="var(--font-space-mono)"
          letterSpacing="0.1em"
        >
          {'// INPUT SOURCES'}
        </text>
        <Node
          x={20}
          y={60}
          width={180}
          height={70}
          label="CircleCI Build"
          sublabel="Build & Deploy Events"
          color="#00D4AA"
          icon="◎"
        />
        <Node
          x={20}
          y={150}
          width={180}
          height={70}
          label="GitHub API"
          sublabel="Push/PR Webhooks"
          color="#f0883e"
          icon="⬡"
        />
        <Node
          x={20}
          y={240}
          width={180}
          height={70}
          label="Kubernetes API"
          sublabel="Pod/HPA Events"
          color="#326CE5"
          icon="⎈"
        />
        <Node
          x={20}
          y={330}
          width={180}
          height={70}
          label="Datadog Metrics"
          sublabel="Health Anomaly Polling"
          color="#a78bfa"
          icon="◈"
        />

        {/* EVENT INGESTION */}
        <rect
          x={230}
          y={140}
          width={180}
          height={160}
          rx={16}
          fill="rgba(59,130,246,0.03)"
          stroke="rgba(59,130,246,0.15)"
          strokeWidth={1}
        />
        <text
          x={245}
          y={165}
          fill={primaryColor}
          fontSize={10}
          fontWeight={700}
          fontFamily="var(--font-space-mono)"
          letterSpacing="0.1em"
        >
          EVENT INGESTION
        </text>
        <Node
          x={245}
          y={185}
          width={150}
          height={90}
          label="Webhook Rx"
          sublabel="Express.js / Node.js"
          color={primaryColor}
          icon="📥"
        />

        <Node
          x={245}
          y={415}
          width={150}
          height={70}
          label="Event Processor"
          sublabel="Redis-backed De-dupe"
          color={primaryColor}
          icon="⚙️"
        />

        {/* CORE PROCESSING */}
        <rect
          x={480}
          y={100}
          width={180}
          height={300}
          rx={16}
          fill="rgba(124,58,237,0.03)"
          stroke="rgba(124,58,237,0.15)"
          strokeWidth={1}
        />
        <text
          x={495}
          y={125}
          fill={secondaryColor}
          fontSize={10}
          fontWeight={700}
          fontFamily="var(--font-space-mono)"
          letterSpacing="0.1em"
        >
          CORE PROCESSING
        </text>
        <Node
          x={495}
          y={145}
          width={150}
          height={70}
          label="Causality Engine"
          sublabel="AI Scoring Model"
          color={secondaryColor}
          icon="🧠"
        />
        <Node
          x={495}
          y={235}
          width={150}
          height={70}
          label="Ingestion Service"
          sublabel="Parallel Swarm Analysis"
          color={secondaryColor}
          icon="⚡"
        />
        <Node
          x={495}
          y={315}
          width={150}
          height={70}
          label="Results Processor"
          sublabel="Impact Mapping"
          color={secondaryColor}
          icon="🔍"
        />

        {/* DATA STORAGE */}
        <rect
          x={730}
          y={80}
          width={150}
          height={360}
          rx={16}
          fill="rgba(16,185,129,0.03)"
          stroke="rgba(16,185,129,0.15)"
          strokeWidth={1}
        />
        <text
          x={745}
          y={105}
          fill={accentColor}
          fontSize={10}
          fontWeight={700}
          fontFamily="var(--font-space-mono)"
          letterSpacing="0.1em"
        >
          DATA STORAGE
        </text>
        <Node
          x={745}
          y={125}
          width={120}
          height={70}
          label="PostgreSQL"
          sublabel="Incident Records"
          color={accentColor}
          icon="DB"
        />
        <Node
          x={745}
          y={225}
          width={120}
          height={70}
          label="Redis"
          sublabel="Hot Event Cache"
          color={dangerColor}
          icon="CD"
        />
        <Node
          x={745}
          y={325}
          width={120}
          height={70}
          label="SQS Queue"
          sublabel="Async Jobs"
          color={warningColor}
          icon="SQ"
        />

        {/* API SERVER */}
        <Node
          x={950}
          y={220}
          width={150}
          height={90}
          label="API Server"
          sublabel="Express.js REST API"
          color="#3b82f6"
          icon="🚀"
        />

        {/* OUTPUT CLIENTS */}
        <text
          x={1140}
          y={40}
          fill={mutedColor}
          fontSize={10}
          fontWeight={700}
          fontFamily="var(--font-space-mono)"
          letterSpacing="0.1em"
        >
          {'// OUTPUT CLIENTS'}
        </text>
        <Node
          x={1140}
          y={60}
          width={140}
          height={70}
          label="Mobile App"
          sublabel="Push Notifications"
          color="#f1f5f9"
          icon="📱"
        />
        <Node
          x={1140}
          y={150}
          width={140}
          height={70}
          label="React Dashboard"
          sublabel="Admin Interface"
          color="#f1f5f9"
          icon="💻"
        />
        <Node
          x={1140}
          y={240}
          width={140}
          height={70}
          label="Webhooks API"
          sublabel="Third-party Integrations"
          color={primaryColor}
          icon="🔗"
        />
        <Node
          x={1140}
          y={410}
          width={140}
          height={70}
          label="Slack Bot"
          sublabel="Instant Root Cause"
          color="#4A154B"
          icon="💬"
        />

        {/* LEGEND */}
        <g transform="translate(1000, 500)">
          <line x1="0" y1="0" x2="30" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
          <text x="40" y="4" fill="var(--muted)" fontSize={10} fontFamily="var(--font-space-mono)">
            Sync flow
          </text>
          <line
            x1="120"
            y1="0"
            x2="150"
            y2="0"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <text x="160" y="4" fill="var(--muted)" fontSize={10} fontFamily="var(--font-space-mono)">
            Async
          </text>
        </g>
      </svg>
    </div>
  );
}
