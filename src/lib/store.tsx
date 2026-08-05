'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Worker,
  Company,
  WorkerRequest,
  AttendanceRecord,
  PaymentRecord,
  AppNotification,
  UserRole,
  CompanyStatus,
  WorkflowStatus,
  AttendanceStatus,
} from './types';
import {
  INITIAL_WORKERS,
  INITIAL_COMPANIES,
  INITIAL_REQUESTS,
  INITIAL_ATTENDANCE,
  INITIAL_PAYMENTS,
  INITIAL_NOTIFICATIONS,
} from './mockData';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

export interface UserProfile {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  companyName?: string;
}

const DEFAULT_INDUSTRIES = [
  'Construction & Civil Works',
  'Logistics & Warehousing',
  'Heavy Manufacturing & Mills',
  'Renewable Energy',
  'Infrastructure & EPC',
  'Metal Fabrication & Welding Yards',
  'E-Commerce Fulfillment Centers',
];

interface AppContextType {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Auth / Role / User Profile
  role: UserRole | 'guest';
  setRole: (role: UserRole | 'guest') => void;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  currentCompany: Company | null;
  setCurrentCompanyId: (id: string) => void;

  // Registered Auth Accounts (Sign Up Memory)
  registeredUsers: UserProfile[];
  addRegisteredUser: (user: UserProfile) => void;

  // Dynamic Industries
  industries: string[];
  addIndustry: (industryName: string) => void;

  // Data Collections
  workers: Worker[];
  companies: Company[];
  requests: WorkerRequest[];
  attendance: AttendanceRecord[];
  payments: PaymentRecord[];
  notifications: AppNotification[];

  // Worker Actions
  addWorker: (worker: Omit<Worker, 'id' | 'registeredAt'>) => void;
  updateWorker: (id: string, updated: Partial<Worker>) => void;
  deleteWorker: (id: string) => void;
  toggleWorkerStatus: (id: string, status: Worker['currentStatus']) => void;

  // Company Actions
  addCompany: (company: Omit<Company, 'id' | 'joinedDate' | 'hiringHistoryCount' | 'totalSpent'>) => void;
  updateCompanyStatus: (id: string, status: CompanyStatus) => void;

  // Request Actions
  createRequest: (request: Omit<WorkerRequest, 'id' | 'assignedWorkerIds' | 'workflowStatus' | 'createdAt'>) => void;
  updateRequestWorkflow: (requestId: string, status: WorkflowStatus) => void;
  assignWorkersToRequest: (requestId: string, workerIds: string[]) => void;

  // Attendance Actions
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => void;
  updateAttendanceStatus: (id: string, status: AttendanceStatus) => void;

