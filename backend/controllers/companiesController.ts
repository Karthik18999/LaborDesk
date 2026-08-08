import { memoryDb } from '@/database/db';
import { Company, CompanyStatus } from '@/lib/types';

/**
 * Backend Companies Controller
 * Manages corporate client profiles, GSTIN verification, and status updates.
 */

export async function getAllCompanies() {
  return { success: true, count: memoryDb.companies.length, data: memoryDb.companies };
}

export async function getCompanyById(id: string) {
  const company = memoryDb.companies.find((c: Company) => c.id === id);
  if (!company) {
    return { success: false, error: 'Company not found' };
  }
  return { success: true, data: company };
}

export async function updateCompanyStatus(id: string, status: CompanyStatus) {
  const companyIndex = memoryDb.companies.findIndex((c: Company) => c.id === id);
  if (companyIndex === -1) {
    return { success: false, error: 'Company not found' };
  }

  memoryDb.companies[companyIndex].status = status;
  return { success: true, message: `Company status updated to ${status}`, data: memoryDb.companies[companyIndex] };
}
