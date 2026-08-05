'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing({ onOpenRegister }: { onOpenRegister?: () => void }) {
  const plans = [
    {
      name: 'Basic Plan',
      price: '₹4,999',
      period: '/month platform fee',
      description: 'Ideal for local contractors and small construction firms.',
      features: [
        'Up to 25 Worker Requests / month',
        'Physical Aadhaar & Skill Verification',
        'Basic Daily Attendance Logging',
        'Email & SMS Support',
        'Standard Payment Terms',
      ],
      cta: 'Get Started Basic',
      highlighted: false,
    },
    {
      name: 'Pro Enterprise',
      price: '₹14,999',
      period: '/month platform fee',
      description: 'Built for medium-to-large EPC & warehouse logistics operators.',
      features: [
        'Unlimited Worker Requests',
        'Dedicated Priority Admin Matchmaker',
        'Automated PDF Invoices & Payroll Logs',
        'Live Site Check-In / Check-Out Tracker',
        'Worker Replacement SLA within 4 hours',
        'Custom Wage & Attendance Export (Excel/PDF)',
      ],
      cta: 'Register Pro Account',
      highlighted: true,
    },
    {
      name: 'Custom Mega Projects',
      price: 'Custom Tier',
      period: 'Bespoke Contracting',
      description: 'For national infrastructure projects needing 500+ workers.',
      features: [
        'Dedicated On-Site Labor Supervisor',
        'Biometric Handheld Check-In Devices',
        'Custom PF/ESI Compliance Reporting',
        '24/7 Hotline & Emergency Replacements',
        'Volume Wage Discounts',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
            Transparent Pricing
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Plans Suited to Every Deployment Scale
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No hidden commissions. Direct daily wage transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                p.highlighted
                  ? 'bg-slate-900 text-white dark:bg-brand-950 border-2 border-brand-500 shadow-2xl relative scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                  Most Popular for Enterprises
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <p className={`text-xs ${p.highlighted ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'} mb-6`}>
                  {p.description}
                </p>

                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold">{p.price}</span>
                  <span className={`text-xs ml-2 ${p.highlighted ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {p.period}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {p.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs font-medium">
                      <Check className={`w-4 h-4 shrink-0 ${p.highlighted ? 'text-emerald-400' : 'text-brand-600 dark:text-brand-400'}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenRegister}
                className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  p.highlighted
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white'
                }`}
              >
                {p.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
