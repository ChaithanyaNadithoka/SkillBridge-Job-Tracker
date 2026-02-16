package com.skillbridge.service;

import com.skillbridge.dto.*;
import com.skillbridge.entity.*;
import com.skillbridge.exception.ResourceNotFoundException;
import com.skillbridge.exception.UnauthorizedException;
import com.skillbridge.repository.InterviewRoundRepository;
import com.skillbridge.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class InterviewRoundService {
    
    private final InterviewRoundRepository interviewRoundRepository;
    private final JobApplicationRepository jobApplicationRepository;
    
    public InterviewRoundService(InterviewRoundRepository interviewRoundRepository, JobApplicationRepository jobApplicationRepository) {
        this.interviewRoundRepository = interviewRoundRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }
    
    public InterviewRoundResponse addInterviewRound(Long applicationId, InterviewRoundRequest request, Long userId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        
        if (!application.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Not authorized to add interview to this application");
        }
        
        if (request.getInterviewDate().isBefore(application.getAppliedDate())) {
            throw new IllegalArgumentException("Interview date cannot be before application date");
        }
        
        InterviewRound interviewRound = InterviewRound.builder()
                .roundType(RoundType.valueOf(request.getRoundType()))
                .interviewDate(request.getInterviewDate())
                .notes(request.getNotes())
                .result(InterviewResult.valueOf(request.getResult()))
                .jobApplication(application)
                .build();
        
        InterviewRound saved = interviewRoundRepository.save(interviewRound);
        return mapToResponse(saved);
    }
    
    public InterviewRoundResponse updateInterviewRound(Long interviewId, InterviewRoundRequest request, Long userId) {
        InterviewRound interviewRound = interviewRoundRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview round not found"));
        
        if (!interviewRound.getJobApplication().getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Not authorized to update this interview");
        }
        
        interviewRound.setRoundType(RoundType.valueOf(request.getRoundType()));
        interviewRound.setInterviewDate(request.getInterviewDate());
        interviewRound.setNotes(request.getNotes());
        interviewRound.setResult(InterviewResult.valueOf(request.getResult()));
        
        InterviewRound updated = interviewRoundRepository.save(interviewRound);
        return mapToResponse(updated);
    }
    
    public List<InterviewRoundResponse> getInterviewsByApplicationId(Long applicationId, Long userId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        
        if (!application.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Not authorized to access these interviews");
        }
        
        return interviewRoundRepository.findByJobApplicationId(applicationId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public void deleteInterviewRound(Long interviewId, Long userId) {
        InterviewRound interviewRound = interviewRoundRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview round not found"));
        
        if (!interviewRound.getJobApplication().getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Not authorized to delete this interview");
        }
        
        interviewRoundRepository.delete(interviewRound);
    }
    
    private InterviewRoundResponse mapToResponse(InterviewRound interviewRound) {
        return InterviewRoundResponse.builder()
                .id(interviewRound.getId())
                .roundType(interviewRound.getRoundType().toString())
                .interviewDate(interviewRound.getInterviewDate())
                .notes(interviewRound.getNotes())
                .result(interviewRound.getResult().toString())
                .jobApplicationId(interviewRound.getJobApplication().getId())
                .build();
    }
}
