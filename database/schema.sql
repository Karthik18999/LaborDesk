-- ============================================================
-- LABOR DESK - WORKFORCE MANAGEMENT PLATFORM
-- PRODUCTION POSTGRESQL DATABASE SCHEMA
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Admin & Company Logins ONLY; Workers do NOT have online accounts)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'company')),
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_code VARCHAR(50) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    gst_number VARCHAR(20) UNIQUE NOT NULL,
    industry VARCHAR(100) NOT NULL,
    office_address TEXT NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending Approval' CHECK (status IN ('Active', 'Pending Approval', 'Rejected', 'Suspended')),
    subscription_plan VARCHAR(50) DEFAULT 'Basic' CHECK (subscription_plan IN ('Basic', 'Pro', 'Enterprise')),
    hiring_history_count INT DEFAULT 0,
    total_spent DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. WORKERS TABLE (Physically Registered at Admin Office)
CREATE TABLE IF NOT EXISTS workers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_code VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    photo_url TEXT,
    phone_number VARCHAR(20) NOT NULL,
    aadhaar_number VARCHAR(20) UNIQUE NOT NULL,
    village VARCHAR(100),
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    primary_skill VARCHAR(100) NOT NULL,
    sub_skill VARCHAR(100) NOT NULL,
    experience_years INT DEFAULT 0,
    languages TEXT[],
    daily_wage DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    emergency_contact_name VARCHAR(255),
    emergency_contact_relation VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    notes TEXT,
    rating DECIMAL(3, 2) DEFAULT 5.0,
    completed_jobs INT DEFAULT 0,
    current_status VARCHAR(50) DEFAULT 'Available' CHECK (current_status IN ('Available', 'Assigned', 'Inactive')),
    verification_status VARCHAR(50) DEFAULT 'Pending' CHECK (verification_status IN ('Verified', 'Pending', 'Rejected')),
    photo_uploaded BOOLEAN DEFAULT FALSE,
    aadhaar_uploaded BOOLEAN DEFAULT FALSE,
    certificates_uploaded BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. WORKER REQUESTS TABLE (Submitted by Corporate Companies)
CREATE TABLE IF NOT EXISTS requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_code VARCHAR(50) UNIQUE NOT NULL,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    skill_required VARCHAR(100) NOT NULL,
    sub_skill VARCHAR(100) NOT NULL,
    number_of_workers INT NOT NULL CHECK (number_of_workers > 0),
    assigned_worker_ids UUID[],
    location TEXT NOT NULL,
    reporting_date DATE NOT NULL,
    reporting_time VARCHAR(20) NOT NULL,
    duration_days INT NOT NULL,
    daily_wage_offered DECIMAL(10, 2) NOT NULL,
    food_provided BOOLEAN DEFAULT FALSE,
    accommodation_provided BOOLEAN DEFAULT FALSE,
    transportation_provided BOOLEAN DEFAULT FALSE,
    gender_preference VARCHAR(20) DEFAULT 'Any',
    experience_required_years INT DEFAULT 0,
    remarks TEXT,
    priority VARCHAR(20) DEFAULT 'Normal' CHECK (priority IN ('Normal', 'High', 'Urgent')),
    workflow_status VARCHAR(50) DEFAULT 'Pending' CHECK (workflow_status IN (
        'Pending', 'Reviewing', 'Searching Workers', 'Workers Contacted',
        'Workers Confirmed', 'Workers Assigned', 'Workers Reached Site', 'Completed', 'Cancelled'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. ATTENDANCE TABLE (Logged by Admin / Site Supervisors)
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    worker_name VARCHAR(255) NOT NULL,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Present' CHECK (status IN ('Present', 'Absent', 'Late', 'Half Day')),
    check_in_time VARCHAR(20),
    check_out_time VARCHAR(20),
    verified_by_admin VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. PAYMENTS & INVOICES TABLE
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
    billing_period VARCHAR(100) NOT NULL,
    worker_count INT NOT NULL,
    total_days INT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    platform_fee DECIMAL(12, 2) NOT NULL,
    net_payable DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Paid', 'Pending', 'Overdue')),
    due_date DATE NOT NULL,
    paid_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR HIGH-PERFORMANCE QUERYING
CREATE INDEX IF NOT EXISTS idx_workers_skill ON workers(primary_skill, sub_skill);
CREATE INDEX IF NOT EXISTS idx_workers_status ON workers(current_status, verification_status);
CREATE INDEX IF NOT EXISTS idx_requests_company ON requests(company_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(workflow_status);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date, company_id);
