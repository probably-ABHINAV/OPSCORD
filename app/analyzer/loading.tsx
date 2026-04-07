export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050a14" }}>
      <div style={{ textAlign: "center", color: "var(--muted)" }}>
        <div style={{ display: "inline-block", width: 40, height: 40, border: "3px solid rgba(99,102,241,0.3)", borderTopColor: "#6366f1", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: 20 }}></div>
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 13, letterSpacing: "0.1em" }}>INITIALIZING ANALYZER...</div>
      </div>
    </div>
  );
}
