'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  LayoutDashboard,
  FilePlus2,
  ListTodo,
  Users2,
  Receipt,
  User,
  HelpCircle,
  LogOut,
  Building2,
} from 'lucide-react';

export default function CompanySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setRole, currentCompany, currentUser, setCurrentUser } = useApp();

  const navItems = [
    { name: 'Overview', href: '/company', icon: LayoutDashboard },
    { name: 'Request Workers', href: '/company/request-workers', icon: FilePlus2 },
    { name: 'Active Requests', href: '/company/active-requests', icon: ListTodo },
    { name: 'Assigned Workers', href: '/company/assigned-workers', icon: Users2 },
    { name: 'Invoices & Billing', href: '/company/invoices', icon: Receipt },
    { name: 'Company Profile', href: '/company/profile', icon: User },
    { name: 'Help & Support', href: '/company/support', icon: HelpCircle },
  ];

  const handleSignOut = () => {
    setRole('guest');
    setCurrentUser(null);
    router.push('/');
  };

  const userName = currentUser?.name || currentCompany?.contactPerson || currentCompany?.companyName || 'Corporate Client';
  const userEmail = currentUser?.email || currentCompany?.email || 'hr@company.com';

  const initials = userName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'CC';

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between shrink-0 h-screen sticky top-0">
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
          <p className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5" title={currentCompany.companyName}>
            {currentCompany.companyName}
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
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile & Sign Out Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate" title={userName}>
              {userName}
            </span>
            <span className="text-[10px] text-slate-400 truncate" title={userEmail}>
              {userEmail}
            </span>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
