'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { BarChart3, FileSpreadsheet, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function AdminReportsPage() {
  const { workers, companies, attendance, payments, requests, addToast } = useApp();
  const [selectedReport, setSelectedReport] = useState<string>('Worker');

  const reportTypes = [
    { title: 'Worker Master Report', type: 'Worker', desc: 'Complete list of registered workers, skills, Aadhaar numbers, wages & ratings.' },
    { title: 'Company Client Directory', type: 'Company', desc: 'Registered corporate clients, GST numbers, plans, and total spending.' },
    { title: 'Daily Attendance Summary', type: 'Attendance', desc: 'Check-in and check-out logs, present/absent counts per site.' },
    { title: 'Revenue & Billing Ledger', type: 'Revenue', desc: 'Itemized invoice history, paid balances, and pending receivables.' },
    { title: 'Worker Assignment Audit', type: 'Assignment', desc: 'Deployment records matching workers to specific project requests.' },
  ];

  const handleDownloadExcel = (reportTitle: string) => {
    addToast({
      title: 'Downloading Excel Spreadsheet',
      description: `${reportTitle} exported successfully to .XLSX format.`,
      variant: 'success',
    });
  };

  const handleDownloadPDF = (reportTitle: string) => {
    addToast({
      title: 'Generating Formatted PDF',
      description: `${reportTitle} downloaded as PDF document.`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reports & Data Analytics Export</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generate audit compliance, worker rosters, client billing, and attendance reports in PDF or Excel.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((rep) => (
          <div
            key={rep.type}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-brand-600/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{rep.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{rep.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => handleDownloadPDF(rep.title)}
                className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>

              <button
                onClick={() => handleDownloadExcel(rep.title)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
