'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Briefcase, Shield, Building2, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { setRole, addToast } = useApp();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'admin' | 'company'>('admin');
  const [email, setEmail] = useState('admin@labordesk.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleTabSwitch = (tab: 'admin' | 'company') => {
    setActiveTab(tab);
    if (tab === 'admin') {
      setEmail('admin@labordesk.in');
    } else {
      setEmail('hr@ltconst.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(activeTab);
    addToast({
      title: `${activeTab === 'admin' ? 'Admin' : 'Company'} Authenticated`,
      description: 'Logged in successfully with Role-Based Access Control.',
      variant: 'success',
    });
    if (activeTab === 'admin') {
      router.push('/admin');
    } else {
      router.push('/company');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold shadow-lg shadow-brand-500/30">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
            Labor<span className="text-brand-600">Desk</span>
          </span>
        </Link>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Secure Portal Access
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Strictly for Central Admins & Registered Corporate Clients
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => handleTabSwitch('admin')}
              className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeTab === 'admin'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin Login
            </button>
            <button
              onClick={() => handleTabSwitch('company')}
              className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeTab === 'company'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Company Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {activeTab === 'admin' ? 'Admin Email ID' : 'Company Official Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <Link href="/forgot-password" className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              className={`w-full py-3 text-xs font-semibold text-white rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
              }`}
            >
              Sign In to {activeTab === 'admin' ? 'Admin Portal' : 'Company Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Preset Login Helpers */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">
              Quick One-Click Demo Credentials
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('admin');
                  setEmail('admin@labordesk.in');
                  setRole('admin');
                  router.push('/admin');
                }}
                className="flex-1 py-2 text-[11px] font-semibold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 rounded-xl border border-brand-200 dark:border-brand-900"
              >
                Login as Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('company');
                  setEmail('hr@ltconst.com');
                  setRole('company');
                  router.push('/company');
                }}
                className="flex-1 py-2 text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-200 dark:border-emerald-900"
              >
                Login as Company
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            Are you a company without an account?{' '}
            <Link href="/register-company" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Register Company
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
