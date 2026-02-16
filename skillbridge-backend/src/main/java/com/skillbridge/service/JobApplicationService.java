package com.skillbridge.service;

import com.skillbridge.dto.*;
import com.skillbridge.entity.*;
import com.skillbridge.exception.ResourceNotFoundException;
import com.skillbridge.exception.UnauthorizedException;
import com.skillbridge.repository.JobApplicationRepository;
import com.skillbridge.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
public class JobApplicationService {
    
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    
    public JobApplicationService(JobApplicationRepository jobApplicationRepository, UserRepository userRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
    }
    
    public JobApplicationResponse createApplication(JobApplicationRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        JobApplication application = JobApplication.builder()
                .companyName(request.getCompanyName())
                .jobRole(request.getJobRole())
                .status(ApplicationStatus.valueOf(request.getStatus()))
                .appliedDate(request.getAppliedDate())
                .user(user)
                .build();
        
        JobApplication saved = jobApplicationRepository.save(application);
        return mapToResponse(saved);
    }
    
    public Page<JobApplicationResponse> getApplications(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return jobApplicationRepository.findByUserOrderByAppliedDateDesc(user, pageable)
                .map(this::mapToResponse);
    }
    
    public JobApplicationResponse getApplicationById(Long applicationId, Long userId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        
        if (!application.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Not authorized to access this resource");
        }
        
        return mapToResponse(application);
    }
    
    public JobApplicationResponse updateApplication(Long applicationId, JobApplicationRequest request, Long userId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        
        if (!application.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Not authorized to update this resource");
        }
        
        application.setCompanyName(request.getCompanyName());
        application.setJobRole(request.getJobRole());
        application.setStatus(ApplicationStatus.valueOf(request.getStatus()));
        application.setAppliedDate(request.getAppliedDate());
        
        JobApplication updated = jobApplicationRepository.save(application);
        return mapToResponse(updated);
    }
    
    public void deleteApplication(Long applicationId, Long userId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        
        if (!application.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Not authorized to delete this resource");
        }
        
        jobApplicationRepository.delete(application);
    }
    
    private JobApplicationResponse mapToResponse(JobApplication application) {
        return JobApplicationResponse.builder()
                .id(application.getId())
                .companyName(application.getCompanyName())
                .jobRole(application.getJobRole())
                .status(application.getStatus().toString())
                .appliedDate(application.getAppliedDate())
                .createdAt(application.getCreatedAt())
                .updatedAt(application.getUpdatedAt())
                .userId(application.getUser().getId())
                .build();
    }
}
