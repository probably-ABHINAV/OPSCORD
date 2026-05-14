'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, ShieldAlert, LayoutDashboard, Settings, Sparkles, Bell } from 'lucide-react';

const navItems = [
  { name: 'Incidents', href: '/incidents', icon: ShieldAlert },
  { name: 'Metrics', href: '/metrics', icon: Activity },
  { name: 'Infrastructure', href: '/infrastructure', icon: LayoutDashboard },
];

const secondaryItems = [{ name: 'Settings', href: '/settings', icon: Settings }];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full border-r border-border bg-bg-card flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <span className="font-mono text-base font-bold tracking-[0.2em] uppercase text-text">
          OPSCORD
        </span>
        <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan/10 border border-cyan/20 text-cyan">
          v0.1
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-auto">
        <div>
          <p className="px-3 text-[10px] font-mono text-muted uppercase tracking-[0.15em] mb-2">
            Platform
          </p>
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-150 ${
                    isActive
                      ? 'bg-bg-surface text-text border border-border'
                      : 'text-muted hover:text-text hover:bg-bg-surface/50 border border-transparent'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-cyan' : 'text-muted'}`} />
                  <span className="font-mono text-xs">{item.name}</span>
                  {item.name === 'Incidents' && (
                    <span className="ml-auto w-5 h-5 rounded-full bg-red/15 border border-red/25 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-red font-bold">3</span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="px-3 text-[10px] font-mono text-muted uppercase tracking-[0.15em] mb-2">
            Intelligence
          </p>
          <div className="space-y-0.5">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md text-muted hover:text-text hover:bg-bg-surface/50 border border-transparent transition-all duration-150">
              <Sparkles className="w-4 h-4 text-cyan" />
              <span className="font-mono text-xs">AI Insights</span>
              <span className="ml-auto text-[10px] font-mono text-cyan bg-cyan/10 border border-cyan/20 px-1.5 py-0.5 rounded">
                Live
              </span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md text-muted hover:text-text hover:bg-bg-surface/50 border border-transparent transition-all duration-150">
              <Bell className="w-4 h-4 text-muted" />
              <span className="font-mono text-xs">Notifications</span>
            </button>
          </div>
        </div>

        <div>
          <p className="px-3 text-[10px] font-mono text-muted uppercase tracking-[0.15em] mb-2">
            System
          </p>
          <div className="space-y-0.5">
            {secondaryItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-150 ${
                    isActive
                      ? 'bg-bg-surface text-text border border-border'
                      : 'text-muted hover:text-text hover:bg-bg-surface/50 border border-transparent'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-cyan' : 'text-muted'}`} />
                  <span className="font-mono text-xs">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center font-mono text-[11px] font-bold text-white">
            JD
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">Jane Doe</span>
            <span className="text-[11px] text-muted font-mono truncate">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
