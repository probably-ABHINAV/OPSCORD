import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#000000',
        'bg-card': '#0A0A0A',
        'bg-surface': '#111111',
        border: 'rgba(255, 255, 255, 0.1)',
        'border-hover': 'rgba(255, 255, 255, 0.2)',
        blue: '#0070F3',
        cyan: '#50E3C2',
        text: '#EDEDED',
        muted: '#888888',
        green: '#17c964',
        red: '#F31260',
        amber: '#F5A623',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
