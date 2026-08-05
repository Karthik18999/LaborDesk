'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Bell, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function AdminNotificationsPage() {
  const { notifications, markNotificationRead } = useApp();
  const adminNotifs = notifications.filter((n) => n.recipientRole === 'admin');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin System Notifications</h2>
          <p className="text-xs text-slate-500">Real-time alerts for new registrations, requests, and payments.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
        {adminNotifs.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-8">No notifications recorded.</p>
        ) : (
          adminNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                !n.read
                  ? 'bg-brand-50/50 dark:bg-brand-950/40 border-brand-200 dark:border-brand-900'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-brand-600/10 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</h4>
                  <span className="text-[11px] text-slate-400">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
