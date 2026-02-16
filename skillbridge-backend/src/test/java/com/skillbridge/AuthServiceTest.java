package com.skillbridge;

import com.skillbridge.dto.RegisterRequest;
import com.skillbridge.dto.LoginRequest;
import com.skillbridge.entity.Role;
import com.skillbridge.entity.User;
import com.skillbridge.repository.UserRepository;
import com.skillbridge.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    private AuthService authService;
    
    @BeforeEach
    public void setUp() {
        authService = new AuthService(userRepository, passwordEncoder);
    }
    
    @Test
    public void testRegisterSuccess() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setPassword("Password123!");
        request.setConfirmPassword("Password123!");
        
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(new User());
        
        // Call the actual method being tested
        authService.register(request);
    }
    
    @Test
    public void testRegisterWithExistingEmail() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setPassword("Password123!");
        request.setConfirmPassword("Password123!");
        
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);
        
        assertThrows(RuntimeException.class, () -> authService.register(request));
    }
}
