package com.skillbridge.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRoundRequest {
    
    @NotNull(message = "Round type cannot be null")
    private String roundType;
    
    @NotNull(message = "Interview date cannot be null")
    private LocalDate interviewDate;
    
    private String notes;
    
    @NotNull(message = "Result cannot be null")
    private String result;
}
