'use client';

import React from 'react';
import { UserCheck, Shield, Clock, Receipt, BarChart3, Bell, CheckCircle2, Zap } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: UserCheck,
      title: 'Physical In-Office Registration',
      description:
        'Workers visit our physical hub for biometric and Aadhaar verification. Zero fake profiles or unverified labor on your site.',
      color: 'bg-brand-500/10 text-brand-600 dark:text-brand-400',
    },
    {
      icon: Zap,
      title: 'Smart Skill Matching Engine',
      description:
        'Admin algorithm matches workers by experience, village proximity, daily wage, certification, and past client ratings.',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      icon: Clock,
      title: 'Daily Attendance & Check-In',
      description:
        'Track daily check-in, check-out, late arrivals, and half-days in real-time. Eliminates manual roll call paperwork.',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Receipt,
      title: 'Automated Invoicing & Payroll',
      description:
        'Transparent weekly/monthly wage disbursement, instant PDF invoice generation, and full audit trail compliance.',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Analytics',
      description:
        'Hiring trend charts, revenue analysis, skill demand heatmaps, and attendance export to PDF and Excel.',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Bell,
      title: 'Real-Time Notification Dispatch',
      description:
        'Instant alerts when workers are confirmed, dispatched, arrived at site, or when invoices are due.',
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
            Platform Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered Specifically for Enterprise Workforce Management
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Not a generic job board. Labor Desk provides end-to-end operational control for industrial labor deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {featureList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:shadow-xl hover:border-brand-500/40 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feat.color} mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