  // Payments Actions
  markPaymentPaid: (paymentId: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;

  // Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole | 'guest'>('guest');
  const [currentCompanyId, setCurrentCompanyId] = useState<string>('CMP-2001');

  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    name: 'Central Administrator',
    email: 'admin@labordesk.in',
    role: 'admin',
  });

  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>([
    { name: 'Central Administrator', email: 'admin@labordesk.in', password: 'admin123', role: 'admin' },
    { name: 'Vikrant Deshmukh', email: 'hr@ltconst.com', password: 'company123', role: 'company', companyName: 'L&T Infrastructure Construtec Ltd' },
  ]);

  const [industries, setIndustries] = useState<string[]>(DEFAULT_INDUSTRIES);

  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [requests, setRequests] = useState<WorkerRequest[]>(INITIAL_REQUESTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addRegisteredUser = (user: UserProfile) => {
    setRegisteredUsers((prev) => [...prev, user]);
  };

  const addIndustry = (industryName: string) => {
    const trimmed = industryName.trim();
    if (!trimmed || industries.includes(trimmed)) return;
    setIndustries((prev) => [...prev, trimmed]);
    addToast({
      title: 'New Industry Added',
      description: `'${trimmed}' is now available across registration forms & dashboards.`,
      variant: 'success',
    });
  };

  const addWorker = (newWorkerData: Omit<Worker, 'id' | 'registeredAt'>) => {
    const newId = `WKR-${1000 + workers.length + 1}`;
    const newWorker: Worker = {
      ...newWorkerData,
      id: newId,
      registeredAt: new Date().toISOString().split('T')[0],
    };
    setWorkers((prev) => [newWorker, ...prev]);
    addToast({
      title: 'Worker Registered Successfully',
      description: `${newWorker.fullName} has been added to the physical registry.`,
      variant: 'success',
    });
  };

  const updateWorker = (id: string, updated: Partial<Worker>) => {
    setWorkers((prev) => prev.map((w) => (w.id === id ? { ...w, ...updated } : w)));
    addToast({
      title: 'Worker Information Updated',
      description: `Worker ID ${id} profile has been saved.`,
      variant: 'success',
    });
  };

  const deleteWorker = (id: string) => {
    setWorkers((prev) => prev.filter((w) => w.id !== id));
    addToast({
      title: 'Worker Deleted',
      description: `Worker ID ${id} removed from system.`,
      variant: 'destructive',
    });
  };

  const toggleWorkerStatus = (id: string, status: Worker['currentStatus']) => {
    setWorkers((prev) => prev.map((w) => (w.id === id ? { ...w, currentStatus: status, availability: status === 'Available' } : w)));
    addToast({
      title: 'Status Updated',
      description: `Worker ${id} is now ${status}.`,
      variant: 'default',
    });
  };

  const addCompany = (companyData: Omit<Company, 'id' | 'joinedDate' | 'hiringHistoryCount' | 'totalSpent'>) => {
    const newId = `CMP-${2000 + companies.length + 1}`;
    const newCompany: Company = {
      ...companyData,
      id: newId,
      joinedDate: new Date().toISOString().split('T')[0],
      hiringHistoryCount: 0,
      totalSpent: 0,
    };
    setCompanies((prev) => [newCompany, ...prev]);

    // Ensure industry is added if new
    if (newCompany.industry && !industries.includes(newCompany.industry)) {
      setIndustries((prev) => [...prev, newCompany.industry]);
    }
  };

  const updateCompanyStatus = (id: string, status: CompanyStatus) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    addToast({
      title: 'Company Status Updated',
      description: `Company ID ${id} is now ${status}.`,
      variant: 'default',
    });
  };

  const createRequest = (reqData: Omit<WorkerRequest, 'id' | 'assignedWorkerIds' | 'workflowStatus' | 'createdAt'>) => {
    const newId = `REQ-${5000 + requests.length + 1}`;
    const newReq: WorkerRequest = {
      ...reqData,
      id: newId,
      assignedWorkerIds: [],
      workflowStatus: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRequests((prev) => [newReq, ...prev]);

    // Notify Admin
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'New Worker Request',
        message: `${newReq.companyName} requested ${newReq.numberOfWorkers} ${newReq.subSkill}(s).`,
        recipientRole: 'admin',
        timestamp: 'Just now',
        read: false,
        type: 'info',
      },
      ...prev,
    ]);

    addToast({
      title: 'Request Submitted',
      description: `Worker Request ID ${newId} created. Admin team is matching candidates.`,
      variant: 'success',
    });
  };

  const updateRequestWorkflow = (requestId: string, status: WorkflowStatus) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return { ...r, workflowStatus: status };
        }
        return r;
      })
    );
    addToast({
      title: 'Workflow Status Updated',
      description: `Request ${requestId} moved to '${status}'.`,
      variant: 'default',
    });
  };

  const assignWorkersToRequest = (requestId: string, workerIds: string[]) => {
    let targetCompanyId = '';
    let reqTitle = '';

    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          targetCompanyId = r.companyId;
          reqTitle = `${r.numberOfWorkers} ${r.subSkill}`;
          return {
            ...r,
            assignedWorkerIds: workerIds,
            workflowStatus: 'Workers Assigned',
          };
        }
        return r;
      })
    );

    // Update worker status to Assigned
    setWorkers((prev) =>
      prev.map((w) => (workerIds.includes(w.id) ? { ...w, currentStatus: 'Assigned', availability: false } : w))
    );

    // Notify Company
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Workers Assigned!',
        message: `Admin assigned ${workerIds.length} worker(s) to your request (${reqTitle}).`,
        recipientRole: 'company',
        companyId: targetCompanyId,
        timestamp: 'Just now',
        read: false,
        type: 'success',
      },
      ...prev,
    ]);

    addToast({
      title: 'Workers Assigned Successfully',
      description: `${workerIds.length} worker(s) assigned to ${requestId}. Notification sent to company.`,
      variant: 'success',
    });
  };

  const addAttendanceRecord = (rec: Omit<AttendanceRecord, 'id'>) => {
    const newId = `ATT-${Date.now().toString().slice(-4)}`;
    const newRecord: AttendanceRecord = { ...rec, id: newId };
    setAttendance((prev) => [newRecord, ...prev]);
    addToast({
      title: 'Attendance Logged',
      description: `Check-in recorded for ${rec.workerName}.`,
      variant: 'success',
    });
  };

  const updateAttendanceStatus = (id: string, status: AttendanceStatus) => {
    setAttendance((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    addToast({
      title: 'Attendance Status Updated',
      description: `Log updated to ${status}.`,
      variant: 'default',
    });
  };

  const markPaymentPaid = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? { ...p, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    addToast({
      title: 'Payment Confirmed',
      description: `Invoice ${paymentId} marked as Paid.`,
      variant: 'success',
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const currentCompany = companies.find((c) => c.id === currentCompanyId) || companies[0];

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        role,
        setRole,
        currentUser,
        setCurrentUser,
        currentCompany,
        setCurrentCompanyId,
        registeredUsers,
        addRegisteredUser,
        industries,
        addIndustry,
        workers,
        companies,
        requests,
        attendance,
        payments,
        notifications,
        addWorker,
        updateWorker,
        deleteWorker,
        toggleWorkerStatus,
        addCompany,
        updateCompanyStatus,
        createRequest,
        updateRequestWorkflow,
        assignWorkersToRequest,
        addAttendanceRecord,
        updateAttendanceStatus,
        markPaymentPaid,
        markNotificationRead,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
