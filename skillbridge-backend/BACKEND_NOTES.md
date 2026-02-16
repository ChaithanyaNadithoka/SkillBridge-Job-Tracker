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

## Security Best Practices

1. Always validate and sanitize inputs
2. Use HTTPS in production
3. Don't expose sensitive information in error messages
4. Use BCrypt for password hashing (strength: 12)
5. Implement rate limiting for authentication endpoints
6. Log security-related events
7. Use HTTP Basic Auth with HTTPS for production

---

## Setup & Startup Guide

### Prerequisites
- **Java 17+** installed
- **Maven 3.6+** installed
- **MariaDB 10.3+** (or **MySQL 8.0+**) running locally
- Admin access to MySQL/MariaDB command line

### Step 1: Database Connection Setup

#### Option A: MariaDB (Recommended)
```bash
# Connect to MariaDB
mariadb -u root -p
```

#### Option B: MySQL
```bash
# Connect to MySQL
mysql -u root -p
```

### Step 2: Run Database Table Scripts

**Execute the SQL script located at `../schema.sql`** to create database, tables, and sample data:

```sql
-- Run in your MySQL/MariaDB client
source ../schema.sql;
```

**Or execute line-by-line from the `schema.sql` file:**

The script will:
✅ Create database: `skillbridge_db`
✅ Create tables: `users`, `job_applications`, `interview_rounds`
✅ Create database user: `skillbridge_user` (password: `SkillBridge@123`)
✅ Grant privileges to `skillbridge_user`
✅ Insert sample test data (test user, 3 job applications, 2 interview records)
✅ Create indexes for performance

**Verify tables were created:**
```sql
USE skillbridge_db;
SHOW TABLES;
DESCRIBE users;
DESCRIBE job_applications;
DESCRIBE interview_rounds;
```

**Expected output:**
```
+----------------------+
| Tables_in_skillbridge_db |
+----------------------+
| interview_rounds     |
| job_applications     |
| users                |
+----------------------+
```

### Step 3: Verify Database Configuration

**Check `application.properties`** (located at `src/main/resources/application.properties`):

```properties
# DataSource Configuration
spring.datasource.url=jdbc:mariadb://localhost:3306/skillbridge_db
spring.datasource.username=skillbridge_user
spring.datasource.password=SkillBridge@123
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver

# OR for MySQL:
# spring.datasource.url=jdbc:mysql://localhost:3306/skillbridge_db
# spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

**If using MySQL instead of MariaDB**, uncomment MySQL lines and update pom.xml dependencies:
```xml
<!-- For MySQL (alternative) -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

### Step 4: Start the Backend

#### From Terminal (Recommended - Uses prebuilt JAR)

**Build the project first (if not already built):**
```bash
cd skillbridge-backend
mvn clean package -DskipTests
```

**Then start the backend:**
```bash
# Windows PowerShell
java -jar target/skillbridge-backend-1.0.0.jar

# Or on Linux/Mac
java -jar target/skillbridge-backend-1.0.0.jar
```

#### From IDE (VS Code / IntelliJ)

**Ensure `pom.xml` is installed and indexed:**
- Right-click `pom.xml` → Maven → Reload
- Wait for dependencies to download

**Run Spring Boot application:**
- Press `Ctrl+F5` or use Run menu → Run Without Debugging
- Or set up a task in `tasks.json`

**Manual command (if IDE run fails):**
```bash
mvn spring-boot:run
```

### Step 5: Verify Backend is Running

**Check application startup logs:**
```
02:30:15.234 INFO  20220 --- [  main] c.skillbridge.SkillBridgeBackendApplication : SkillBridge Backend Application started
02:30:20.123 INFO  20220 --- [  main] c.s.config.SecurityConfig : HTTP Basic Authentication enabled
02:30:22.456 INFO  20220 --- [  main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8080 (http)
```

**Test the backend is responsive:**
```bash
# Open browser or use curl
curl -X GET http://localhost:8080/api/health

# Or from PowerShell
Invoke-WebRequest -Uri http://localhost:8080/api/health
```

**Expected response (if health endpoint exists):**
```json
{
  "status": "UP",
  "database": "connected"
}
```

### Step 6: Test Authentication

**Register a new user:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }'
```

**Login with test user (from schema.sql):**
```bash
# Email: testuser@example.com
# Password: Password123!
# Basic Auth: base64(testuser@example.com:Password123!)

curl -X POST http://localhost:8080/api/auth/login \
  -H "Authorization: Basic dGVzdHVzZXJAZXhhbXBsZS5jb206UGFzc3dvcmQxMjMh"
```

**Or use Postman:**
- See `Postman_Testing_Guide.md` for complete Postman setup with environment variables and Basic Auth

### Common Startup Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **Port 8080 already in use** | Another process running on 8080 | Kill Java process: `taskkill /IM java.exe /F` (Windows) or `lsof -i :8080` (Linux) |
| **Database connection refused** | MySQL/MariaDB not running | Start database: `sudo systemctl start mariadb` or use MySQL Workbench |
| **"Unknown database 'skillbridge_db'"** | SQL scripts not run | Execute `schema.sql` in MySQL/MariaDB client |
| **"Access denied for user"** | Wrong credentials in `application.properties` | Verify username/password match schema.sql user creation |
| **"TableNotFound" errors** | Hibernate trying to access non-existent table | Run schema.sql or check `spring.jpa.hibernate.ddl-auto=update` in application.properties |
| **Build fails with "missing dependencies"** | Maven cache corrupted | Run `mvn clean install` or delete `.m2/repository` and rebuild |
| **"No suitable driver found"** | JDBC driver not in classpath | Rebuild: `mvn clean package` and ensure mariadb-java-client in pom.xml |

### Useful Commands

```bash
# Clean build (removes target directory)
mvn clean package -DskipTests

# Build with tests
mvn clean package

# Run tests only
mvn test

# Install dependencies only
mvn install

# Skip tests and build JAR
mvn package -DskipTests

# Check dependency tree
mvn dependency:tree

# Start with debug mode
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005"
```

### Environment & Versions

- **Java**: 17
- **Spring Boot**: 3.2.0
- **Maven**: 3.6+
- **Database**: MariaDB 10.3+ or MySQL 8.0+
- **Authentication**: HTTP Basic Auth
- **Port**: 8080 (default)
- **JPA/Hibernate**: Auto table creation enabled (`ddl-auto=update`)
