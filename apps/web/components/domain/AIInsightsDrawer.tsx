'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AIInsightsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  incident: {
    id: string;
    title: string;
    source: string;
    severity: string;
    causalityScore: number;
  } | null;
}

const AI_ANALYSIS_LINES = [
  '▸ Initiating root cause analysis...',
  '▸ Cross-referencing 847 events across 4 sources',
  '▸ Temporal correlation detected: GitHub push → K8s restart',
  '',
  '━━━ ROOT CAUSE ANALYSIS ━━━',
  '',
  'PRIMARY CAUSE (87% confidence):',
  '  Commit sha:8a3f2c introduced a memory leak in the',
  '  /api/v1/ingest handler. The leak caused pod memory',
  '  to exceed the 512Mi limit, triggering OOMKill.',
  '',
  'CONTRIBUTING FACTORS:',
  '  • CircleCI deploy #2847 pushed to production at 14:32 UTC',
  '  • HPA scaled to 8 pods, masking the leak for ~6 minutes',
  '  • Redis cache miss rate spiked to 94% as pods restarted',
  '',
  'RECOMMENDED ACTIONS:',
  '  1. Revert commit sha:8a3f2c immediately',
  '  2. Increase pod memory limit to 768Mi as a temporary fix',
  '  3. Add memory profiling to the CI pipeline',
  '',
  '▸ Analysis complete. 3 actions recommended.',
];

export default function AIInsightsDrawer({ isOpen, onClose, incident }: AIInsightsDrawerProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !incident) {
      setVisibleLines([]);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setVisibleLines([]);
    let lineIndex = 0;

    const interval = setInterval(() => {
      if (lineIndex < AI_ANALYSIS_LINES.length) {
        setVisibleLines((prev) => [...prev, AI_ANALYSIS_LINES[lineIndex]!]);
        lineIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isOpen, incident]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-lg z-50 flex flex-col"
        style={{
          background: 'rgba(10, 10, 10, 0.95)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px)',
          animation: 'slideInRight 0.2s ease-out',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">
              AI Causality Engine
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors font-mono text-sm"
          >
            ESC ✕
          </button>
        </div>

        {/* Incident Context */}
        {incident && (
          <div className="px-6 py-4 border-b border-border shrink-0">
            <p className="text-xs text-muted font-mono uppercase tracking-wider mb-2">
              Analyzing Incident
            </p>
            <p className="text-sm font-medium">{incident.title}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-mono text-xs text-muted">{incident.source}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-red/10 border border-red/20 text-red">
                {incident.severity}
              </span>
              <span className="font-mono text-xs text-cyan">
                {incident.causalityScore}% confidence
              </span>
            </div>
          </div>
        )}

        {/* Terminal Output */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-auto px-6 py-4"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className="text-xs leading-6"
              style={{
                color: line.startsWith('PRIMARY CAUSE')
                  ? '#F31260'
                  : line.startsWith('CONTRIBUTING')
                    ? '#F5A623'
                    : line.startsWith('RECOMMENDED')
                      ? '#17c964'
                      : line.startsWith('━')
                        ? '#50E3C2'
                        : line.startsWith('▸')
                          ? '#888888'
                          : '#EDEDED',
                animation: 'fadeIn 0.15s ease-out',
              }}
            >
              {line || '\u00A0'}
            </div>
          ))}
          {isTyping && <span className="inline-block w-2 h-4 bg-cyan animate-pulse" />}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border shrink-0 flex gap-3">
          <button className="flex-1 bg-bg-surface border border-border text-text text-xs font-mono py-2.5 rounded-md hover:border-border-hover transition-colors">
            Export Report
          </button>
          <button className="flex-1 bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono py-2.5 rounded-md hover:bg-cyan/20 transition-colors">
            Auto-Remediate →
          </button>
        </div>
      </div>
    </>
  );
}
