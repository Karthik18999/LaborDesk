'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Clock, CheckCircle2, Building2, UserCheck, Calendar, MapPin, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function ActiveRequestsPage() {
  const { currentCompany, requests } = useApp();
  const companyRequests = requests.filter((r) => r.companyId === currentCompany?.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Active & Completed Requests Timeline</h2>
          <p className="text-xs text-slate-500">Live progress tracking of worker matching and dispatch steps.</p>
        </div>

        <Link
          href="/company/request-workers"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Create New Request
        </Link>
      </div>

      <div className="space-y-6">
        {companyRequests.map((req) => (
          <div
            key={req.id}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-slate-400 font-bold">{req.id}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {req.numberOfWorkers} {req.subSkill} ({req.skillRequired})
                </h3>
              </div>

              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
                {req.workflowStatus}
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 text-xs p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-slate-500 block">Reporting Date & Time</span>
                <span className="font-semibold text-slate-900 dark:text-white">{req.reportingDate} @ {req.reportingTime}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Daily Wage Offered</span>
                <span className="font-bold text-emerald-600">₹{req.dailyWageOffered} / day</span>
              </div>
              <div>
                <span className="text-slate-500 block">Site Location</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">{req.location}</span>
              </div>
            </div>

            {/* Visual Workflow Stepper Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Dispatch Progress</span>
                <span className="text-emerald-600">{req.workflowStatus}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 via-brand-500 to-blue-500 h-full w-[70%]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
