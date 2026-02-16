package com.skillbridge.controller;

import com.skillbridge.dto.InterviewRoundRequest;
import com.skillbridge.dto.InterviewRoundResponse;
import com.skillbridge.service.InterviewRoundService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interviews")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('USER')")
public class InterviewRoundController {
    
    private final InterviewRoundService interviewRoundService;
    
    public InterviewRoundController(InterviewRoundService interviewRoundService) {
        this.interviewRoundService = interviewRoundService;
    }
    
    @PostMapping("/application/{applicationId}")
    public ResponseEntity<InterviewRoundResponse> addInterviewRound(
            @PathVariable Long applicationId,
            @Valid @RequestBody InterviewRoundRequest request) {
        Long userId = getCurrentUserId();
        InterviewRoundResponse response = interviewRoundService.addInterviewRound(applicationId, request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<InterviewRoundResponse> updateInterviewRound(
            @PathVariable Long id,
            @Valid @RequestBody InterviewRoundRequest request) {
        Long userId = getCurrentUserId();
        InterviewRoundResponse response = interviewRoundService.updateInterviewRound(id, request, userId);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<InterviewRoundResponse>> getInterviewsByApplicationId(
            @PathVariable Long applicationId) {
        Long userId = getCurrentUserId();
        List<InterviewRoundResponse> response = interviewRoundService.getInterviewsByApplicationId(applicationId, userId);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterviewRound(@PathVariable Long id) {
        Long userId = getCurrentUserId();
        interviewRoundService.deleteInterviewRound(id, userId);
        return ResponseEntity.noContent().build();
    }
    
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) authentication.getDetails();
    }
}
