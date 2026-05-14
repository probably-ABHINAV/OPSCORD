import { create } from 'zustand';

export interface Incident {
  id: string;
  projectId: string;
  title: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  createdAt: string;
}

interface IncidentStore {
  activeIncidents: Record<string, Incident>; // Keyed by ID for O(1) updates

  // Actions
  setIncidents: (incidents: Incident[]) => void;
  upsertIncident: (incident: Incident) => void;
  removeIncident: (id: string) => void;
}

export const useIncidentStore = create<IncidentStore>((set) => ({
  activeIncidents: {},

  setIncidents: (incidents) =>
    set((state) => {
      const newRecord: Record<string, Incident> = {};
      incidents.forEach((inc) => {
        newRecord[inc.id] = inc;
      });
      return { activeIncidents: newRecord };
    }),

  upsertIncident: (incident) =>
    set((state) => ({
      activeIncidents: {
        ...state.activeIncidents,
        [incident.id]: incident,
      },
    })),

  removeIncident: (id) =>
    set((state) => {
      const next = { ...state.activeIncidents };
      delete next[id];
      return { activeIncidents: next };
    }),
}));
