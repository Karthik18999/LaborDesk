'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { HardHat, Truck, Factory, Sun, Wrench, Warehouse, ArrowRight, X, Users, Building2, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Industries() {
  const { role, workers, companies, setRole } = useApp();
  const router = useRouter();

  const [selectedIndustryModal, setSelectedIndustryModal] = useState<any | null>(null);

  const industriesList = [
    {
      title: 'Construction & Infrastructure',
      skillName: 'Construction',
      icon: HardHat,
      count: '6,200+ Workers Available',
      description: 'Masons, concrete finishers, scaffolders, and bar benders for civil construction.',
    },
    {
      title: 'Logistics & Warehousing',
      skillName: 'Logistics',
      icon: Truck,
      count: '4,100+ Loaders & Handlers',
      description: 'Warehouse loaders, forklift operators, dispatch helpers, and inventory assistants.',
    },
    {
      title: 'Heavy Manufacturing & Mills',
      skillName: 'Welding',
      icon: Factory,
      count: '2,800+ Machine Operators',
      description: 'Industrial machine operators, assembly line workers, and plant maintenance helpers.',
    },
    {
      title: 'Solar & Renewable Energy Projects',
      skillName: 'Electrical',
      icon: Sun,
      count: '1,500+ Panel Installers',
      description: 'PV solar panel installers, substation operators, and cabling technicians.',
    },
    {
      title: 'Metal Fabrication & Welding Yards',
      skillName: 'Welding',
      icon: Wrench,
      count: '1,900+ Certified Welders',
      description: 'ARC, TIG, and MIG structural steel welders for bridge and rail fabrication.',
    },
    {
      title: 'E-Commerce Fulfillment Centers',
      skillName: 'Logistics',
      icon: Warehouse,
      count: '3,100+ Dispatch Helpers',
      description: 'High-volume packaging, sorting, loading, and inventory handling staff.',
    },
  ];

  const handleCardClick = (ind: typeof industriesList[0]) => {
    if (role === 'guest') {
      // Redirect unauthenticated user to login page
      router.push('/login');
    } else {
      // User is already logged in -> Show Industry Details
      setSelectedIndustryModal(ind);
    }
  };

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
            Tap any industry sector below to access verified labor rosters.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {industriesList.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                onClick={() => handleCardClick(ind)}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-brand-500 hover:shadow-xl cursor-pointer transition-all flex items-start gap-4 group relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-600/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {ind.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-brand-600 transition-all shrink-0" />
                  </div>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold mt-1">{ind.count}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{ind.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logged-In Industry Details Modal */}
      {selectedIndustryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-5">
            <button
              onClick={() => setSelectedIndustryModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
                <selectedIndustryModal.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                  Authenticated Access ({role.toUpperCase()})
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedIndustryModal.title}
                </h3>
                <p className="text-xs text-slate-500">{selectedIndustryModal.count}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedIndustryModal.description}
              </p>

              {/* Dynamic Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 block">Registered Trade Workers</span>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {workers.filter((w) => w.skill === selectedIndustryModal.skillName).length || 4} Verified
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 block">Active Client Accounts</span>
                  <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                    {companies.length} Corporate Clients
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons depending on Role */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              {role === 'company' && (
                <button
                  onClick={() => {
                    setSelectedIndustryModal(null);
                    router.push('/company/request-workers');
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Request Workers for {selectedIndustryModal.title}
                </button>
              )}

              {role === 'admin' && (
                <button
                  onClick={() => {
                    setSelectedIndustryModal(null);
                    router.push('/admin/workers');
                  }}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Manage {selectedIndustryModal.title} Workers
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
