'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import {
  Users,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  TrendingUp,
  IndianRupee,
  ShieldAlert,
  ArrowUpRight,
  Briefcase,
  UserCheck,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { workers, companies, requests, payments } = useApp();

  // Metrics calculation
  const totalWorkers = workers.length;
  const availableWorkers = workers.filter((w) => w.currentStatus === 'Available').length;
  const busyWorkers = workers.filter((w) => w.currentStatus === 'Assigned').length;

  const totalCompanies = companies.length;
  const activeCompanies = companies.filter((c) => c.status === 'Active').length;
  const pendingCompanies = companies.filter((c) => c.status === 'Pending Approval').length;

  const pendingRequests = requests.filter((r) => r.workflowStatus !== 'Completed' && r.workflowStatus !== 'Cancelled').length;
  const completedRequests = requests.filter((r) => r.workflowStatus === 'Completed').length;
  const todayRequests = requests.filter((r) => r.createdAt === '2026-08-05' || r.createdAt === '2026-08-03').length || 2;

  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);

  // Chart data
  const hiringTrendsData = [
    { month: 'Feb', hiringCount: 42, revenue: 340000 },
    { month: 'Mar', hiringCount: 58, revenue: 490000 },
    { month: 'Apr', hiringCount: 75, revenue: 620000 },
    { month: 'May', hiringCount: 90, revenue: 810000 },
    { month: 'Jun', hiringCount: 110, revenue: 980000 },
    { month: 'Jul', hiringCount: 135, revenue: 1250000 },
    { month: 'Aug', hiringCount: 160, revenue: 1450000 },
  ];

  const skillDemandData = [
    { name: 'Construction', count: 45, color: '#3b82f6' },
    { name: 'Electrical', count: 28, color: '#10b981' },
    { name: 'Logistics', count: 35, color: '#f59e0b' },
    { name: 'Welding', count: 22, color: '#8b5cf6' },
    { name: 'Plumbing', count: 18, color: '#ec4899' },
    { name: 'Carpentry', count: 14, color: '#64748b' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 rounded-full border border-brand-500/30">
            System Overview
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Labor Desk Command Center</h2>
          <p className="text-xs text-slate-300 mt-1">
            Real-time workforce deployment metrics, hiring demand, and revenue analytics.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/assignments"
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Assign Workers
          </Link>
          <Link
            href="/admin/workers"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all"
          >
            Add New Worker
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Workers</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalWorkers}</p>
            <div className="flex items-center gap-2 text-[11px] font-medium mt-1">
              <span className="text-emerald-600 font-bold">{availableWorkers} Available</span>
              <span className="text-slate-400">•</span>
              <span className="text-brand-600 font-bold">{busyWorkers} Assigned</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Requests</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{pendingRequests}</p>
            <div className="flex items-center gap-2 text-[11px] font-medium mt-1">
              <span className="text-amber-600 font-bold">{todayRequests} Today</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-600 font-bold">{completedRequests} Done</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Companies</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalCompanies}</p>
            <div className="flex items-center gap-2 text-[11px] font-medium mt-1">
              <span className="text-emerald-600 font-bold">{activeCompanies} Active</span>
              <span className="text-slate-400">•</span>
              <span className="text-rose-600 font-bold">{pendingCompanies} Pending</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Gross Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{(totalRevenue / 100000).toFixed(2)} L</p>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +18.4% this month
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Revenue & Hiring Trends Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Monthly Hiring & Revenue Growth</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total workers deployed per month</p>
            </div>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300">
              2026 YTD
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hiringTrendsData}>
                <defs>
                  <linearGradient id="hiringGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="hiringCount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#hiringGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Demand Bar Chart */}
        <div className="lg:col-span-4 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Skill Demand Breakdown</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Most requested trades across sites</p>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillDemandData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {skillDemandData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row: Top Companies & Recent Activity */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Top Hiring Corporate Clients */}
        <div className="lg:col-span-7 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Top Enterprise Clients</h3>
            <Link href="/admin/companies" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
              View All Companies →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Industry</th>
                  <th className="pb-3">Hired Jobs</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {companies.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 font-semibold text-slate-900 dark:text-white">
                      {c.companyName}
                      <span className="block text-[10px] text-slate-400 font-normal">GST: {c.gstNumber}</span>
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">{c.industry}</td>
                    <td className="py-3 font-bold text-brand-600 dark:text-brand-400">{c.hiringHistoryCount} workers</td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          c.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Requests Feed */}
        <div className="lg:col-span-5 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Live Worker Requests</h3>
            <Link href="/admin/requests" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Workflow Stepper →
            </Link>
          </div>

          <div className="space-y-3">
            {requests.map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{r.companyName}</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      r.priority === 'Urgent'
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                        : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                    }`}
                  >
                    {r.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Needs <strong>{r.numberOfWorkers} {r.subSkill}(s)</strong> at {r.location}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                  <span>Wage: ₹{r.dailyWageOffered}/day</span>
                  <span className="font-bold text-brand-600 dark:text-brand-400">{r.workflowStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
