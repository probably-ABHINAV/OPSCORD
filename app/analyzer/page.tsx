"use client";

import React, { useState } from "react";
import Link from "next/link";
import { analyzeCode, AnalysisResult } from "@/app/actions/analyzeCode";

export default function AnalyzerPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeCode(url);
      setResult(res);
    } catch (e: any) {
      setResult({ success: false, error: e.message || String(e) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050a14", color: "#f1f5f9", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav
        style={{
          background: "rgba(5,10,20,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          height: 60,
          padding: "0 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="gradient-text" style={{ fontFamily: "var(--font-space-mono)", fontSize: 20, fontWeight: 700 }}>
            OpsCord // Analyzer
          </span>
        </Link>
      </nav>

      <main style={{ flex: 1, padding: "40px 5vw", maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.03em" }}>
            Identify <span style={{ color: "#ef4444" }}>Vulnerabilities</span>
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 18 }}>
            Paste a raw GitHub file URL to extract its code and score its risk.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, maxWidth: 600, margin: "0 auto", marginBottom: 60 }}>
          <input
            type="url"
            required
            placeholder="https://raw.githubusercontent.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "14px 16px",
              color: "white",
              fontSize: 16,
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="glow-btn"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
              border: "none",
              borderRadius: 8,
              padding: "0 28px",
              color: "white",
              fontWeight: 700,
              fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div style={{ display: "inline-block", width: 40, height: 40, border: "3px solid rgba(99,102,241,0.3)", borderTopColor: "#6366f1", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: 20 }}></div>
            <p style={{ color: "var(--muted)", fontFamily: "var(--font-space-mono)", fontSize: 13 }}>EXTRACTING CODE & SCORING CAUSALITY...</p>
          </div>
        )}

        {/* Result Area */}
        {result && (
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            {!result.success ? (
              <div style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", padding: 20, borderRadius: 12, color: "#fca5a5" }}>
                <strong>Error: </strong> {result.error}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
                {/* Left Col: Code Snippet & Explanation */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                   <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ background: "rgba(0,0,0,0.4)", padding: "12px 16px", borderBottom: "1px solid var(--border)", fontFamily: "var(--font-space-mono)", fontSize: 12, color: "var(--muted)" }}>
                      // Identified Wrong Code Snippet
                    </div>
                    <div style={{ padding: 24, overflowX: "auto" }}>
                      <pre style={{ margin: 0, color: "#f1f5f9", fontSize: 14 }}>
                        <code>{result.data?.wrongCodeSnippet}</code>
                      </pre>
                    </div>
                   </div>

                   <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
                     <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Issue Explanation</h3>
                     <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>{result.data?.explanation}</p>
                   </div>
                </div>

                {/* Right Col: Score & Timeline */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(15,23,42,1) 100%)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: 32, textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "#fca5a5", letterSpacing: "0.1em", marginBottom: 12 }}>RISK SCORE</p>
                    <div style={{ fontSize: 72, fontWeight: 800, color: "#ef4444", lineHeight: 1 }}>
                      {result.data?.riskScore}
                    </div>
                    <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 12 }}>out of 100</p>
                  </div>

                  <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
                    <h4 style={{ fontSize: 13, fontFamily: "var(--font-space-mono)", color: "var(--muted)", letterSpacing: "0.1em", marginBottom: 16 }}>RESOLUTION TIMELINE</h4>
                    <div style={{ display: "inline-block", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", padding: "6px 12px", borderRadius: 8, fontWeight: 700, fontSize: 14, marginBottom: 20 }}>
                      ~ {result.data?.timeline}
                    </div>
                    
                    <h5 style={{ fontSize: 12, fontFamily: "var(--font-space-mono)", color: "var(--muted)", marginBottom: 12 }}>ACTION PLAN:</h5>
                    <ul style={{ paddingLeft: 16, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {result.data?.steps.map((step, i) => (
                        <li key={i} style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.5 }}>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
