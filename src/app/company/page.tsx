'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import {
  UserPlus,
  Users,
  Clock,
  CheckCircle2,
  Building2,
  IndianRupee,
  ArrowRight,
  ShieldCheck,
  Star,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

export default function CompanyDashboardPage() {
  const { currentCompany, requests, workers, payments } = useApp();

  const companyRequests = requests.filter((r) => r.companyId === currentCompany?.id);
  const activeRequests = companyRequests.filter((r) => r.workflowStatus !== 'Completed');
  const completedRequests = companyRequests.filter((r) => r.workflowStatus === 'Completed');

  // Assigned workers for this company
  const assignedWorkerIds = companyRequests.flatMap((r) => r.assignedWorkerIds);
  const assignedWorkers = workers.filter((w) => assignedWorkerIds.includes(w.id));

  const totalSpent = payments
    .filter((p) => p.companyId === currentCompany?.id && p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
            Enterprise Client Hub
          </span>
          <h2 className="text-2xl font-extrabold mt-2">{currentCompany?.companyName}</h2>
          <p className="text-xs text-slate-300 mt-1">
            GSTIN: {currentCompany?.gstNumber} • {currentCompany?.industry}
          </p>
        </div>

        <Link
          href="/company/request-workers"
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Request Skilled Workers
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Active Requests</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{activeRequests.length}</p>
          <p className="text-[11px] text-amber-600 font-semibold">Under Workflow Dispatch</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Assigned Workers On-Site</span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{assignedWorkers.length}</p>
          <p className="text-[11px] text-slate-500">Biometric & Aadhaar Verified</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Completed Orders</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{completedRequests.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">Successfully Deployed</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Total Wages Paid</span>
          <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">
            ₹{totalSpent.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-slate-500">Verified Invoice Receipts</p>
        </div>
      </div>

      {/* Live Active Requests Workflow */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Active Worker Request Workflow</h3>
            <p className="text-xs text-slate-500">Real-time status updates as admin matches and dispatches workers.</p>
          </div>
          <Link href="/company/active-requests" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            View All Active Requests →
          </Link>
        </div>

        {companyRequests.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No active worker requests found. Click "Request Skilled Workers" to submit your first requirement.
          </div>
        ) : (
          companyRequests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {req.numberOfWorkers} {req.subSkill} ({req.skillRequired})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Reporting: {req.reportingDate} @ {req.reportingTime} • Location: {req.location}
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold self-start sm:self-auto">
                  Status: {req.workflowStatus}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-blue-500 h-full w-[70%]" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Assigned Roster Preview */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Assigned Workers Roster</h3>
          <Link href="/company/assigned-workers" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            View Full Roster →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {assignedWorkers.map((worker) => (
            <div
              key={worker.id}
              className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center gap-3"
            >
              <img src={worker.photoUrl} alt="" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{worker.fullName}</h4>
                <p className="text-[11px] font-semibold text-emerald-600">{worker.subSkill}</p>
                <p className="text-[10px] text-slate-400">Emergency: {worker.emergencyContact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
