package com.skillbridge.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewRoundResponse {
    private Long id;
    private String roundType;
    private LocalDate interviewDate;
    private String notes;
    private String result;
    private Long jobApplicationId;
}
