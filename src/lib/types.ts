export type UserRole = 'admin' | 'company';

export type WorkerStatus = 'Available' | 'Assigned' | 'Inactive';
export type VerificationStatus = 'Verified' | 'Pending' | 'Rejected';

export interface Worker {
  id: string;
  fullName: string;
  photoUrl: string;
  phoneNumber: string;
  aadhaarNumber: string;
  village: string;
  district: string;
  state: string;
  skill: string;
  subSkill: string;
  experienceYears: number;
  languages: string[];
  dailyWage: number;
  availability: boolean;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  notes: string;
  rating: number;
  completedJobs: number;
  currentStatus: WorkerStatus;
  verificationStatus: VerificationStatus;
  documents: {
    photo: boolean;
    aadhaarCard: boolean;
    certificates: boolean;
  };
  registeredAt: string;
}

export type CompanyStatus = 'Active' | 'Pending Approval' | 'Rejected' | 'Suspended';

export interface Company {
  id: string;
  companyName: string;
  gstNumber: string;
  industry: string;
  officeAddress: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: CompanyStatus;
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
  hiringHistoryCount: number;
  totalSpent: number;
  joinedDate: string;
}

export type RequestPriority = 'Normal' | 'High' | 'Urgent';

export type WorkflowStatus =
  | 'Pending'
  | 'Reviewing'
  | 'Searching Workers'
  | 'Workers Contacted'
  | 'Workers Confirmed'
  | 'Workers Assigned'
  | 'Workers Reached Site'
  | 'Completed'
  | 'Cancelled';

export interface WorkerRequest {
  id: string;
  companyId: string;
  companyName: string;
  skillRequired: string;
  subSkill: string;
  numberOfWorkers: number;
  assignedWorkerIds: string[];
  location: string;
  reportingDate: string;
  reportingTime: string;
  durationDays: number;
  dailyWageOffered: number;
  foodProvided: boolean;
  accommodationProvided: boolean;
  transportationProvided: boolean;
  genderPreference: 'Any' | 'Male' | 'Female';
  experienceRequiredYears: number;
  remarks: string;
  priority: RequestPriority;
  workflowStatus: WorkflowStatus;
  createdAt: string;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Half Day';

export interface AttendanceRecord {
  id: string;
  workerId: string;
  workerName: string;
  companyId: string;
  companyName: string;
  requestId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
}

export interface PaymentRecord {
  id: string;
  companyId: string;
  companyName: string;
  requestId: string;
  amount: number;
  billingPeriod: string;
  wageType: 'Daily' | 'Weekly' | 'Monthly';
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  paidDate?: string;
  invoiceUrl?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  recipientRole: 'admin' | 'company';
  companyId?: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  role: UserRole;
  details: string;
  timestamp: string;
}
