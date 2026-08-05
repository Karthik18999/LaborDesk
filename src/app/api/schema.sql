-- ============================================================
-- LABOR DESK - WORKFORCE MANAGEMENT PLATFORM
-- PRODUCTION POSTGRESQL DATABASE SCHEMA
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Admin & Company Logins ONLY; Workers do NOT have accounts)
CREATE TABLE users (
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
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    gst_number VARCHAR(20) UNIQUE NOT NULL,
    industry VARCHAR(100) NOT NULL,
    office_address TEXT NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending Approval' CHECK (status IN ('Active', 'Pending Approval', 'Rejected', 'Suspended')),
    subscription_plan VARCHAR(50) DEFAULT 'Basic' CHECK (subscription_plan IN ('Basic', 'Pro', 'Enterprise')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. WORKERS TABLE (Physically registered at Admin Office)
CREATE TABLE workers (
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
    languages TEXT[], -- Array of spoken languages
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

-- 4. WORKER SKILLS (Normalized Skills Table)
CREATE TABLE worker_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    skill_category VARCHAR(100) NOT NULL,
    sub_skill_name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(50) DEFAULT 'Intermediate',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. WORKER REQUESTS TABLE (Submitted by Company)
CREATE TABLE requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    skill_required VARCHAR(100) NOT NULL,
    sub_skill VARCHAR(100) NOT NULL,
    number_of_workers INT NOT NULL CHECK (number_of_workers > 0),
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

-- 6. ASSIGNMENTS TABLE (Admin matches Workers to Requests)
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    assigned_by_user_id UUID REFERENCES users(id),
    assignment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Assigned' CHECK (status IN ('Assigned', 'On Site', 'Completed', 'Cancelled'))
);

-- 7. ATTENDANCE TABLE (Daily Check In / Out)
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    status VARCHAR(50) DEFAULT 'Present' CHECK (status IN ('Present', 'Absent', 'Late', 'Half Day')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(worker_id, request_id, attendance_date)
);

-- 8. PAYMENTS & INVOICES TABLE
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    request_id UUID REFERENCES requests(id),
    amount DECIMAL(12, 2) NOT NULL,
    billing_period VARCHAR(100) NOT NULL,
    wage_type VARCHAR(20) DEFAULT 'Daily' CHECK (wage_type IN ('Daily', 'Weekly', 'Monthly')),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Paid', 'Pending', 'Overdue')),
    due_date DATE NOT NULL,
    paid_date TIMESTAMP WITH TIME ZONE,
    invoice_pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. REPORTS TABLE
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL CHECK (report_type IN ('Worker', 'Company', 'Attendance', 'Revenue', 'Assignment')),
    generated_by UUID REFERENCES users(id),
    parameters JSONB,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. NOTIFICATIONS TABLE
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    recipient_role VARCHAR(20) CHECK (recipient_role IN ('admin', 'company')),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    notification_type VARCHAR(50) DEFAULT 'info',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. AUDIT LOGS TABLE
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(255) NOT NULL,
    performed_by UUID REFERENCES users(id),
    role VARCHAR(50) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
CREATE INDEX idx_workers_skill ON workers(primary_skill, sub_skill);
CREATE INDEX idx_workers_district ON workers(district);
CREATE INDEX idx_workers_status ON workers(current_status, is_available);
CREATE INDEX idx_requests_company ON requests(company_id);
CREATE INDEX idx_requests_status ON requests(workflow_status);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
