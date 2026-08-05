'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Settings, User, Lock, Sun, Building2, Plus, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const { isDarkMode, toggleTheme, addToast, industries, addIndustry } = useApp();
  const [newIndustryName, setNewIndustryName] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Settings Saved',
      description: 'Platform preferences have been updated successfully.',
      variant: 'success',
    });
  };

  const handleAddIndustry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndustryName.trim()) return;
    addIndustry(newIndustryName.trim());
    setNewIndustryName('');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Platform Settings</h2>
        <p className="text-xs text-slate-500">Configure dynamic industries, profile, security, and theme preferences.</p>
      </div>

      {/* Dynamic Industry Sector Management */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-600" /> Platform Industry Sectors
            </h3>
            <p className="text-xs text-slate-500">
              Manage industries visible on registration forms and company dashboards.
            </p>
          </div>
        </div>

        <form onSubmit={handleAddIndustry} className="flex gap-2">
          <input
            type="text"
            value={newIndustryName}
            onChange={(e) => setNewIndustryName(e.target.value)}
            placeholder="Add new industry sector (e.g. Pharmaceutical Manufacturing)..."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Industry
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2">
          {industries.map((ind) => (
            <span
              key={ind}
              className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900 text-xs font-semibold flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              {ind}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Section */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600" /> Admin Account Profile
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Administrator Name</label>
                <input
                  type="text"
                  defaultValue="Central Admin"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="admin@labordesk.in"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" /> Display & Dark Mode
            </h3>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-semibold text-xs text-slate-900 dark:text-white">Appearance Mode</p>
                <p className="text-[11px] text-slate-500">Toggle between Light and Dark interface styles.</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold"
              >
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" /> Password & Security
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
