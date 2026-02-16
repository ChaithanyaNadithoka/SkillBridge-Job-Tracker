package com.skillbridge.controller;

import com.skillbridge.dto.JobApplicationRequest;
import com.skillbridge.dto.JobApplicationResponse;
import com.skillbridge.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('USER')")
public class JobApplicationController {
    
    private final JobApplicationService jobApplicationService;
    
    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }
    
    @PostMapping
    public ResponseEntity<JobApplicationResponse> createApplication(
            @Valid @RequestBody JobApplicationRequest request) {
        Long userId = getCurrentUserId();
        JobApplicationResponse response = jobApplicationService.createApplication(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping
    public ResponseEntity<Page<JobApplicationResponse>> getApplications(Pageable pageable) {
        Long userId = getCurrentUserId();
        Page<JobApplicationResponse> page = jobApplicationService.getApplications(userId, pageable);
        return ResponseEntity.ok(page);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> getApplicationById(@PathVariable Long id) {
        Long userId = getCurrentUserId();
        JobApplicationResponse response = jobApplicationService.getApplicationById(id, userId);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> updateApplication(
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationRequest request) {
        Long userId = getCurrentUserId();
        JobApplicationResponse response = jobApplicationService.updateApplication(id, request, userId);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        Long userId = getCurrentUserId();
        jobApplicationService.deleteApplication(id, userId);
        return ResponseEntity.noContent().build();
    }
    
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) authentication.getDetails();
    }
}
