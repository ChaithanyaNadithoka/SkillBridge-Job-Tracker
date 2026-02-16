-- Create Database
CREATE DATABASE IF NOT EXISTS skillbridge_db;
USE skillbridge_db;

-- Create users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create job_applications table
CREATE TABLE job_applications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(150) NOT NULL,
    job_role VARCHAR(150) NOT NULL,
    status ENUM('APPLIED', 'INTERVIEWING', 'OFFERED', 'REJECTED') NOT NULL DEFAULT 'APPLIED',
    applied_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create interview_rounds table
CREATE TABLE interview_rounds (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    round_type ENUM('HR', 'TECHNICAL', 'MANAGERIAL') NOT NULL,
    interview_date DATE NOT NULL,
    notes TEXT,
    result ENUM('PASSED', 'FAILED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    job_application_id BIGINT NOT NULL,
    FOREIGN KEY (job_application_id) REFERENCES job_applications(id) ON DELETE CASCADE
);

-- Create skillbridge_user for connection
CREATE USER IF NOT EXISTS 'skillbridge_user'@'localhost' IDENTIFIED BY 'SkillBridge@123';
GRANT ALL PRIVILEGES ON skillbridge_db.* TO 'skillbridge_user'@'localhost';
FLUSH PRIVILEGES;

-- Insert sample data
-- Note: Password is "Password123!" encrypted with BCrypt
-- BCrypt hash: $2a$10$8C5bKqMJZmKfNVxq7OwFUuUK5xKVJNQvmKVJNQvmKVJNQvmKVJNQvmK (example, use actual BCrypt)

-- Insert test user
INSERT INTO users (email, password, role) VALUES 
('testuser@example.com', '$2a$10$8bPJrMvLf.ER.uXgPAoN8.6yKpz4iNi5VJNQvmKVJNQvmKVJNQvmK', 'USER');

-- Get the user ID for the inserted user
SET @user_id = LAST_INSERT_ID();

-- Insert test job applications
INSERT INTO job_applications (company_name, job_role, status, applied_date, user_id) VALUES 
('Google', 'Senior Software Engineer', 'INTERVIEWING', '2025-01-15', @user_id),
('Microsoft', 'Full Stack Developer', 'APPLIED', '2025-02-10', @user_id),
('Amazon', 'Java Backend Engineer', 'OFFERED', '2025-01-20', @user_id);

-- Insert test interview rounds
INSERT INTO interview_rounds (round_type, interview_date, notes, result, job_application_id) VALUES 
('HR', '2025-02-01', 'Initial screening call', 'PASSED', 1),
('TECHNICAL', '2025-02-05', 'DSA and coding interview', 'PENDING', 1);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_interview_rounds_job_app_id ON interview_rounds(job_application_id);
