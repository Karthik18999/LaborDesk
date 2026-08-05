'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Receipt, Download, FileText } from 'lucide-react';

export default function CompanyInvoicesPage() {
  const { currentCompany, payments, addToast } = useApp();
  const companyPayments = payments.filter((p) => p.companyId === currentCompany?.id);

  const handleDownload = (id: string) => {
    addToast({
      title: 'Invoice Downloaded',
      description: `Invoice ${id} generated in PDF format.`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Invoices & Billing Statements</h2>
        <p className="text-xs text-slate-500">Download formatted tax invoices and wage receipts.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Billing Period</th>
              <th className="p-4">Wage Cycle</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Download PDF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {companyPayments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{p.id}</td>
                <td className="p-4 text-slate-500">{p.billingPeriod}</td>
                <td className="p-4">{p.wageType}</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">₹{p.amount.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      p.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDownload(p.id)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 ml-auto"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
