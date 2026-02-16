package com.skillbridge;

import com.skillbridge.entity.JobApplication;
import com.skillbridge.entity.User;
import com.skillbridge.repository.JobApplicationRepository;
import com.skillbridge.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class JobApplicationRepositoryTest {
    
    @Autowired
    private JobApplicationRepository jobApplicationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    private User testUser;
    
    @BeforeEach
    public void setUp() {
        testUser = User.builder()
                .email("test@example.com")
                .password("encodedPassword")
                .role(com.skillbridge.entity.Role.USER)
                .build();
        userRepository.save(testUser);
    }
    
    @Test
    public void testFindByUserOrderByAppliedDateDesc() {
        var pageable = PageRequest.of(0, 10);
        Page<JobApplication> result = jobApplicationRepository.findByUserOrderByAppliedDateDesc(testUser, pageable);
        
        assertNotNull(result);
        assertEquals(0, result.getTotalElements());
    }
    
    @Test
    public void testCountByUser() {
        long count = jobApplicationRepository.countByUser(testUser);
        assertEquals(0, count);
    }
}
