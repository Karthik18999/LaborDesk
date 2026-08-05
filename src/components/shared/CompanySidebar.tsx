'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileCheck,
  CreditCard,
  Building2,
  LogOut,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/company', icon: LayoutDashboard },
  { name: 'Request Workers', href: '/company/request', icon: UserCheck },
  { name: 'Active Workers', href: '/company/workers', icon: Users },
  { name: 'Attendance Logs', href: '/company/attendance', icon: FileCheck },
  { name: 'Billing & Invoices', href: '/company/billing', icon: CreditCard },
];

export default function CompanySidebar() {
  const pathname = usePathname();
  const { setRole, currentCompany, currentUser } = useApp();

  const companyName = currentCompany?.companyName || currentUser?.companyName || 'Corporate Client';

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 min-h-screen">
      <div className="p-4 space-y-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white leading-none">
              Labor<span className="text-emerald-600">Desk</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 mt-0.5">
              Company Portal
            </span>
          </div>
        </Link>

        {/* Company Card Header */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] uppercase font-bold text-slate-400">Active Company Account</p>
          <p className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5" title={companyName}>
            {companyName}
          </p>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            {currentUser?.name
              ? currentUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
              : 'CC'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {currentUser?.name || 'Corporate Client'}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {currentUser?.email || 'hr@company.com'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setRole('guest')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/40 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
