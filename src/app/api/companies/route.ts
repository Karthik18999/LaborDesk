import { NextResponse } from 'next/server';
import { memoryDb } from '@/database/db';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: memoryDb.companies.length,
    companies: memoryDb.companies,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newId = `CMP-${2000 + memoryDb.companies.length + 1}`;
    const newCompany = {
      ...body,
      id: newId,
      status: body.status || 'Pending Approval',
      joinedDate: new Date().toISOString().split('T')[0],
      hiringHistoryCount: 0,
      totalSpent: 0,
    };

    memoryDb.companies.unshift(newCompany);

    return NextResponse.json({
      success: true,
      message: 'Company registration received.',
      company: newCompany,
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
  }
}
