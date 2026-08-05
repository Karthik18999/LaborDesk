'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { X, Building2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { industries, addCompany, setRole, addIndustry } = useApp();
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: '',
    gstNumber: '',
    industry: industries[0] || 'Construction & Civil Works',
    customIndustry: '',
    officeAddress: '',
    contactPerson: '',
    phone: '',
    email: '',
    subscriptionPlan: 'Pro' as 'Basic' | 'Pro' | 'Enterprise',
  });

  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalIndustry = formData.industry;
    if (showCustomInput && formData.customIndustry.trim()) {
      finalIndustry = formData.customIndustry.trim();
      addIndustry(finalIndustry);
    }

    addCompany({
      companyName: formData.companyName,
      gstNumber: formData.gstNumber,
      industry: finalIndustry,
      officeAddress: formData.officeAddress,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      email: formData.email,
      subscriptionPlan: formData.subscriptionPlan,
      status: 'Active',
    });

    setRole('company');
    onClose();
    router.push('/company');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Register Company</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Setup your corporate client portal</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
            <input
              required
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. Shapoorji Pallonji EPC"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">GST Number</label>
              <input
                required
                type="text"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                placeholder="27AAAAA0000A1Z5"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Industry Sector</label>
              {!showCustomInput ? (
                <div className="space-y-1">
                  <select
                    value={formData.industry}
                    onChange={(e) => {
                      if (e.target.value === 'ADD_NEW') {
                        setShowCustomInput(true);
                      } else {
                        setFormData({ ...formData, industry: e.target.value });
                      }
                    }}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 font-medium"
                  >
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                    <option value="ADD_NEW">+ Add New Custom Industry...</option>
                  </select>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    required
                    type="text"
                    value={formData.customIndustry}
                    onChange={(e) => setFormData({ ...formData, customIndustry: e.target.value })}
                    placeholder="Enter Custom Industry"
                    className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-brand-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="px-2.5 py-2 text-[10px] font-bold bg-slate-200 dark:bg-slate-700 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Person</label>
              <input
                required
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="HR Manager Name"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
              <input
                required
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98000 00000"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Office Address</label>
            <input
              required
              type="text"
              value={formData.officeAddress}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              placeholder="Full Head Office Address"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="hr@company.com"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
          >
            Complete Registration & Access Portal
          </button>
        </form>
      </div>
    </div>
  );
}
