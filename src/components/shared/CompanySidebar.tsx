'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  LayoutDashboard,
  UserPlus,
  Clock,
  UserCheck,
  Receipt,
  FileText,
  User,
  HelpCircle,
  LogOut,
  Building2,
} from 'lucide-react';

export default function CompanySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setRole, currentCompany } = useApp();

  const navItems = [
    { label: 'Dashboard', href: '/company', icon: LayoutDashboard },
    { label: 'Request Workers', href: '/company/request-workers', icon: UserPlus },
    { label: 'Active Requests', href: '/company/active-requests', icon: Clock },
    { label: 'Assigned Workers', href: '/company/assigned-workers', icon: UserCheck },
    { label: 'Invoices', href: '/company/invoices', icon: Receipt },
    { label: 'Profile', href: '/company/profile', icon: User },
    { label: 'Support', href: '/company/support', icon: HelpCircle },
  ];

  const handleLogout = () => {
    setRole('guest');
    router.push('/login');
  };

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-screen sticky top-0 h-screen overflow-y-auto">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="truncate">
          <h2 className="font-bold text-slate-900 dark:text-white text-sm truncate">
            {currentCompany?.companyName || 'Company Portal'}
          </h2>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            GST: {currentCompany?.gstNumber.slice(0, 10)}...
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Company Profile Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
            HR
          </div>
          <div className="flex-1 truncate">
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
              {currentCompany?.contactPerson}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{currentCompany?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
