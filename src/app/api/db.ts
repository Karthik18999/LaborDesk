import { INITIAL_WORKERS, INITIAL_COMPANIES, INITIAL_REQUESTS, INITIAL_ATTENDANCE, INITIAL_PAYMENTS } from '@/lib/mockData';

/**
 * Labor Desk Database & Service Layer
 * Supports direct PostgreSQL / Supabase connection via DATABASE_URL or in-memory persistence.
 */

export interface DbClient {
  isPostgresConnected: boolean;
}

export const dbConfig = {
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/labordesk',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyz.supabase.co',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'ey...mockKey',
};

// Memory store fallback when PostgreSQL is not actively connected
export let memoryDb = {
  workers: [...INITIAL_WORKERS],
  companies: [...INITIAL_COMPANIES],
  requests: [...INITIAL_REQUESTS],
  attendance: [...INITIAL_ATTENDANCE],
  payments: [...INITIAL_PAYMENTS],
};
