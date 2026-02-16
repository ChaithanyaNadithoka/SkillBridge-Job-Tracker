package com.skillbridge.service;

import com.skillbridge.dto.DashboardResponse;
import com.skillbridge.entity.ApplicationStatus;
import com.skillbridge.exception.ResourceNotFoundException;
import com.skillbridge.repository.JobApplicationRepository;
import com.skillbridge.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class DashboardService {
    
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    
    public DashboardService(JobApplicationRepository jobApplicationRepository, UserRepository userRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
    }
    
    public DashboardResponse getDashboardStats(Long userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        long total = jobApplicationRepository.countByUser(user);
        long applied = jobApplicationRepository.countByUserAndStatus(user, ApplicationStatus.APPLIED.toString());
        long interviewing = jobApplicationRepository.countByUserAndStatus(user, ApplicationStatus.INTERVIEWING.toString());
        long offered = jobApplicationRepository.countByUserAndStatus(user, ApplicationStatus.OFFERED.toString());
        long rejected = jobApplicationRepository.countByUserAndStatus(user, ApplicationStatus.REJECTED.toString());
        
        return DashboardResponse.builder()
                .totalApplications(total)
                .appliedCount(applied)
                .interviewingCount(interviewing)
                .offeredCount(offered)
                .rejectedCount(rejected)
                .build();
    }
}
