// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OpsCord — Mock Data
// All mock data used across the application
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface EventItem {
  src: string;
  type: string;
  msg: string;
  color: string;
  icon: string;
}

export const EVENTS: EventItem[] = [
  {
    src: 'GitHub',
    type: 'push',
    msg: 'feat: causality scoring engine v2',
    color: '#f0883e',
    icon: '⬡',
  },
  {
    src: 'CircleCI',
    type: 'build',
    msg: 'pipeline #2847 passed — 3m 12s',
    color: '#00D4AA',
    icon: '◎',
  },
  { src: 'K8s', type: 'pod', msg: 'pod/api-7f8b crash-loop detected', color: '#326CE5', icon: '⎈' },
  {
    src: 'Datadog',
    type: 'alert',
    msg: 'p99 latency spike: 320ms → 4.2s',
    color: '#a78bfa',
    icon: '◈',
  },
  {
    src: 'GitHub',
    type: 'webhook',
    msg: 'PR #142 merged to main by @dev',
    color: '#f0883e',
    icon: '⬡',
  },
  {
    src: 'CircleCI',
    type: 'deploy',
    msg: 'deployed sha:8a3f2c to production',
    color: '#00D4AA',
    icon: '◎',
  },
  {
    src: 'K8s',
    type: 'scale',
    msg: 'HPA scaled api-deployment to 8 pods',
    color: '#326CE5',
    icon: '⎈',
  },
  {
    src: 'Datadog',
    type: 'metric',
    msg: 'error rate 0.3% → 2.8% sustained',
    color: '#a78bfa',
    icon: '◈',
  },
  {
    src: 'SQS',
    type: 'queue',
    msg: 'queue depth exceeded: 18,432 msgs',
    color: '#FF9900',
    icon: '⬢',
  },
  {
    src: 'Redis',
    type: 'cache',
    msg: 'cache miss storm — 94% miss rate',
    color: '#DC382D',
    icon: '◆',
  },
];

export interface Incident {
  id: string;
  title: string;
  source: string;
  sourceIcon: string;
  sourceColor: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  severityColor: string;
  causalityScore: number;
  status: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved';
  statusColor: string;
  time: string;
}

export const INCIDENTS: Incident[] = [
  {
    id: 'INC-001',
    title: 'K8s pod OOMKilled → service degradation',
    source: 'K8s',
    sourceIcon: '⎈',
    sourceColor: '#326CE5',
    severity: 'Critical',
    severityColor: '#ef4444',
    causalityScore: 87,
    status: 'Investigating',
    statusColor: '#f59e0b',
    time: '2m ago',
  },
  {
    id: 'INC-002',
    title: 'CircleCI deploy #2847 triggered pod restart',
    source: 'CircleCI',
    sourceIcon: '◎',
    sourceColor: '#00D4AA',
    severity: 'High',
    severityColor: '#f97316',
    causalityScore: 64,
    status: 'Identified',
    statusColor: '#3b82f6',
    time: '8m ago',
  },
  {
    id: 'INC-003',
    title: 'Redis cache miss storm — 94% miss rate',
    source: 'Redis',
    sourceIcon: '◆',
    sourceColor: '#DC382D',
    severity: 'High',
    severityColor: '#f97316',
    causalityScore: 31,
    status: 'Monitoring',
    statusColor: '#7c3aed',
    time: '14m ago',
  },
  {
    id: 'INC-004',
    title: 'Datadog metric anomaly: p99 latency spike',
    source: 'Datadog',
    sourceIcon: '◈',
    sourceColor: '#a78bfa',
    severity: 'Medium',
    severityColor: '#eab308',
    causalityScore: 52,
    status: 'Resolved',
    statusColor: '#10b981',
    time: '31m ago',
  },
  {
    id: 'INC-005',
    title: 'GitHub webhook delivery failure burst',
    source: 'GitHub',
    sourceIcon: '⬡',
    sourceColor: '#f0883e',
    severity: 'Low',
    severityColor: '#64748b',
    causalityScore: 18,
    status: 'Resolved',
    statusColor: '#10b981',
    time: '1h ago',
  },
];

export const CHART_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  events: Math.floor(400 + Math.random() * 1000),
  incidents: Math.floor(1 + Math.random() * 12),
}));

export const HERO_NODES = [
  { label: 'CircleCI', x: 0.14, y: 0.35, color: '#00D4AA' },
  { label: 'GitHub', x: 0.14, y: 0.52, color: '#f0883e' },
  { label: 'K8s', x: 0.14, y: 0.68, color: '#326CE5' },
  { label: 'Datadog', x: 0.14, y: 0.84, color: '#632CA6' },
  { label: 'Webhook Rx', x: 0.36, y: 0.44, color: '#3b82f6' },
  { label: 'Normalizer', x: 0.52, y: 0.44, color: '#3b82f6' },
  { label: 'AI Scoring', x: 0.67, y: 0.55, color: '#7c3aed', big: true },
  { label: 'PostgreSQL', x: 0.82, y: 0.36, color: '#336791' },
  { label: 'Redis', x: 0.82, y: 0.54, color: '#DC382D' },
  { label: 'Slack', x: 0.93, y: 0.44, color: '#4A154B' },
];

export const HERO_EDGES: [number, number][] = [
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [6, 8],
  [7, 9],
  [8, 9],
];

export const INTEGRATION_LOGOS = [
  'CircleCI',
  'GitHub',
  'Kubernetes',
  'Datadog',
  'AWS SQS',
  'Redis',
  'PostgreSQL',
  'Express.js',
  'Slack',
  'React',
];
