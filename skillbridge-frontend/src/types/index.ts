export interface User {
    id: number;
    email: string;
    role: string;
}

export interface AuthResponse {
    userId: number;
    email: string;
    role: string;
}

export interface JobApplication {
    id: number;
    companyName: string;
    jobRole: string;
    status: 'APPLIED' | 'INTERVIEWING' | 'OFFERED' | 'REJECTED';
    appliedDate: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

export interface InterviewRound {
    id: number;
    roundType: 'HR' | 'TECHNICAL' | 'MANAGERIAL';
    interviewDate: string;
    notes: string;
    result: 'PASSED' | 'FAILED' | 'PENDING';
    jobApplicationId: number;
}

export interface DashboardStats {
    totalApplications: number;
    appliedCount: number;
    interviewingCount: number;
    offeredCount: number;
    rejectedCount: number;
}

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
