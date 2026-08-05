'use client';

import React, { useEffect } from 'react';
import AdminSidebar from '@/components/shared/AdminSidebar';
import Header from '@/components/shared/Header';
import { useApp } from '@/lib/store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { setRole } = useApp();

  useEffect(() => {
    setRole('admin');
  }, [setRole]);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Admin Operations Console" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
