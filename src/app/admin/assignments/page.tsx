'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  UserCheck,
  Building2,
  Filter,
  CheckCircle2,
  Star,
  MapPin,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function AdminAssignmentsPage() {
  const { requests, workers, assignWorkersToRequest } = useApp();

  const [selectedRequestId, setSelectedRequestId] = useState<string>(requests[0]?.id || '');
  const [selectedWorkerIds, setSelectedWorkerIds] = useState<string[]>([]);

  // Matching Filter Filters
  const [filterSkill, setFilterSkill] = useState<boolean>(true);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState<boolean>(true);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [minExpYears, setMinExpYears] = useState<number>(0);

  const activeRequest = requests.find((r) => r.id === selectedRequestId) || requests[0];

  // Filtering matching workers logic
  const matchingWorkers = useMemo(() => {
    if (!activeRequest) return [];

    return workers.filter((w) => {
      if (filterSkill && w.skill.toLowerCase() !== activeRequest.skillRequired.toLowerCase()) {
        // Allow fallback match if subskill matches
        if (!w.subSkill.toLowerCase().includes(activeRequest.subSkill.toLowerCase())) {
          return false;
        }
      }
      if (filterVerifiedOnly && w.verificationStatus !== 'Verified') {
        return false;
      }
      if (w.rating < minRating) {
        return false;
      }
      if (w.experienceYears < minExpYears) {
        return false;
      }
      return true;
    });
  }, [activeRequest, workers, filterSkill, filterVerifiedOnly, minRating, minExpYears]);

  const toggleWorkerSelection = (id: string) => {
    setSelectedWorkerIds((prev) =>
      prev.includes(id) ? prev.filter((wId) => wId !== id) : [...prev, id]
    );
  };

  const handleConfirmAssignment = () => {
    if (!activeRequest || selectedWorkerIds.length === 0) return;
    assignWorkersToRequest(activeRequest.id, selectedWorkerIds);
    setSelectedWorkerIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Smart Worker Matching & Assignment</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Filter physically registered candidates by skill, location proximity, experience & rating, then bulk assign to client sites.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Select Request */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            1. Select Client Request
          </h3>

          <div className="space-y-3">
            {requests.map((r) => {
              const isSelected = r.id === activeRequest?.id;

              return (
                <div
                  key={r.id}
                  onClick={() => {
                    setSelectedRequestId(r.id);
                    setSelectedWorkerIds(r.assignedWorkerIds || []);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 shadow-md ring-2 ring-brand-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white truncate">{r.companyName}</span>
                    <span className="text-[10px] font-mono text-slate-400">{r.id}</span>
                  </div>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
                    {r.numberOfWorkers} {r.subSkill}(s)
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-1">Location: {r.location}</p>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-emerald-600">₹{r.dailyWageOffered}/day</span>
                    <span className="font-bold text-slate-600 dark:text-slate-400">
                      Assigned ({r.assignedWorkerIds.length}/{r.numberOfWorkers})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Matching Algorithm Engine */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Request Overview Header */}
          {activeRequest && (
            <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-xs text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider">
                    Target Requirement
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeRequest.companyName} ({activeRequest.numberOfWorkers} {activeRequest.subSkill})
                  </h3>
                </div>

                <button
                  disabled={selectedWorkerIds.length === 0}
                  onClick={handleConfirmAssignment}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg transition-all flex items-center gap-2 ${
                    selectedWorkerIds.length > 0
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                      : 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-500'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Assign {selectedWorkerIds.length} Selected Worker(s) & Notify Company
                </button>
              </div>

              {/* Filters Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <label className="flex items-center gap-1.5 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterSkill}
                    onChange={(e) => setFilterSkill(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  Match Trade Skill ({activeRequest.skillRequired})
                </label>

                <label className="flex items-center gap-1.5 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterVerifiedOnly}
                    onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  Strict Verified Only
                </label>

                <div className="flex items-center gap-1.5 font-medium">
                  <span>Min Rating:</span>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4.0}>4.0 + Stars</option>
                    <option value={4.5}>4.5 + Stars</option>
                    <option value={4.8}>4.8 + Stars</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 font-medium">
                  <span>Min Experience:</span>
                  <select
                    value={minExpYears}
                    onChange={(e) => setMinExpYears(Number(e.target.value))}
                    className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs"
                  >
                    <option value={0}>Any Experience</option>
                    <option value={3}>3+ Years</option>
                    <option value={5}>5+ Years</option>
                    <option value={7}>7+ Years</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Matching Candidates Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Matching Workers ({matchingWorkers.length} candidates found)
              </span>
              <span className="text-slate-400">Check box to assign candidate</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {matchingWorkers.map((worker) => {
                const isSelected = selectedWorkerIds.includes(worker.id);

                return (
                  <div
                    key={worker.id}
                    onClick={() => toggleWorkerSelection(worker.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 relative ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className="mt-1">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <img src={worker.photoUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{worker.fullName}</h4>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500" />
                          {worker.rating}
                        </span>
                      </div>

                      <p className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">{worker.subSkill}</p>
                      <p className="text-[10px] text-slate-500">
                        {worker.village}, {worker.district} • {worker.experienceYears} yrs exp
                      </p>

                      <div className="flex items-center justify-between pt-2 text-[10px] font-semibold">
                        <span className="text-emerald-600">₹{worker.dailyWage}/day</span>
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            worker.currentStatus === 'Available'
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : 'bg-brand-500/10 text-brand-600'
                          }`}
                        >
                          {worker.currentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
