import { NextResponse } from 'next/server';
import { memoryDb } from '../db';

export async function GET() {
  const totalWorkers = memoryDb.workers.length;
  const availableWorkers = memoryDb.workers.filter((w) => w.currentStatus === 'Available').length;
  const assignedWorkers = memoryDb.workers.filter((w) => w.currentStatus === 'Assigned').length;

  const totalCompanies = memoryDb.companies.length;
  const activeCompanies = memoryDb.companies.filter((c) => c.status === 'Active').length;

  const totalRevenue = memoryDb.payments.reduce((acc, p) => acc + p.amount, 0);

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
