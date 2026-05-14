export interface Event {
  id: string;
  projectId: string;
  source: string;
  type: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  payload: Record<string, unknown>;
  message: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  orgId: string;
}
