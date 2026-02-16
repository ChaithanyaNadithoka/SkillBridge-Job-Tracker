# Backend Implementation Notes

## Architecture Overview

The backend follows a layered architecture pattern:

```
Presentation Layer (Controllers)
    ↓
Business Logic Layer (Services)
    ↓
Data Access Layer (Repositories)
    ↓
Persistence Layer (Entities/Database)
```

## Key Components

### Entities
- **User**: Represents a user in the system with email, password, and role
- **JobApplication**: Represents a job application with company, role, status, and dates
- **InterviewRound**: Represents interview rounds for applications

### Services
- **AuthService**: Handles user registration and login
- **JwtTokenProvider**: Generates and validates JWT tokens
- **JobApplicationService**: CRUD operations for job applications
- **InterviewRoundService**: CRUD operations for interview rounds
- **DashboardService**: Aggregates statistics for dashboard

### Security
- **JwtAuthenticationFilter**: Validates JWT tokens in requests
- **SecurityConfig**: Configures Spring Security with JWT authentication
- **JwtAuthenticationEntryPoint**: Handles unauthorized access

### Exception Handling
- **GlobalExceptionHandler**: Handles all exceptions globally
- **ResourceNotFoundException**: Thrown when a resource is not found
- **UnauthorizedException**: Thrown when access is denied

## API Endpoints Summary

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token

### Applications
- `POST /applications` - Create application
- `GET /applications` - List applications with pagination
- `GET /applications/{id}` - Get specific application
- `PUT /applications/{id}` - Update application
- `DELETE /applications/{id}` - Delete application

### Interviews
- `POST /interviews/application/{appId}` - Add interview round
- `GET /interviews/application/{appId}` - Get interviews for application
- `PUT /interviews/{id}` - Update interview round
- `DELETE /interviews/{id}` - Delete interview round

### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics

## Authentication Flow

1. User registers with email and password
2. Password is encrypted using BCrypt
3. User logs in with email/password
4. System validates credentials and generates JWT token
5. Token is returned to client
6. Client includes token in Authorization header for subsequent requests
7. JwtAuthenticationFilter validates token and sets user context

## Database Schema

### Users Table
- id: Primary key
- email: Unique identifier
- password: BCrypt encrypted
- role: USER or ADMIN
- created_at: Timestamp

### Job Applications Table
- id: Primary key
- company_name: Company hiring
- job_role: Position applied for
- status: APPLIED, INTERVIEWING, OFFERED, REJECTED
- applied_date: Date of application
- created_at: Creation timestamp
- updated_at: Last update timestamp
- user_id: Foreign key to users

### Interview Rounds Table
- id: Primary key
- round_type: HR, TECHNICAL, MANAGERIAL
- interview_date: Date of interview
- notes: Interview notes
- result: PASSED, FAILED, PENDING
- job_application_id: Foreign key to job_applications

## Error Handling

All errors are returned in a consistent JSON format:

```json
{
  "timestamp": "2025-02-14T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/auth/register"
}
```

## Validation Rules

### Registration
- Email: Must be valid and unique
- Password: Min 8 chars, uppercase, lowercase, digit, special char
- Confirm Password: Must match password

### Job Application
- Company Name: Required, 2-150 chars
- Job Role: Required, 2-150 chars
- Status: Must be valid enum
- Applied Date: Cannot be in future

### Interview Round
- Round Type: Must be valid enum (HR, TECHNICAL, MANAGERIAL)
- Interview Date: Must be >= application date
- Result: Must be valid enum (PASSED, FAILED, PENDING)

## Development Guidelines

1. Always use DTOs for API communication
2. Never expose entities directly
3. Use service layer for all business logic
4. Implement proper exception handling
5. Add validation at both controller and service layers
6. Use Lombok annotations to reduce boilerplate
7. Follow REST naming conventions
8. Add comprehensive logging

## Testing

### Unit Tests
- AuthServiceTest: Tests authentication logic
- JobApplicationRepositoryTest: Tests data access layer

### Integration Tests
- Recommended: Test controller endpoints with MockMvc
- Test database operations with @DataJpaTest
- Test service logic with mock repositories

### Test Coverage Goals
- Aim for 80%+ code coverage
- Test happy path and error scenarios
- Test edge cases and validations

## Performance Considerations

1. Use pagination for list endpoints
2. Add database indexes on frequently queried columns
3. Use lazy loading for one-to-many relationships
4. Consider caching for dashboard statistics
5. Monitor API response times (target: < 2 seconds)

## Security Best Practices

1. Always validate and sanitize inputs
2. Use HTTPS in production
3. Keep JWT token expiration reasonable (24 hours)
4. Don't expose sensitive information in error messages
5. Use BCrypt for password hashing
6. Implement rate limiting for authentication endpoints
7. Log security-related events
