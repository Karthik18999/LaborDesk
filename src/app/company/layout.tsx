'use client';

import React, { useEffect } from 'react';
import CompanySidebar from '@/components/shared/CompanySidebar';
import Header from '@/components/shared/Header';
import { useApp } from '@/lib/store';

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const { setRole } = useApp();

  useEffect(() => {
    setRole('company');
  }, [setRole]);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <CompanySidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Company Client Dashboard" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
