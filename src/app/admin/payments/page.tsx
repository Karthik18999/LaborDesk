'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { PaymentRecord } from '@/lib/types';
import { CreditCard, IndianRupee, FileText, CheckCircle2, Download, Printer, X, Eye } from 'lucide-react';

export default function AdminPaymentsPage() {
  const { payments, markPaymentPaid } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentRecord | null>(null);

  const totalCollected = payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Wage & Invoicing Hub</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track daily, weekly, and monthly wage disbursements and export formatted PDF invoices.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Paid Invoices Total</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{totalCollected.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Pending Receivables</span>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            ₹{totalPending.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Billed Invoices</span>
          <p className="text-2xl font-extrabold text-brand-600 dark:text-brand-400 mt-1">{payments.length} Invoices</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Company Name</th>
                <th className="p-4">Billing Period</th>
                <th className="p-4">Wage Cycle</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{p.id}</td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{p.companyName}</td>
                  <td className="p-4 text-slate-500">{p.billingPeriod}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg font-semibold text-slate-700 dark:text-slate-300">
                      {p.wageType}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        p.status === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {p.status !== 'Paid' && (
                      <button
                        onClick={() => markPaymentPaid(p.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                      >
                        Mark Paid
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedInvoice(p)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 rounded-xl text-xs font-semibold"
                    >
                      View Invoice PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Invoice Modal Preview */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Invoice Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
              <div>
                <h1 className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">LABOR DESK PLATFORM</h1>
                <p className="text-xs text-slate-500">Official Tax Invoice & Wage Statement</p>
                <p className="text-xs text-slate-400">Cyber Park, Sector 62, Noida, UP - 201309</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-400">INVOICE NUMBER</span>
                <p className="text-base font-bold font-mono text-slate-900 dark:text-white">{selectedInvoice.id}</p>
                <p className="text-xs text-slate-500">Date: {new Date().toISOString().split('T')[0]}</p>
              </div>
            </div>

            {/* Billed To */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">BILLED CLIENT</span>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedInvoice.companyName}</p>
                <p className="text-slate-500">GSTIN: 07AAAAA0000A1Z5</p>
                <p className="text-slate-500">Sector 62 Industrial Area, Noida</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">PAYMENT METRICS</span>
                <p className="text-slate-600 dark:text-slate-300">Billing Cycle: {selectedInvoice.billingPeriod}</p>
                <p className="text-slate-600 dark:text-slate-300">Wage Type: {selectedInvoice.wageType}</p>
                <p className="font-bold text-emerald-600">Status: {selectedInvoice.status}</p>
              </div>
            </div>

            {/* Itemized Line Table */}
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Daily Wage Rate</th>
                  <th className="p-3 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-semibold">Skilled Labor Deployment (Mason / Bricklayer)</td>
                  <td className="p-3">5 Workers</td>
                  <td className="p-3">₹900 / day</td>
                  <td className="p-3 text-right font-bold">₹{selectedInvoice.amount.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>

            {/* Total Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-500">Authorized Signature: Central Admin Hub</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Grand Total Payable</span>
                <p className="text-2xl font-extrabold text-brand-600">₹{selectedInvoice.amount.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Download/Print Action */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print / Download PDF Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
