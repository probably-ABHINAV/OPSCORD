import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#050a14",
        "bg-card": "rgba(14,22,45,0.9)",
        border: "rgba(99,139,255,0.15)",
        blue: "#3b82f6",
        violet: "#7c3aed",
        sky: "#38bdf8",
        text: "#f1f5f9",
        muted: "#64748b",
        green: "#10b981",
        red: "#ef4444",
        amber: "#f59e0b",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
