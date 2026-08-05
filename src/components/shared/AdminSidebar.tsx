'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileSpreadsheet,
  UserCheck,
  CalendarCheck,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setRole, notifications } = useApp();

  const unreadCount = notifications.filter((n) => n.recipientRole === 'admin' && !n.read).length;

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Workers', href: '/admin/workers', icon: Users },
    { label: 'Companies', href: '/admin/companies', icon: Building2 },
    { label: 'Requests', href: '/admin/requests', icon: FileSpreadsheet },
    { label: 'Assignments', href: '/admin/assignments', icon: UserCheck },
    { label: 'Attendance', href: '/admin/attendance', icon: CalendarCheck },
    { label: 'Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { label: 'Notifications', href: '/admin/notifications', icon: Bell, badge: unreadCount },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    setRole('guest');
    router.push('/login');
  };

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-screen sticky top-0 h-screen overflow-y-auto">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white text-base leading-tight">LaborDesk</h2>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400">
            <ShieldCheck className="w-3 h-3" />
            Admin Portal
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
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-600 text-white animate-pulse">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      {/* Admin Profile Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div className="flex-1 truncate">
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">Central Administrator</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">admin@labordesk.in</p>
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
