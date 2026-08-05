'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: 'Do workers have app or portal login credentials?',
      a: 'No. Labor Desk strictly operates as a managed workforce platform. Blue-collar workers physically visit our central admin hub for in-person registration, skill assessment, and Aadhaar verification. Admin manages all assignments directly.',
    },
    {
      q: 'How does physical worker verification work?',
      a: 'Workers present their original Aadhaar card, village residency proof, and skill trade certificates at our physical office. Our admin team verifies documents, conducts a brief practical trade test, and inputs their profile into the central system.',
    },
    {
      q: 'How quickly can workers be deployed to a site after a company request?',
      a: 'For urgent requests, workers can be matched and dispatched within 12 to 24 hours depending on location and quantity.',
    },
    {
      q: 'How is daily attendance recorded?',
      a: 'Attendance can be logged daily through the Company Dashboard or verified via physical supervisor check-in logs updated directly into the admin system.',
    },
    {
      q: 'What happens if a worker is absent or unfit for work?',
      a: 'Labor Desk guarantees rapid worker replacement within 4 to 8 hours under our Pro & Enterprise SLA agreements.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
            Frequently Asked Questions
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Got Questions? We Have Answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white text-sm sm:text-base"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
