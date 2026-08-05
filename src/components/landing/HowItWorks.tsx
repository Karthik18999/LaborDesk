'use client';

import React from 'react';
import { UserCheck, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Physical In-Person Worker Registration',
      description: 'Blue-collar workers physically visit the central Labor Desk admin office. Admin verifies Aadhaar card, skill certificate, emergency contact, and village location.',
      icon: UserCheck,
      badge: 'Admin Controlled',
    },
    {
      step: '02',
      title: 'Company Submits Worker Request',
      description: 'Registered company submits a requirement specifying required skill (e.g. Mason, Welder, Electrician), count, daily wage, site location, food & lodging perks.',
      icon: FileText,
      badge: 'Company Portal',
    },
    {
      step: '03',
      title: 'AI-Assisted Worker Assignment & Dispatch',
      description: 'Admin filters verified pool by proximity and rating, selects candidates, and dispatches workers to the site. Live status updates continuously.',
      icon: CheckCircle2,
      badge: 'Rapid Deployment',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
            Streamlined Workflow
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Labor Desk Operates
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Strict verification on one end, rapid deployment on the other.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-brand-600/30 dark:text-brand-400/30">{s.step}</span>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                    {s.badge}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center mb-4 shadow-md shadow-brand-500/20">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
