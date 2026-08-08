import { memoryDb } from '@/database/db';
import { Worker, WorkerRequest } from '@/lib/types';

/**
 * Intelligent Candidate Matching Engine
 * Matches worker skill trade, availability, Aadhaar verification, and daily wage against request requirements.
 */

export function findMatchingWorkers(request: WorkerRequest): Worker[] {
  return memoryDb.workers.filter(
    (w: Worker) =>
      w.currentStatus === 'Available' &&
      w.verificationStatus === 'Verified' &&
      (w.subSkill.toLowerCase() === request.subSkill.toLowerCase() ||
        w.skill.toLowerCase() === request.skillRequired.toLowerCase()) &&
      w.dailyWage <= request.dailyWageOffered + 100
  );
}
