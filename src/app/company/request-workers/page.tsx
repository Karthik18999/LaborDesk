'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { SKILL_CATEGORIES } from '@/lib/mockData';
import { RequestPriority } from '@/lib/types';
import { UserPlus, Send, CheckCircle2, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CompanyRequestWorkersPage() {
  const { currentCompany, createRequest } = useApp();
  const router = useRouter();

  const [formData, setFormData] = useState({
    skillRequired: 'Construction',
    subSkill: 'Mason / Bricklayer',
    numberOfWorkers: 5,
    location: 'Metro Site Phase 4, Noida',
    reportingDate: '2026-08-10',
    reportingTime: '08:00 AM',
    durationDays: 14,
    dailyWageOffered: 900,
    foodProvided: true,
    accommodationProvided: true,
    transportationProvided: true,
    genderPreference: 'Any' as 'Any' | 'Male' | 'Female',
    experienceRequiredYears: 3,
    remarks: 'Must wear site helmet & boots. Shift starting 8:00 AM sharp.',
    priority: 'Normal' as RequestPriority,
  });

  const handleSkillChange = (catName: string) => {
    const found = SKILL_CATEGORIES.find((s) => s.name === catName);
    setFormData({
      ...formData,
      skillRequired: catName,
      subSkill: found?.subSkills[0] || '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCompany) return;

    createRequest({
      companyId: currentCompany.id,
      companyName: currentCompany.companyName,
      skillRequired: formData.skillRequired,
      subSkill: formData.subSkill,
      numberOfWorkers: Number(formData.numberOfWorkers),
      location: formData.location,
      reportingDate: formData.reportingDate,
      reportingTime: formData.reportingTime,
      durationDays: Number(formData.durationDays),
      dailyWageOffered: Number(formData.dailyWageOffered),
      foodProvided: formData.foodProvided,
      accommodationProvided: formData.accommodationProvided,
      transportationProvided: formData.transportationProvided,
      genderPreference: formData.genderPreference,
      experienceRequiredYears: Number(formData.experienceRequiredYears),
      remarks: formData.remarks,
      priority: formData.priority,
    });

    router.push('/company/active-requests');
  };

  const currentCat = SKILL_CATEGORIES.find((s) => s.name === formData.skillRequired);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Submit New Worker Requirement</h2>
        <p className="text-xs text-slate-500">
          Fill out site details, trade specifications, daily wage rates, and perks for admin worker matching.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Skill & Subskill */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Required Skill Category
              </label>
              <select
                value={formData.skillRequired}
                onChange={(e) => handleSkillChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              >
                {SKILL_CATEGORIES.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Specific Trade Sub-Skill
              </label>
              <select
                value={formData.subSkill}
                onChange={(e) => setFormData({ ...formData, subSkill: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              >
                {currentCat?.subSkills.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Number of Workers & Daily Wage */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Number of Workers Required
              </label>
              <input
                required
                type="number"
                min={1}
                value={formData.numberOfWorkers}
                onChange={(e) => setFormData({ ...formData, numberOfWorkers: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Offered Daily Wage (₹ / Day)
              </label>
              <input
                required
                type="number"
                value={formData.dailyWageOffered}
                onChange={(e) => setFormData({ ...formData, dailyWageOffered: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Min Experience (Years)
              </label>
              <input
                required
                type="number"
                value={formData.experienceRequiredYears}
                onChange={(e) => setFormData({ ...formData, experienceRequiredYears: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Reporting Project Site Address
            </label>
            <input
              required
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Metro Construction Site #4, Botanical Garden, Noida"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Reporting Date, Time, Duration */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Reporting Date</label>
              <input
                required
                type="date"
                value={formData.reportingDate}
                onChange={(e) => setFormData({ ...formData, reportingDate: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Reporting Time</label>
              <input
                required
                type="text"
                value={formData.reportingTime}
                onChange={(e) => setFormData({ ...formData, reportingTime: e.target.value })}
                placeholder="08:00 AM"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Duration (Days)</label>
              <input
                required
                type="number"
                value={formData.durationDays}
                onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Perks Checkboxes */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-900 dark:text-white">Perks & Amenities Provided</label>
            <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.foodProvided}
                  onChange={(e) => setFormData({ ...formData, foodProvided: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                Food / Meal Provided
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.accommodationProvided}
                  onChange={(e) => setFormData({ ...formData, accommodationProvided: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                Accommodation / Lodging
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.transportationProvided}
                  onChange={(e) => setFormData({ ...formData, transportationProvided: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                Site Transportation Cab
              </label>
            </div>
          </div>

          {/* Gender & Priority */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender Preference</label>
              <select
                value={formData.genderPreference}
                onChange={(e) => setFormData({ ...formData, genderPreference: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Any">Any Gender</option>
                <option value="Male">Male Only</option>
                <option value="Female">Female Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Urgency Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-emerald-600"
              >
                <option value="Normal">Normal Priority</option>
                <option value="High">High Priority</option>
                <option value="Urgent">Urgent Priority (24-hr SLA)</option>
              </select>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Remarks & Safety Instructions</label>
            <textarea
              rows={2}
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="Additional instructions for workers or admin dispatch team..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Request to Admin Hub
          </button>
        </form>
      </div>
    </div>
  );
}
