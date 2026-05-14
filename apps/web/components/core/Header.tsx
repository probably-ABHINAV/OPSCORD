import React from 'react';
import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-bg-primary">
      <div className="flex items-center w-full max-w-md bg-bg-surface border border-border rounded-md px-3 py-1.5 focus-within:border-border-hover transition-colors">
        <Search className="w-4 h-4 text-muted mr-2" />
        <input
          type="text"
          placeholder="Search incidents, logs, or metrics..."
          className="bg-transparent border-none outline-none text-sm w-full font-mono placeholder:text-muted text-text"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted hover:text-text transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red rounded-full" />
        </button>
      </div>
    </header>
  );
}
