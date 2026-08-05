'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { X, Shield, Building2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { setRole } = useApp();
  const router = useRouter();

  if (!isOpen) return null;

  const handleSelectRole = (selectedRole: 'admin' | 'company') => {
    setRole(selectedRole);
    onClose();
    if (selectedRole === 'admin') {
      router.push('/admin');
    } else {
      router.push('/company');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-8">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 rounded-full">
            Instant Sandbox Mode
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Choose Interactive Role Demo</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Explore the live full-stack system as an Admin or a Corporate Client.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Admin Option */}
          <div
            onClick={() => handleSelectRole('admin')}
            className="p-5 rounded-2xl border-2 border-brand-500/40 bg-brand-50/50 dark:bg-brand-950/40 hover:border-brand-600 cursor-pointer transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">Central Admin</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Register physical workers, approve companies, assign workers to requests, track attendance, and generate reports.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
              Launch Admin Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Company Option */}
          <div
            onClick={() => handleSelectRole('company')}
            className="p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/40 hover:border-emerald-600 cursor-pointer transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">Company Portal</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Submit worker requirements, track assignment workflow timelines, view assigned worker roster, and download invoices.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              Launch Company Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
