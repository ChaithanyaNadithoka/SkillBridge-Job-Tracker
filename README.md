# SkillBridge - Job Application & Interview Tracker Platform

A full-stack web application for tracking job applications, interview rounds, and outcomes. Built with Spring Boot 3.x (Backend) and React + TypeScript (Frontend).

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Features

- **User Authentication**: Secure JWT-based authentication
- **Job Application Management**: CRUD operations for job applications
- **Interview Tracking**: Track interview rounds with notes and results
- **Dashboard Analytics**: View statistics about applications and outcomes
- **Role-Based Access Control**: USER and ADMIN roles
- **Pagination**: Support for paginated application listing
- **Form Validation**: Comprehensive client and server-side validation
- **Error Handling**: Global exception handling with structured error responses

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT (JJWT 0.12.3)
- Spring Data JPA
- MySQL Database
- Maven
- Lombok
- JUnit 5, Mockito, JaCoCo

### Frontend
- React 18
- TypeScript 5
- Material UI (MUI) 5
- Axios
- React Router 6
- Vite

## Project Structure

```
SkillBridge Workspace/
├── skillbridge-backend/
│   ├── pom.xml
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/skillbridge/
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── JobApplicationController.java
│   │   │   │   │   ├── InterviewRoundController.java
│   │   │   │   │   └── StatisticsController.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   ├── JobApplicationService.java
│   │   │   │   │   ├── InterviewRoundService.java
│   │   │   │   │   └── DashboardService.java
│   │   │   │   ├── repository/
│   │   │   │   ├── entity/
│   │   │   │   ├── dto/
│   │   │   │   ├── security/
│   │   │   │   ├── config/
│   │   │   │   ├── exception/
│   │   │   │   └── SkillbridgeApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/com/skillbridge/
│   │           └── AuthServiceTest.java
│   └── target/
├── skillbridge-frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── components/
│       │   ├── ProtectedRoute.tsx
│       │   └── Layout.tsx
│       ├── pages/
│       │   ├── RegisterPage.tsx
│       │   ├── LoginPage.tsx
│       │   ├── DashboardPage.tsx
│       │   ├── ApplicationsListPage.tsx
│       │   └── ApplicationFormPage.tsx
│       ├── services/
│       │   ├── authService.ts
│       │   ├── applicationService.ts
│       │   └── dashboardService.ts
│       ├── config/
│       │   └── constants.ts
│       ├── types/
│       │   └── index.ts
│       └── utils/
│           └── axiosConfig.ts
├── schema.sql
├── postman_collection.json
└── README.md
```

## Prerequisites

### For Backend
- Java 17 JDK
- Maven 3.8+
- MySQL 8.0+

### For Frontend
- Node.js 18+
- npm or yarn

## Database Setup

### 1. Start MySQL Service
```bash
# Windows
net start MySQL80

# macOS (using Homebrew)
brew services start mysql

# Linux
sudo systemctl start mysql
```

### 2. Create Database and User
Execute the `schema.sql` file:

```bash
mysql -u root -p < schema.sql
```

Or manually:
```sql
mysql -u root -p
```

Then run the SQL commands from `schema.sql` file.

### 3. Verify Database
```bash
mysql -u skillbridge_user -p
# Password: SkillBridge@123

USE skillbridge_db;
SHOW TABLES;
```

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd skillbridge-backend
```

### 2. Update Database Configuration (Optional)
If your MySQL credentials differ, update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillbridge_db
spring.datasource.username=skillbridge_user
spring.datasource.password=SkillBridge@123
spring.jpa.hibernate.ddl-auto=update
```

### 3. Build Backend
```bash
mvn clean install
```

### 4. Run Backend Server
```bash
mvn spring-boot:run
```

Or:
```bash
java -jar target/skillbridge-backend-1.0.0.jar
```

The backend will start on: **http://localhost:8080/api**

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd skillbridge-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The frontend will start on: **http://localhost:3000**

### 4. Build for Production
```bash
npm run build
```

## API Endpoints

Base URL: `http://localhost:8080/api`

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "confirmPassword": "Password123!"
}
```

**Response (201 Created):**
```json
"User registered successfully"
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "user@example.com",
  "role": "USER"
}
```

### Job Applications

#### Create Application
```http
POST /applications
Authorization: Bearer {token}
Content-Type: application/json

