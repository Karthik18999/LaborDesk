-- ============================================================
-- LABOR DESK - INITIAL DATABASE SEED DATA
-- ============================================================

-- Seed Verified Workers
INSERT INTO workers (worker_code, full_name, photo_url, phone_number, aadhaar_number, village, district, state, primary_skill, sub_skill, experience_years, languages, daily_wage, is_available, emergency_contact_name, emergency_contact_relation, emergency_contact_phone, notes, rating, completed_jobs, current_status, verification_status, photo_uploaded, aadhaar_uploaded, certificates_uploaded)
VALUES
('WKR-1001', 'Ramesh Kumar', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400', '+91 98765 43210', '4321-8765-1092', 'Devanahalli', 'Bengaluru Rural', 'Karnataka', 'Construction & Civil Works', 'Masons (Brick & Block Work)', 6, ARRAY['Kannada', 'Hindi'], 850, TRUE, 'Lakshmi Kumar', 'Wife', '+91 98765 43211', 'Expert in RCC structural brickwork and plastering.', 4.9, 14, 'Available', 'Verified', TRUE, TRUE, TRUE),
('WKR-1002', 'Suresh Gowda', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '+91 98765 43212', '8765-4321-2109', 'Hosakote', 'Bengaluru Rural', 'Karnataka', 'Construction & Civil Works', 'Bar Benders & Rebar Fitters', 4, ARRAY['Kannada', 'Telugu'], 750, TRUE, 'Manjula Gowda', 'Mother', '+91 98765 43213', 'Certified steel rebar tying specialist.', 4.7, 9, 'Available', 'Verified', TRUE, TRUE, FALSE),
('WKR-1003', 'Vikram Singh', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', '+91 98765 43214', '9012-3456-7890', 'Patna Central', 'Patna', 'Bihar', 'Heavy Manufacturing & Mills', 'Structural Welders (SMAW/MIG)', 8, ARRAY['Hindi', 'English'], 950, FALSE, 'Sunita Singh', 'Wife', '+91 98765 43215', 'Certified MIG/TIG 6G welder with boiler shop experience.', 4.95, 22, 'Assigned', 'Verified', TRUE, TRUE, TRUE);

-- Seed Corporate Companies
INSERT INTO companies (company_code, company_name, gst_number, industry, office_address, contact_person, phone, email, status, subscription_plan, hiring_history_count, total_spent)
VALUES
('CMP-2001', 'L&T Infrastructure Construtec Ltd', '29AAACL1234H1Z5', 'Construction & Civil Works', '7th Floor, Prestige Trade Tower, Palace Road, Bengaluru - 560001', 'Vikrant Deshmukh', '+91 80 4567 8900', 'hr@ltconst.com', 'Active', 'Enterprise', 18, 485000.00),
('CMP-2002', 'Shapoorji Pallonji EPC Solutions', '27AAAAA5678B1Z2', 'Infrastructure & EPC', 'Cyber Park, Sector 62, Noida - 201309', 'Ananya Sharma', '+91 120 4567 890', 'hiring@shapoorji.com', 'Active', 'Pro', 12, 320000.00);
