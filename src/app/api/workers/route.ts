import { NextResponse } from 'next/server';
import { memoryDb } from '@/database/db';
import { Worker } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skill = searchParams.get('skill');
  const status = searchParams.get('status');
  const query = searchParams.get('q');

  let results = memoryDb.workers;

  if (skill && skill !== 'All') {
    results = results.filter((w: Worker) => w.skill === skill);
  }
  if (status && status !== 'All') {
    results = results.filter((w: Worker) => w.currentStatus === status);
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (w: Worker) =>
        w.fullName.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.district.toLowerCase().includes(q) ||
        w.subSkill.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    workers: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newId = `WKR-${1000 + memoryDb.workers.length + 1}`;
    const newWorker = {
      ...body,
      id: newId,
      registeredAt: new Date().toISOString().split('T')[0],
    };

    memoryDb.workers.unshift(newWorker);

    return NextResponse.json({
      success: true,
      message: 'Worker created successfully in physical registry.',
      worker: newWorker,
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
  }
}
