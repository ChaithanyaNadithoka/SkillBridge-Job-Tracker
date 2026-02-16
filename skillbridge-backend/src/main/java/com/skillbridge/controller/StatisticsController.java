package com.skillbridge.controller;

import com.skillbridge.dto.DashboardResponse;
import com.skillbridge.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('USER')")
public class StatisticsController {
    
    private final DashboardService dashboardService;
    
    public StatisticsController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }
    
    @GetMapping("/stats")
    public ResponseEntity<DashboardResponse> getDashboardStats() {
        Long userId = getCurrentUserId();
        DashboardResponse response = dashboardService.getDashboardStats(userId);
        return ResponseEntity.ok(response);
    }
    
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) authentication.getDetails();
    }
}
