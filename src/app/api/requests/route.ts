import { NextResponse } from 'next/server';
import { memoryDb } from '@/database/db';
import { WorkerRequest } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');

  let results = memoryDb.requests;
  if (companyId) {
    results = results.filter((r: WorkerRequest) => r.companyId === companyId);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    requests: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newId = `REQ-${5000 + memoryDb.requests.length + 1}`;
    const newRequest = {
      ...body,
      id: newId,
      assignedWorkerIds: [],
      workflowStatus: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    memoryDb.requests.unshift(newRequest);

    return NextResponse.json({
      success: true,
      message: 'Worker request created successfully.',
      request: newRequest,
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
  }
}
