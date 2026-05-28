'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'overview' | 'root-cause' | 'actions';

export const AISummaryCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isRemediating, setIsRemediating] = useState<boolean>(false);
  const [remediationStep, setRemediationStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [promptText, setPromptText] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: 'user' | 'gemini'; text: string }>
  >([]);

  const handleRemediate = () => {
    setIsRemediating(true);
    setRemediationStep(1);

    // Simulate step 1
    setTimeout(() => {
      setRemediationStep(2);

      // Simulate step 2
      setTimeout(() => {
        setRemediationStep(3);

        // Simulate completion
        setTimeout(() => {
          setIsRemediating(false);
          setIsCompleted(true);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    const userMsg = promptText;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setPromptText('');

    // Gemini typing response simulation
    setTimeout(() => {
      let reply = 'Analyzing telemetry context... ';
      if (userMsg.toLowerCase().includes('rollback') || userMsg.toLowerCase().includes('fix')) {
        reply =
          'I recommend executing the rollback script for Deploy #2847. Memory heap traces indicate a severe memory leak introduced in auth-service node.js libraries.';
      } else if (
        userMsg.toLowerCase().includes('oom') ||
        userMsg.toLowerCase().includes('memory')
      ) {
        reply =
          'The OOM killed event was triggered by Pod `payment-service-6f8d9b4c-2g7z` exceeding its 512Mi limit. Recommending upgrading configuration template to 1Gi.';
      } else {
        reply =
          "I've cross-referenced current logs with past incidents. The pattern matches an auth-token encryption loop anomaly detected 12 days ago. I suggest monitoring CPU utilization and restarting the auth worker pool.";
      }
      setChatMessages((prev) => [...prev, { sender: 'gemini', text: reply }]);
    }, 1000);
  };

  return (
    <div
      className="card"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: 'rgba(10, 15, 30, 0.6)',
        border: '1px solid rgba(124, 58, 237, 0.25)',
        boxShadow: '0 8px 32px 0 rgba(124, 58, 237, 0.05)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Card Header */}
      <div
        style={{
          padding: '16px 20px',
          background:
            'linear-gradient(90deg, rgba(124,58,237,0.15) 0%, rgba(99,102,241,0.05) 100%)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              position: 'relative',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(124, 58, 237, 0.5)',
            }}
          >
            <span style={{ fontSize: 13, color: '#fff' }}>✨</span>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.4)',
                animation: 'pulseGlow 2.5s infinite',
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 14,
                color: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Gemini Incident Intelligence
              <span
                style={{
                  fontSize: 9,
                  background: 'rgba(124,58,237,0.2)',
                  color: '#c4b5fd',
                  border: '1px solid rgba(124,58,237,0.4)',
                  borderRadius: 4,
                  padding: '1px 5px',
                  fontFamily: 'var(--font-space-mono)',
                  letterSpacing: '0.05em',
                }}
              >
                PRO
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'var(--font-space-mono)' }}>
              Target: INC-001 (Kubernetes Pod Crash)
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 8,
            padding: 3,
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {(['overview', 'root-cause', 'actions'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === tab ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
                color: activeTab === tab ? '#c4b5fd' : '#64748b',
                transition: 'all 0.2s',
              }}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'root-cause' && 'Root Cause'}
              {tab === 'actions' && 'Remediation'}
            </button>
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div
        style={{ padding: 20, minHeight: 280, flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}
            >
              {/* Natural Language Summary */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: '#cbd5e1',
                }}
              >
                <strong style={{ color: '#a78bfa' }}>Summary:</strong> A critical OOM (Out of
                Memory) event occurred on pod{' '}
                <code
                  style={{
                    color: '#f43f5e',
                    fontFamily: 'var(--font-space-mono)',
                    background: 'rgba(244,63,94,0.1)',
                    padding: '1px 4px',
                    borderRadius: 4,
                  }}
                >
                  payment-service-6f8d9b4c
                </code>
                . This coincided with a 15% traffic spike in auth endpoints and deployment of{' '}
                <code style={{ color: '#60a5fa', fontFamily: 'var(--font-space-mono)' }}>
                  v2.4.1 (Deploy #2847)
                </code>
                . Downstream, API response times degraded to 4.2s (P99).
              </div>

              {/* Telemetry Snapshot */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <div
                  style={{
                    background: 'rgba(239,68,68,0.05)',
                    border: '1px solid rgba(239,68,68,0.1)',
                    borderRadius: 8,
                    padding: 10,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: '#fca5a5',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Impact Scope
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#f43f5e', marginTop: 4 }}>
                    4,821{' '}
                    <span style={{ fontSize: 10, fontWeight: 400, color: '#94a3b8' }}>Sess</span>
                  </div>
                </div>
                <div
                  style={{
                    background: 'rgba(245,158,11,0.05)',
                    border: '1px solid rgba(245,158,11,0.1)',
                    borderRadius: 8,
                    padding: 10,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: '#fde047',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Latency Spike
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#fbbf24', marginTop: 4 }}>
                    +4.1s{' '}
                    <span style={{ fontSize: 10, fontWeight: 400, color: '#94a3b8' }}>P99</span>
                  </div>
                </div>
                <div
                  style={{
                    background: 'rgba(16,185,129,0.05)',
                    border: '1px solid rgba(16,185,129,0.1)',
                    borderRadius: 8,
                    padding: 10,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: '#a7f3d0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    AI Confidence
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#34d399', marginTop: 4 }}>
                    94.2%
                  </div>
                </div>
              </div>

              {/* Custom Assistant Mini Chat */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
                <div
                  style={{
                    maxHeight: 110,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    paddingRight: 4,
                  }}
                >
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        background:
                          msg.sender === 'user' ? 'rgba(99,102,241,0.2)' : 'rgba(124,58,237,0.1)',
                        border:
                          msg.sender === 'user'
                            ? '1px solid rgba(99,102,241,0.3)'
                            : '1px solid rgba(124,58,237,0.2)',
                        padding: '6px 10px',
                        borderRadius:
                          msg.sender === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                        fontSize: 11,
                        maxWidth: '90%',
                        color: msg.sender === 'user' ? '#e2e8f0' : '#d8b4fe',
                        fontFamily: 'var(--font-space-mono)',
                      }}
                    >
                      {msg.sender === 'user' ? '🙋 ' : '✨ '} {msg.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendPrompt} style={{ display: 'flex', gap: 6 }}>
                  <input
                    type="text"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="Ask Gemini to investigate..."
                    style={{
                      flex: 1,
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 11,
                      color: '#f8fafc',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'rgba(124,58,237,0.2)',
                      border: '1px solid rgba(124,58,237,0.4)',
                      color: '#c4b5fd',
                      borderRadius: 8,
                      padding: '0 12px',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Send
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'root-cause' && (
            <motion.div
              key="root-cause"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              {/* Correlation Graph Simulation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Anomalous Correlation Metrics
                </div>

                {/* Factor 1 */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 11,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: '#e2e8f0', fontWeight: 600 }}>
                      Deploy #2847 Regression
                    </span>
                    <span
                      style={{
                        color: '#ef4444',
                        fontFamily: 'var(--font-space-mono)',
                        fontWeight: 700,
                      }}
                    >
                      87% Correlated
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '87%' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #3b82f6, #ef4444)',
                      }}
                    />
                  </div>
                </div>

                {/* Factor 2 */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 11,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: '#e2e8f0', fontWeight: 600 }}>
                      Memory Limits Cap Exceeded
                    </span>
                    <span
                      style={{
                        color: '#f59e0b',
                        fontFamily: 'var(--font-space-mono)',
                        fontWeight: 700,
                      }}
                    >
                      91% Confidence
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '91%' }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #3b82f6, #f59e0b)',
                      }}
                    />
                  </div>
                </div>

                {/* Factor 3 */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 11,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: '#e2e8f0', fontWeight: 600 }}>
                      Shared DB Thread Pool Exhaustion
                    </span>
                    <span
                      style={{
                        color: '#3b82f6',
                        fontFamily: 'var(--font-space-mono)',
                        fontWeight: 700,
                      }}
                    >
                      42% Correlated
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '42%' }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                      style={{ height: '100%', background: '#3b82f6' }}
                    />
                  </div>
                </div>
              </div>

              {/* Micro graph description */}
              <div
                style={{
                  borderLeft: '2px solid rgba(124, 58, 237, 0.4)',
                  paddingLeft: 10,
                  fontSize: 11.5,
                  color: '#94a3b8',
                  lineHeight: 1.4,
                }}
              >
                Telemetry logs show Heap Memory Usage spiked immediately following the git webhook
                triggers for node-backend v2.4.1. Core event trace indicates OOM Killer terminated
                PID 42 within container layer.
              </div>
            </motion.div>
          )}

          {activeTab === 'actions' && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                AI Recommended Remediation Runbook
              </div>

              {/* Action Plan steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    background: 'rgba(255,255,255,0.02)',
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: isCompleted ? 'rgba(16,185,129,0.2)' : 'rgba(124, 58, 237, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      color: isCompleted ? '#10b981' : '#c4b5fd',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      margin: '2px auto',
                    }}
                  >
                    {isCompleted ? '✓' : '1'}
                  </div>
                  <div style={{ fontSize: 11.5 }}>
                    <div style={{ fontWeight: 700, color: '#f8fafc' }}>Rollback Deploy #2847</div>
                    <div style={{ color: '#94a3b8', fontSize: 10.5 }}>
                      Revert production cluster config to v2.4.0 deployment.
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    background: 'rgba(255,255,255,0.02)',
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: isCompleted ? 'rgba(16,185,129,0.2)' : 'rgba(124, 58, 237, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      color: isCompleted ? '#10b981' : '#c4b5fd',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      margin: '2px auto',
                    }}
                  >
                    {isCompleted ? '✓' : '2'}
                  </div>
                  <div style={{ fontSize: 11.5 }}>
                    <div style={{ fontWeight: 700, color: '#f8fafc' }}>
                      Scale up pod resources (payment-service)
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 10.5 }}>
                      Increase memory limits dynamically to 1024Mi.
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress animation */}
              {isRemediating && (
                <div
                  style={{
                    background: 'rgba(124, 58, 237, 0.05)',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 'auto',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 11,
                      color: '#c4b5fd',
                      marginBottom: 6,
                      fontFamily: 'var(--font-space-mono)',
                    }}
                  >
                    <span>
                      {remediationStep === 1 && '🚀 Connecting cluster orchestrator...'}
                      {remediationStep === 2 && '🔄 Rolling back Deployment #2847...'}
                      {remediationStep === 3 && '♻️ Restarting nodes and monitoring metrics...'}
                    </span>
                    <span>{remediationStep * 33}%</span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      animate={{ width: `${remediationStep * 33.3}%` }}
                      transition={{ duration: 1.5 }}
                      style={{ height: '100%', background: '#7c3aed' }}
                    />
                  </div>
                </div>
              )}

              {isCompleted && (
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 'auto',
                    fontSize: 11,
                    color: '#a7f3d0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span>🎉</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>Remediation Completed Successfully!</div>
                    <div style={{ fontSize: 10, color: '#6ee7b7' }}>
                      Cluster returned to stable baseline. Telemetry monitoring operational.
                    </div>
                  </div>
                </div>
              )}

              {!isRemediating && !isCompleted && (
                <button
                  onClick={handleRemediate}
                  style={{
                    marginTop: 'auto',
                    width: '100%',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '10px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
                >
                  Apply Auto-Remediation Plan
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Footer */}
      <div
        style={{
          padding: '10px 20px',
          background: 'rgba(0,0,0,0.2)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 10.5,
          color: '#64748b',
          fontFamily: 'var(--font-space-mono)',
        }}
      >
        <span>Model: Gemini Flash 1.5</span>
        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#10b981',
              animation: 'pulse 1.5s infinite',
            }}
          />
          Online Telemetry Agent
        </span>
      </div>
    </div>
  );
};
