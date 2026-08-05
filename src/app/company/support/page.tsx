'use client';

import React from 'react';
import { HelpCircle, Phone, Mail, MessageSquare } from 'lucide-react';

export default function CompanySupportPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Help & Support Desk</h2>
        <p className="text-xs text-slate-500">Contact central admin hotline or submit priority site tickets.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <Phone className="w-6 h-6 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">24/7 Site Dispatch Hotline</h3>
          <p className="text-xs text-slate-500">+91 120 4567 890 / +91 98100 12345</p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <Mail className="w-6 h-6 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Corporate Support Email</h3>
          <p className="text-xs text-slate-500">support@labordesk.in</p>
        </div>
      </div>
    </div>
  );
}
