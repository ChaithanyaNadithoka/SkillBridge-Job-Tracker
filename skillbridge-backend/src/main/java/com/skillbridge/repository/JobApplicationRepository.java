package com.skillbridge.repository;

import com.skillbridge.entity.JobApplication;
import com.skillbridge.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    Page<JobApplication> findByUserOrderByAppliedDateDesc(User user, Pageable pageable);
    long countByUser(User user);
    long countByUserAndStatus(User user, com.skillbridge.entity.ApplicationStatus status);
}
