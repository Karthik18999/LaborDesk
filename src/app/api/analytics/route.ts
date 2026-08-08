import { NextResponse } from 'next/server';
import { memoryDb } from '@/database/db';
import { Worker, Company, PaymentRecord } from '@/lib/types';

export async function GET() {
  const totalWorkers = memoryDb.workers.length;
  const availableWorkers = memoryDb.workers.filter((w: Worker) => w.currentStatus === 'Available').length;
  const assignedWorkers = memoryDb.workers.filter((w: Worker) => w.currentStatus === 'Assigned').length;

  const totalCompanies = memoryDb.companies.length;
  const activeCompanies = memoryDb.companies.filter((c: Company) => c.status === 'Active').length;

  const totalRevenue = memoryDb.payments.reduce((acc: number, p: PaymentRecord) => acc + (p.amount || 0), 0);

  return NextResponse.json({
    success: true,
    metrics: {
      totalWorkers,
      availableWorkers,
      assignedWorkers,
      totalCompanies,
      activeCompanies,
      totalRevenue,
      activeRequestsCount: memoryDb.requests.length,
    },
  });
}
