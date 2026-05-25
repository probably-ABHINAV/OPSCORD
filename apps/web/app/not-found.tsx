import Link from 'next/link';
import { AlertTriangle, Terminal, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary text-text font-mono p-6">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <AlertTriangle className="w-16 h-16 animate-pulse" />
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter">404</h1>
          </div>
          <h2 className="text-xl md:text-2xl text-text/80 uppercase tracking-widest text-center">
            Page Not Found
          </h2>
        </div>

        {/* System Log Panel */}
        <div className="w-full border border-border bg-black/40 rounded-md p-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
          <div className="flex items-center space-x-2 text-text/50 mb-4 text-sm border-b border-border/50 pb-2">
            <Terminal className="w-4 h-4" />
            <span>syslog_tail.sh</span>
          </div>
          <div className="space-y-2 text-sm md:text-base text-text/80">
            <p>
              <span className="text-red-400 font-bold">[ERROR]</span> ERR_RESOURCE_NOT_LOCATED
            </p>
            <p>
              <span className="text-blue-400 font-bold">[INFO]</span> Target endpoint does not exist
              in the routing table.
            </p>
            <p>
              <span className="text-yellow-400 font-bold">[WARN]</span> Please verify the URL or
              return to the active monitoring console.
            </p>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex justify-center pt-4">
          <Link
            href="/dashboard"
            className="glow-btn flex items-center space-x-2 px-6 py-3 border border-border rounded-md bg-transparent hover:bg-white/5 transition-all group"
          >
            <span>Return to Command Center</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
