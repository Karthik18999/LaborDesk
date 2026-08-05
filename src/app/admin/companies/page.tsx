'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Company, CompanyStatus } from '@/lib/types';
import {
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Eye,
  FileText,
  IndianRupee,
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  X,
} from 'lucide-react';

export default function CompaniesManagementPage() {
  const { companies, updateCompanyStatus, searchQuery, setSearchQuery } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.gstNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Corporate Client Management</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Verify GST numbers, approve new enterprise accounts, or suspend non-compliant companies.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company name, GST, contact person, industry..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full sm:w-44 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
        >
          <option value="All">All Client Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending Approval">Pending Approval</option>
          <option value="Suspended">Suspended</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Companies List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            {/* Header: Name, GST, Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-600/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                    {company.companyName}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">GST: {company.gstNumber}</span>
                </div>
              </div>

              <span
                className={`px-3 py-1 text-[11px] font-bold rounded-full ${
                  company.status === 'Active'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : company.status === 'Pending Approval'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse'
                    : company.status === 'Suspended'
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {company.status}
              </span>
            </div>

            {/* Details Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Industry:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{company.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Person:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{company.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Plan Tier:</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">{company.subscriptionPlan} Plan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Hired Jobs:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{company.hiringHistoryCount} workers</span>
              </div>
            </div>

            {/* Contact strip */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {company.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {company.email}
              </span>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setViewingCompany(company)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Eye className="w-3.5 h-3.5" /> Full Profile
              </button>

              <div className="flex items-center gap-1.5">
                {company.status !== 'Active' && (
                  <button
                    onClick={() => updateCompanyStatus(company.id, 'Active')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                )}

                {company.status !== 'Suspended' && (
                  <button
                    onClick={() => updateCompanyStatus(company.id, 'Suspended')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" /> Suspend
                  </button>
                )}

                {company.status !== 'Rejected' && (
                  <button
                    onClick={() => updateCompanyStatus(company.id, 'Rejected')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Company Modal */}
      {viewingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setViewingCompany(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{viewingCompany.companyName}</h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{viewingCompany.industry}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
              <p><strong>GST Number:</strong> {viewingCompany.gstNumber}</p>
              <p><strong>Office Address:</strong> {viewingCompany.officeAddress}</p>
              <p><strong>Contact Person:</strong> {viewingCompany.contactPerson}</p>
              <p><strong>Phone:</strong> {viewingCompany.phone}</p>
              <p><strong>Email:</strong> {viewingCompany.email}</p>
              <p><strong>Subscription Plan:</strong> {viewingCompany.subscriptionPlan}</p>
              <p><strong>Total Hired History:</strong> {viewingCompany.hiringHistoryCount} workers</p>
              <p><strong>Total Billing Amount:</strong> ₹{viewingCompany.totalSpent.toLocaleString('en-IN')}</p>
              <p><strong>Joined System:</strong> {viewingCompany.joinedDate}</p>
            </div>

            <button
              onClick={() => setViewingCompany(null)}
              className="w-full py-2.5 bg-slate-900 text-white dark:bg-slate-800 rounded-xl text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