{
  "companyName": "Google",
  "jobRole": "Senior Engineer",
  "status": "APPLIED",
  "appliedDate": "2025-02-14"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "companyName": "Google",
  "jobRole": "Senior Engineer",
  "status": "APPLIED",
  "appliedDate": "2025-02-14",
  "createdAt": "2025-02-14T10:30:00",
  "updatedAt": "2025-02-14T10:30:00",
  "userId": 1
}
```

#### Get All Applications (Paginated)
```http
GET /applications?page=0&size=10
Authorization: Bearer {token}
```

#### Get Application by ID
```http
GET /applications/{id}
Authorization: Bearer {token}
```

#### Update Application
```http
PUT /applications/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "companyName": "Google",
  "jobRole": "Senior Engineer",
  "status": "INTERVIEWING",
  "appliedDate": "2025-02-14"
}
```

#### Delete Application
```http
DELETE /applications/{id}
Authorization: Bearer {token}
```

**Response (204 No Content)**

### Interview Rounds

#### Add Interview Round
```http
POST /interviews/application/{applicationId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "roundType": "TECHNICAL",
  "interviewDate": "2025-02-20",
  "notes": "System design interview",
  "result": "PENDING"
}
```

#### Get Interviews by Application
```http
GET /interviews/application/{applicationId}
Authorization: Bearer {token}
```

#### Update Interview Round
```http
PUT /interviews/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "roundType": "TECHNICAL",
  "interviewDate": "2025-02-20",
  "notes": "System design interview - good",
  "result": "PASSED"
}
```

### Dashboard

#### Get Dashboard Statistics
```http
GET /dashboard/stats
Authorization: Bearer {token}
```

**Response:**
```json
{
  "totalApplications": 5,
  "appliedCount": 2,
  "interviewingCount": 1,
  "offeredCount": 1,
  "rejectedCount": 1
}
```

## Running the Application

### Development Mode

1. **Start MySQL Database**
```bash
mysql -u root -p
mysql> source schema.sql;
```

2. **Terminal 1 - Start Backend**
```bash
cd skillbridge-backend
mvn spring-boot:run
```

3. **Terminal 2 - Start Frontend**
```bash
cd skillbridge-frontend
npm run dev
```

4. **Access Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api`

### Production Mode

1. **Build Backend**
```bash
cd skillbridge-backend
mvn clean package
```

2. **Build Frontend**
```bash
cd skillbridge-frontend
npm run build
```

3. **Run Backend JAR**
```bash
java -jar skillbridge-backend/target/skillbridge-backend-1.0.0.jar
```

4. **Serve Frontend** (using a web server like Nginx or Apache)
```bash
# Copy dist folder to web server
cp -r skillbridge-frontend/dist/* /var/www/skillbridge/
```

## Testing

### Backend Unit Tests
```bash
cd skillbridge-backend
mvn test
```

### Generate Coverage Report
```bash
mvn jacoco:report
# Report: target/site/jacoco/index.html
```

## Validation Rules

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character (@$!%*?&)

### Email Format
- Valid email format (RFC 5322)
- Unique in the database

### Application Status
- APPLIED
- INTERVIEWING
- OFFERED
- REJECTED

### Interview Round Types
- HR
- TECHNICAL
- MANAGERIAL

### Interview Results
- PASSED
- FAILED
- PENDING

## Postman Collection

A Postman collection is provided (`postman_collection.json`) with all API endpoints and sample requests.

### Import Collection
1. Open Postman
2. Click "Import" → "Upload Files"
3. Select `postman_collection.json`
4. Use the "Login" request to obtain a token
5. Token will be automatically saved to `{{token}}` variable

## Error Responses

All errors follow this format:

```json
{
  "timestamp": "2025-02-14T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email is already registered",
  "path": "/api/auth/register"
}
```

### Common Error Codes
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found (resource does not exist)
- **409**: Conflict (duplicate email)
- **500**: Internal Server Error

## Security Features

- **JWT Authentication**: Stateless token-based auth
- **BCrypt Password Encoding**: Secure password hashing
- **CORS Configuration**: Enabled for frontend integration
- **Role-Based Access Control**: USER and ADMIN roles
- **Token Expiration**: 24 hours default
- **Protected Routes**: Frontend route protection

## Development Notes

### Key Technologies Used

1. **Spring Boot 3.x**: Modern Java framework
2. **Spring Security 6**: Authentication & authorization
3. **JJWT 0.12.3**: JWT token handling
4. **Material UI**: Professional UI components
5. **Vite**: Fast build tool for frontend
6. **React Router 6**: Client-side routing

### Layered Architecture

```
Controller Layer (HTTP Requests)
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Data Access)
    ↓
Database (MySQL)
```

### DTO Pattern
- DTOs are used for API requests/responses
- Entities are never exposed directly
- Data transformation happens in the Service layer

## Future Enhancements

- Email notifications on status changes
- Interview reminders
- Admin analytics dashboard
- Docker containerization
- AWS/Cloud deployment
- Resume auto-tracking
- Calendar integration
- Multiple job applications comparison
- Interview preparation resources

## Troubleshooting

### Backend Issues

**Port 8080 already in use**
```bash
# Change port in application.properties
server.port=8081
```

**Database connection failed**
```bash
# Check MySQL is running
mysql -u root -p
# Verify credentials in application.properties
```

**CORS error in frontend**
```
# Backend already has CORS enabled in SecurityConfig
# Verify frontend URL in @CrossOrigin annotation
```

### Frontend Issues

**Port 3000 already in use**
```bash
# Change port in vite.config.ts
server: {
  port: 3001
}
```

**Blank page on load**
```
# Check browser console for errors
# Verify backend is running on http://localhost:8080
# Clear localStorage and refresh
```

**CORS error**
```
# Ensure backend is running
# Check Authorization header in requests
# Verify token format: "Bearer <token>"
```

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the SRS document (SkillBridge_SRS_V2.txt)
3. Check backend logs for errors
4. Verify database connection

## License

SkillBridge © 2025. All rights reserved.

---

**Last Updated**: February 14, 2025
**Version**: 1.0.0
