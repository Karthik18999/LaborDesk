'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { WorkflowStatus } from '@/lib/types';
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  UserCheck,
  Building2,
  ArrowRight,
  AlertCircle,
  ChevronRight,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';

const WORKFLOW_STAGES: WorkflowStatus[] = [
  'Pending',
  'Reviewing',
  'Searching Workers',
  'Workers Contacted',
  'Workers Confirmed',
  'Workers Assigned',
  'Workers Reached Site',
  'Completed',
];

export default function AdminRequestsPage() {
  const { requests, updateRequestWorkflow } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Worker Requests & Dispatch Timeline</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track and advance real-time request workflow states from Pending to Site Arrival.
          </p>
        </div>

        <Link
          href="/admin/assignments"
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Assign Workers to Active Request
        </Link>
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {requests.map((request) => {
          const currentStageIndex = WORKFLOW_STAGES.indexOf(request.workflowStatus);

          return (
            <div
              key={request.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6"
            >
              {/* Top Meta Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-600/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{request.companyName}</h3>
                      <span className="text-xs font-mono font-bold text-slate-400">({request.id})</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Requested on {request.createdAt} • Reporting Date: {request.reportingDate} @ {request.reportingTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      request.priority === 'Urgent'
                        ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                        : 'bg-brand-500/10 text-brand-600'
                    }`}
                  >
                    {request.priority} Priority
                  </span>

                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200">
                    Status: {request.workflowStatus}
                  </span>
                </div>
              </div>

              {/* Requirement Details Grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Required Trade:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {request.numberOfWorkers} {request.subSkill}(s)
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block">Site Location:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">{request.location}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Offered Wage:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{request.dailyWageOffered}/day</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Perks Provided:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {[
                      request.foodProvided && 'Food',
                      request.accommodationProvided && 'Lodging',
                      request.transportationProvided && 'Cab',
                    ]
                      .filter(Boolean)
                      .join(', ') || 'None'}
                  </span>
                </div>
              </div>

              {/* Workflow Stepper Timeline */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-900 dark:text-white">9-Stage Workflow Stepper</span>
                  <span className="text-brand-600 dark:text-brand-400">
                    Stage {currentStageIndex + 1} of {WORKFLOW_STAGES.length}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-brand-600 via-blue-500 to-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${((currentStageIndex + 1) / WORKFLOW_STAGES.length) * 100}%` }}
                  />
                </div>

                {/* Step Bubbles */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-2 text-center">
                  {WORKFLOW_STAGES.map((stage, idx) => {
                    const isPassed = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div key={stage} className="flex flex-col items-center gap-1">
                        <div
                          onClick={() => updateRequestWorkflow(request.id, stage)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all ${
                            isCurrent
                              ? 'bg-brand-600 text-white ring-4 ring-brand-500/20 scale-110'
                              : isPassed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200'
                          }`}
                          title={`Click to set status to '${stage}'`}
                        >
                          {isPassed ? '✓' : idx + 1}
                        </div>
                        <span
                          className={`text-[9px] font-semibold leading-tight line-clamp-2 ${
                            isCurrent
                              ? 'text-brand-600 dark:text-brand-400 font-bold'
                              : isPassed
                              ? 'text-slate-700 dark:text-slate-300'
                              : 'text-slate-400'
                          }`}
                        >
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Assigned Workers ({request.assignedWorkerIds.length} / {request.numberOfWorkers})
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/assignments?requestId=${request.id}`}
                    className="px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Match & Assign Workers
                  </Link>

                  {request.workflowStatus !== 'Completed' && (
                    <button
                      onClick={() => updateRequestWorkflow(request.id, 'Completed')}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
