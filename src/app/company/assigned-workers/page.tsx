'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { UserCheck, Star, Phone, ShieldCheck, MapPin } from 'lucide-react';

export default function AssignedWorkersPage() {
  const { currentCompany, requests, workers } = useApp();
  const companyRequests = requests.filter((r) => r.companyId === currentCompany?.id);
  const assignedWorkerIds = companyRequests.flatMap((r) => r.assignedWorkerIds);
  const assignedWorkers = workers.filter((w) => assignedWorkerIds.includes(w.id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assigned Workers Roster</h2>
        <p className="text-xs text-slate-500">Verified blue-collar workers currently deployed at your site.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignedWorkers.map((worker) => (
          <div
            key={worker.id}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <img src={worker.photoUrl} alt="" className="w-12 h-12 rounded-2xl object-cover" />
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{worker.fullName}</h3>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{worker.subSkill}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
              <p><strong>Aadhaar Status:</strong> Verified Biometric</p>
              <p><strong>Experience:</strong> {worker.experienceYears} Years</p>
              <p><strong>Daily Wage:</strong> ₹{worker.dailyWage}/day</p>
              <p><strong>Emergency Contact:</strong> {worker.emergencyContact.phone} ({worker.emergencyContact.relationship})</p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-amber-500">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-500" /> {worker.rating} Rating
              </span>
              <span className="text-emerald-600">On-Site Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
