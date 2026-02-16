package com.skillbridge.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationRequest {
    
    @NotNull(message = "Company name cannot be null")
    @NotBlank(message = "Company name cannot be blank")
    @Size(min = 2, max = 150, message = "Company name must be between 2 and 150 characters")
    private String companyName;
    
    @NotNull(message = "Job role cannot be null")
    @NotBlank(message = "Job role cannot be blank")
    @Size(min = 2, max = 150, message = "Job role must be between 2 and 150 characters")
    private String jobRole;
    
    @NotNull(message = "Status cannot be null")
    private String status;
    
    @NotNull(message = "Applied date cannot be null")
    @PastOrPresent(message = "Applied date cannot be in the future")
    private LocalDate appliedDate;
}
