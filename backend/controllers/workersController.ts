import { memoryDb } from '@/database/db';
import { Worker } from '@/lib/types';

/**
 * Backend Workers Controller
 * Manages worker registration, status updates, and skill filtering.
 */

export async function getAllWorkers(searchQuery?: string, category?: string) {
  let result = memoryDb.workers;

  if (category && category !== 'All') {
    result = result.filter((w: Worker) => w.skill === category);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(
      (w: Worker) =>
        w.fullName.toLowerCase().includes(query) ||
        w.subSkill.toLowerCase().includes(query) ||
        w.district.toLowerCase().includes(query)
    );
  }

  return { success: true, count: result.length, data: result };
}

export async function getWorkerById(id: string) {
  const worker = memoryDb.workers.find((w: Worker) => w.id === id);
  if (!worker) {
    return { success: false, error: 'Worker not found' };
  }
  return { success: true, data: worker };
}

export async function createWorker(workerData: Omit<Worker, 'id' | 'registeredAt'>) {
  const newId = `WKR-${1000 + memoryDb.workers.length + 1}`;
  const newWorker: Worker = {
    ...workerData,
    id: newId,
    registeredAt: new Date().toISOString().split('T')[0],
  };

  memoryDb.workers.unshift(newWorker);
  return { success: true, message: 'Worker registered in physical database', data: newWorker };
}
