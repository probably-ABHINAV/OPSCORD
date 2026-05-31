'use client';

import React, { useState, useEffect } from 'react';
import { INCIDENTS } from '@/lib/mockData';
import AIInsightsDrawer from '@/components/domain/AIInsightsDrawer';
import AlertTimeline from '@/components/domain/AlertTimeline';
import IncidentsLoading from './loading';

export default function IncidentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<(typeof INCIDENTS)[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <IncidentsLoading />;

  const handleAnalyze = (incident: (typeof INCIDENTS)[0]) => {
    setSelectedIncident(incident);
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Incidents</h1>
          <p className="text-muted text-sm font-mono mt-1">
            {INCIDENTS.filter((i) => i.status !== 'Resolved').length} active · {INCIDENTS.length}{' '}
            total
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-bg-surface border border-border text-text hover:border-border-hover px-4 py-2 rounded-md font-mono text-xs transition-colors">
            Export
          </button>
          <button className="bg-text text-bg-primary hover:bg-white px-4 py-2 rounded-md font-mono text-xs font-bold transition-colors">
            Acknowledge All
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Incident Table — Left */}
        <div className="flex-1 min-w-0 border border-border bg-bg-card rounded-lg overflow-hidden flex flex-col">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg-surface">
                <th className="py-3 px-4 font-mono text-[11px] text-muted uppercase tracking-wider font-medium">
                  ID
                </th>
                <th className="py-3 px-4 font-mono text-[11px] text-muted uppercase tracking-wider font-medium">
                  Severity
                </th>
                <th className="py-3 px-4 font-mono text-[11px] text-muted uppercase tracking-wider font-medium">
                  Title
                </th>
                <th className="py-3 px-4 font-mono text-[11px] text-muted uppercase tracking-wider font-medium">
                  Source
                </th>
                <th className="py-3 px-4 font-mono text-[11px] text-muted uppercase tracking-wider font-medium text-right">
                  Causality
                </th>
                <th className="py-3 px-4 font-mono text-[11px] text-muted uppercase tracking-wider font-medium">
                  Status
                </th>
                <th className="py-3 px-4 font-mono text-[11px] text-muted uppercase tracking-wider font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {INCIDENTS.map((incident) => (
                <tr
                  key={incident.id}
                  className="border-b border-border hover:bg-bg-surface/50 transition-colors cursor-pointer group"
                  onClick={() => handleAnalyze(incident)}
                >
                  <td className="py-3 px-4 font-mono text-xs text-muted">{incident.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: incident.severityColor }}
                      />
                      <span
                        className="font-mono text-[11px] font-medium"
                        style={{ color: incident.severityColor }}
                      >
                        {incident.severity}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium group-hover:text-blue transition-colors max-w-xs truncate">
                    {incident.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs" style={{ color: incident.sourceColor }}>
                      {incident.sourceIcon} {incident.source}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-sm font-bold text-cyan">
                      {incident.causalityScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="font-mono text-[11px] font-medium px-2 py-1 rounded"
                      style={{
                        color: incident.statusColor,
                        background: incident.statusColor + '15',
                        border: `1px solid ${incident.statusColor}30`,
                      }}
                    >
                      {incident.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs text-muted">{incident.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alert Timeline — Right sidebar */}
        <div className="w-80 shrink-0 border border-border bg-bg-card rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-border bg-bg-surface">
            <p className="font-mono text-[11px] text-muted uppercase tracking-wider">
              Event Timeline
            </p>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <AlertTimeline />
          </div>
        </div>
      </div>

      {/* AI Insights Drawer */}
      <AIInsightsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        incident={
          selectedIncident
            ? {
                id: selectedIncident.id,
                title: selectedIncident.title,
                source: selectedIncident.source,
                severity: selectedIncident.severity,
                causalityScore: selectedIncident.causalityScore,
              }
            : null
        }
      />
    </div>
  );
}
