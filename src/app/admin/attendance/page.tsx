'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { AttendanceStatus } from '@/lib/types';
import { CalendarCheck, Search, Clock, CheckCircle2, AlertCircle, Plus, X } from 'lucide-react';

export default function AdminAttendancePage() {
  const { attendance, workers, companies, requests, updateAttendanceStatus, addAttendanceRecord } = useApp();

  const [selectedDate, setSelectedDate] = useState<string>('2026-08-05');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // New Log Form
  const [logWorkerId, setLogWorkerId] = useState(workers[0]?.id || '');
  const [logCompanyId, setLogCompanyId] = useState(companies[0]?.id || '');
  const [logCheckIn, setLogCheckIn] = useState('08:00 AM');
  const [logCheckOut, setLogCheckOut] = useState('05:00 PM');
  const [logStatus, setLogStatus] = useState<AttendanceStatus>('Present');

  const filteredAttendance = attendance.filter((att) => {
    const matchesSearch =
      att.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      att.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || att.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const w = workers.find((w) => w.id === logWorkerId);
    const c = companies.find((c) => c.id === logCompanyId);
    if (!w || !c) return;

    addAttendanceRecord({
      workerId: w.id,
      workerName: w.fullName,
      companyId: c.id,
      companyName: c.companyName,
      requestId: 'REQ-5001',
      date: selectedDate,
      checkIn: logCheckIn,
      checkOut: logCheckOut,
      status: logStatus,
    });
    setIsLogModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Daily Site Attendance Tracking</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor daily check-in, check-out, late arrivals, and half-day logs across active construction sites.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold"
          />

          <button
            onClick={() => setIsLogModalOpen(true)}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Manual Check-In Log
          </button>
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
            placeholder="Search attendance by worker name or company..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-40 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
        >
          <option value="All">All Statuses</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
          <option value="Half Day">Half Day</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Worker Name</th>
                <th className="p-4">Assigned Company</th>
                <th className="p-4">Date</th>
                <th className="p-4">Check In</th>
                <th className="p-4">Check Out</th>
                <th className="p-4">Attendance Status</th>
                <th className="p-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredAttendance.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    {rec.workerName}
                    <span className="block text-[10px] text-slate-400 font-normal">ID: {rec.workerId}</span>
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{rec.companyName}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{rec.date}</td>
                  <td className="p-4 text-emerald-600 font-semibold">{rec.checkIn}</td>
                  <td className="p-4 text-brand-600 font-semibold">{rec.checkOut}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        rec.status === 'Present'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          : rec.status === 'Late'
                          ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                          : rec.status === 'Half Day'
                          ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                          : 'bg-red-500/10 text-red-600 border border-red-500/20'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={rec.status}
                      onChange={(e) => updateAttendanceStatus(rec.id, e.target.value as AttendanceStatus)}
                      className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold"
                    >
                      <option value="Present">Set Present</option>
                      <option value="Absent">Set Absent</option>
                      <option value="Late">Set Late</option>
                      <option value="Half Day">Set Half Day</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Check In Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsLogModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Record Daily Check-In</h3>

            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Worker</label>
                <select
                  value={logWorkerId}
                  onChange={(e) => setLogWorkerId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.fullName} ({w.subSkill})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Client Site</label>
                <select
                  value={logCompanyId}
                  onChange={(e) => setLogCompanyId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Check In</label>
                  <input
                    type="text"
                    value={logCheckIn}
                    onChange={(e) => setLogCheckIn(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Check Out</label>
                  <input
                    type="text"
                    value={logCheckOut}
                    onChange={(e) => setLogCheckOut(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <select
                  value={logStatus}
                  onChange={(e) => setLogStatus(e.target.value as AttendanceStatus)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Half Day">Half Day</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg"
              >
                Log Attendance
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
