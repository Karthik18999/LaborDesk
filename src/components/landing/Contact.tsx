'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
            Get In Touch
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Central Admin & Operations Hub
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Visit our physical office for worker registration or reach out to our enterprise support desk.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Bangalore Office Address */}
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all space-y-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Central Admin Hub Office</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                7th Floor, Prestige Trade Tower, Palace Road, High Grounds, Bengaluru, Karnataka - 560001
              </p>
            </div>
          </div>

          {/* Card 2: Helpline */}
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all space-y-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Helpline & Registration</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                +91 80 4567 8900
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                +91 98800 12345
              </p>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all space-y-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Corporate Inquiries</h3>
              <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold leading-relaxed">
                support@labordesk.in
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
