import { memoryDb } from '@/database/db';
import { WorkerRequest, WorkflowStatus, Worker } from '@/lib/types';

/**
 * Backend Requests Controller
 * Handles corporate worker requirement dispatches and assignment workflow steps.
 */

export async function getAllRequests() {
  return { success: true, count: memoryDb.requests.length, data: memoryDb.requests };
}

export async function updateRequestWorkflow(requestId: string, status: WorkflowStatus) {
  const req = memoryDb.requests.find((r: WorkerRequest) => r.id === requestId);
  if (!req) {
    return { success: false, error: 'Request not found' };
  }

  req.workflowStatus = status;
  return { success: true, message: `Workflow status updated to ${status}`, data: req };
}

export async function assignWorkersToRequest(requestId: string, workerIds: string[]) {
  const req = memoryDb.requests.find((r: WorkerRequest) => r.id === requestId);
  if (!req) {
    return { success: false, error: 'Request not found' };
  }

  req.assignedWorkerIds = workerIds;
  req.workflowStatus = 'Workers Assigned';

  // Mark workers as Assigned
  memoryDb.workers = memoryDb.workers.map((w: Worker) =>
    workerIds.includes(w.id) ? { ...w, currentStatus: 'Assigned', availability: false } : w
  );

  return { success: true, message: `${workerIds.length} worker(s) assigned successfully`, data: req };
}
