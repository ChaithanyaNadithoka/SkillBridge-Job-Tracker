package com.skillbridge.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {
    private Long totalApplications;
    private Long appliedCount;
    private Long interviewingCount;
    private Long offeredCount;
    private Long rejectedCount;
}
