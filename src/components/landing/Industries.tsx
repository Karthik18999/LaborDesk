'use client';

import React from 'react';
import { HardHat, Truck, Factory, Sun, Wrench, Warehouse } from 'lucide-react';

export default function Industries() {
  const industries = [
    { title: 'Construction & Infrastructure', icon: HardHat, count: '6,200+ Workers Available' },
    { title: 'Logistics & Warehousing', icon: Truck, count: '4,100+ Loaders & Handlers' },
    { title: 'Heavy Manufacturing & Mills', icon: Factory, count: '2,800+ Machine Operators' },
    { title: 'Solar & Renewable Energy Projects', icon: Sun, count: '1,500+ Panel Installers' },
    { title: 'Metal Fabrication & Welding Yards', icon: Wrench, count: '1,900+ Certified Welders' },
    { title: 'E-Commerce Fulfillment Centers', icon: Warehouse, count: '3,100+ Dispatch Helpers' },
  ];

  return (
    <section id="industries" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
            Sectors We Serve
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tailored Skilled Labor Deployment
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            From metro rail civil construction to high-capacity logistics hubs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-brand-500/50 hover:shadow-lg transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{ind.title}</h3>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold mt-1">{ind.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
