'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Worker, WorkerStatus, VerificationStatus } from '@/lib/types';
import { SKILL_CATEGORIES } from '@/lib/mockData';
import {
  UserPlus,
  Search,
  Filter,
  Star,
  Phone,
  MapPin,
  ShieldCheck,
  Edit,
  Trash2,
  CheckCircle,
  X,
  FileCheck,
  Clock,
  Eye,
  Check,
} from 'lucide-react';

export default function WorkerManagementPage() {
  const { workers, addWorker, updateWorker, deleteWorker, toggleWorkerStatus, searchQuery, setSearchQuery } = useApp();

  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedVerification, setSelectedVerification] = useState<string>('All');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  const [viewingWorker, setViewingWorker] = useState<Worker | null>(null);

  // New Worker Form state
  const [formData, setFormData] = useState({
    fullName: '',
    photoUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    phoneNumber: '',
    aadhaarNumber: '',
    village: '',
    district: '',
    state: 'Uttar Pradesh',
    skill: 'Construction',
    subSkill: 'Mason / Bricklayer',
    experienceYears: 5,
    languages: ['Hindi'],
    dailyWage: 850,
    availability: true,
    emergencyContactName: '',
    emergencyContactRel: 'Wife',
    emergencyContactPhone: '',
    notes: 'Registered physically at central admin hub office.',
    rating: 4.8,
    completedJobs: 0,
    currentStatus: 'Available' as WorkerStatus,
    verificationStatus: 'Verified' as VerificationStatus,
    photoUploaded: true,
    aadhaarUploaded: true,
    certificatesUploaded: true,
  });

  // Filtered workers
  const filteredWorkers = workers.filter((w) => {
    const matchesSearch =
      w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.subSkill.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkill = selectedSkill === 'All' || w.skill === selectedSkill;
    const matchesStatus = selectedStatus === 'All' || w.currentStatus === selectedStatus;
    const matchesVerification = selectedVerification === 'All' || w.verificationStatus === selectedVerification;

    return matchesSearch && matchesSkill && matchesStatus && matchesVerification;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorker({
      fullName: formData.fullName,
      photoUrl: formData.photoUrl,
      phoneNumber: formData.phoneNumber,
      aadhaarNumber: formData.aadhaarNumber,
      village: formData.village,
      district: formData.district,
      state: formData.state,
      skill: formData.skill,
      subSkill: formData.subSkill,
      experienceYears: Number(formData.experienceYears),
      languages: formData.languages,
      dailyWage: Number(formData.dailyWage),
      availability: formData.availability,
      emergencyContact: {
        name: formData.emergencyContactName,
        relationship: formData.emergencyContactRel,
        phone: formData.emergencyContactPhone,
      },
      notes: formData.notes,
      rating: formData.rating,
      completedJobs: formData.completedJobs,
      currentStatus: formData.currentStatus,
      verificationStatus: formData.verificationStatus,
      documents: {
        photo: formData.photoUploaded,
        aadhaarCard: formData.aadhaarUploaded,
        certificates: formData.certificatesUploaded,
      },
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorker) return;
    updateWorker(editingWorker.id, editingWorker);
    setEditingWorker(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Physical Worker Registry</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage all in-person registered blue-collar workers, Aadhaar verifications, and trade skills.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Register New Worker (In-Office)
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by worker name, ID, village, district, or skill..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          />
        </div>

        {/* Skill Filter */}
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="w-full md:w-44 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
        >
          <option value="All">All Skill Trades</option>
          {SKILL_CATEGORIES.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full md:w-36 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
        >
          <option value="All">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Verification Filter */}
        <select
          value={selectedVerification}
          onChange={(e) => setSelectedVerification(e.target.value)}
          className="w-full md:w-36 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
        >
          <option value="All">All Verifications</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Workers Grid / Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            {/* Top Row: Photo, ID, Verification */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={worker.photoUrl}
                  alt={worker.fullName}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-800"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{worker.fullName}</h3>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">{worker.id}</span>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                  worker.verificationStatus === 'Verified'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : worker.verificationStatus === 'Pending'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400'
                }`}
              >
                {worker.verificationStatus}
              </span>
            </div>

            {/* Skill & Wage Details */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Trade Skill:</span>
                <span className="font-bold text-slate-900 dark:text-white">{worker.skill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sub Skill:</span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">{worker.subSkill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Daily Wage:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{worker.dailyWage}/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {worker.village}, {worker.district}
                </span>
              </div>
            </div>

            {/* Document Checklist */}
            <div className="flex items-center justify-between text-[11px] px-1">
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">{worker.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                {worker.rating} ({worker.completedJobs} jobs)
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              {/* Status Toggle Button */}
              <button
                onClick={() =>
                  toggleWorkerStatus(worker.id, worker.currentStatus === 'Available' ? 'Assigned' : 'Available')
                }
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                  worker.currentStatus === 'Available'
                    ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                    : worker.currentStatus === 'Assigned'
                    ? 'bg-brand-500/10 text-brand-600 hover:bg-brand-500/20'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                Status: {worker.currentStatus}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewingWorker(worker)}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="View Profile Details"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setEditingWorker(worker)}
                  className="p-2 rounded-xl text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950"
                  title="Edit Worker"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => deleteWorker(worker.id)}
                  className="p-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  title="Delete Worker"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Worker Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">In-Office Physical Worker Registration</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Worker Name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    required
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Aadhaar Card Number</label>
                  <input
                    required
                    type="text"
                    value={formData.aadhaarNumber}
                    onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                    placeholder="XXXX-XXXX-1234"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Daily Wage (₹)</label>
                  <input
                    required
                    type="number"
                    value={formData.dailyWage}
                    onChange={(e) => setFormData({ ...formData, dailyWage: Number(e.target.value) })}
                    placeholder="850"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Village</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="Village Name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">District</label>
                  <input
                    required
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="District"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">State</label>
                  <input
                    required
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Skill</label>
                  <select
                    value={formData.skill}
                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {SKILL_CATEGORIES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Sub Skill Trade</label>
                  <input
                    required
                    type="text"
                    value={formData.subSkill}
                    onChange={(e) => setFormData({ ...formData, subSkill: e.target.value })}
                    placeholder="e.g. Mason / Bricklayer"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Emergency Contact Info</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Contact Name"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Relationship (e.g. Wife)"
                    value={formData.emergencyContactRel}
                    onChange={(e) => setFormData({ ...formData, emergencyContactRel: e.target.value })}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
              >
                Complete Worker Registration
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detailed View Modal */}
      {viewingWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setViewingWorker(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img src={viewingWorker.photoUrl} alt="" className="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{viewingWorker.fullName}</h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{viewingWorker.subSkill}</p>
                <p className="text-[11px] text-slate-400">ID: {viewingWorker.id} • Registered {viewingWorker.registeredAt}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
              <p><strong>Aadhaar:</strong> {viewingWorker.aadhaarNumber}</p>
              <p><strong>Phone:</strong> {viewingWorker.phoneNumber}</p>
              <p><strong>Experience:</strong> {viewingWorker.experienceYears} Years</p>
              <p><strong>Native Village:</strong> {viewingWorker.village}, {viewingWorker.district}, {viewingWorker.state}</p>
              <p><strong>Languages:</strong> {viewingWorker.languages.join(', ')}</p>
              <p><strong>Emergency Contact:</strong> {viewingWorker.emergencyContact.name} ({viewingWorker.emergencyContact.relationship}) - {viewingWorker.emergencyContact.phone}</p>
              <p><strong>Notes:</strong> {viewingWorker.notes}</p>
            </div>

            <button
              onClick={() => setViewingWorker(null)}
              className="w-full py-2.5 bg-slate-900 text-white dark:bg-slate-800 rounded-xl text-xs font-semibold"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
