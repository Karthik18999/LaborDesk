import { INITIAL_WORKERS, INITIAL_COMPANIES, INITIAL_REQUESTS, INITIAL_ATTENDANCE, INITIAL_PAYMENTS } from '@/lib/mockData';

/**
 * Labor Desk Database Connector & Store Module
 * Handles PostgreSQL / Supabase connection strings & fallback in-memory state.
 */

export interface DbConnectionInfo {
  isPostgresConnected: boolean;
  connectionString: string;
  provider: 'PostgreSQL' | 'Supabase' | 'Memory';
}

export const dbConfig = {
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/labordesk',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://labordesk.supabase.co',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'ey...anonKey',
};

// Memory Persistence fallback when live PostgreSQL database is not connected
export let memoryDb = {
  workers: [...INITIAL_WORKERS],
  companies: [...INITIAL_COMPANIES],
  requests: [...INITIAL_REQUESTS],
  attendance: [...INITIAL_ATTENDANCE],
  payments: [...INITIAL_PAYMENTS],
};
