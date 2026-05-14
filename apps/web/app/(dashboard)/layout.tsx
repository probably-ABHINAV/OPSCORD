import React from 'react';
import Sidebar from '@/components/core/Sidebar';
import Header from '@/components/core/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-bg-primary text-text overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
