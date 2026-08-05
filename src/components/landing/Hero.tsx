'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, Building2, Users, CheckCircle, Zap, Star } from 'lucide-react';
import Link from 'next/link';

export default function Hero({ onOpenDemo, onOpenRegister }: { onOpenDemo?: () => void; onOpenRegister?: () => void }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-200 dark:border-brand-900/60 bg-brand-50/80 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Enterprise Workforce Management Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Empower Infrastructure with{' '}
              <span className="bg-gradient-to-r from-brand-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                Verified On-Demand Labor
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Labor Desk bridges verified blue-collar workers physically registered at our hub with top infrastructure and enterprise companies. Fully managed deployment, attendance tracking, and automated payroll.
            </p>

            {/* Note Box */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-3 max-w-xl mx-auto lg:mx-0">
              <Zap className="w-5 h-5 text-amber-500 shrink-0" />
              <p>
                <strong>Admin-Controlled Platform:</strong> Workers register physically at our admin office for Aadhaar & skill verification. Workers do not have portal logins.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Register Company
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                Request Interactive Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">15,000+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Workers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">450+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Corporate Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">99.4%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">On-Time Site Arrival</p>
              </div>
            </div>
          </div>

          {/* Right Visual Dashboard Mockup */}
          <div className="lg:col-span-5 relative">
            {/* Main Glass Card */}
            <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl space-y-5">
              {/* Top Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">L&T Infra Project</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Metro Site #4 • Urgent Request</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Assigned (5/5)
                </span>
              </div>

              {/* Progress Stepper Preview */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Deployment Workflow</span>
                  <span className="text-brand-600 dark:text-brand-400">Step 6 of 8</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-600 to-emerald-500 h-full w-[75%]" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Workers confirmed & dispatched via central transit hub.
                </p>
              </div>

              {/* Assigned Worker Quick List */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Assigned Mason Team
                </p>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                      RK
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">Ramesh Kumar</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Aadhaar Verified • 6 yrs exp</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    4.8
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      VS
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">Vikram Singh</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Aadhaar Verified • 7 yrs exp</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    4.95
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 text-white text-xs font-semibold flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Daily Attendance Auto-Logged</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Live Sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
