'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Building2, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function CompanyProfilePage() {
  const { currentCompany } = useApp();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Corporate Client Profile</h2>
        <p className="text-xs text-slate-500">Your verified GST corporate account details.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{currentCompany?.companyName}</h3>
            <p className="text-xs text-emerald-600 font-semibold">{currentCompany?.industry}</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <p><strong>GSTIN Number:</strong> {currentCompany?.gstNumber}</p>
          <p><strong>Official Email:</strong> {currentCompany?.email}</p>
          <p><strong>Phone:</strong> {currentCompany?.phone}</p>
          <p><strong>Contact Person:</strong> {currentCompany?.contactPerson}</p>
          <p><strong>Office Address:</strong> {currentCompany?.officeAddress}</p>
          <p><strong>Subscription Tier:</strong> {currentCompany?.subscriptionPlan} Plan</p>
          <p><strong>Account Status:</strong> <span className="text-emerald-600 font-bold">{currentCompany?.status}</span></p>
        </div>
      </div>
    </div>
  );
}
