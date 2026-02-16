# SkillBridge - Getting Started Guide

Welcome to SkillBridge! This guide will get you up and running in 10 minutes.

## Prerequisites

Before you start, ensure you have:
- **Java 17** JDK installed
- **Maven 3.8+** installed
- **MySQL 8.0+** running
- **Node.js 18+** installed
- **npm** (comes with Node.js)

### Verify Installation

**Windows:**
```cmd
verify-setup.bat
```

**macOS/Linux:**
```bash
./verify-setup.sh
```

---

## Step 1: Database Setup (2 minutes)

### 1. Start MySQL Service

**Windows:**
```cmd
net start MySQL80
```

**macOS (Homebrew):**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

### 2. Create Database and User

Copy this command:
```bash
mysql -u root -p < schema.sql
```

Then run it and enter your MySQL root password.

### 3. Verify Database

```bash
mysql -u skillbridge_user -p
# Password: SkillBridge@123

USE skillbridge_db;
SHOW TABLES;
EXIT;
```

You should see 3 tables: `users`, `job_applications`, `interview_rounds`

---

## Step 2: Build and Run Backend (3 minutes)

### 1. Navigate to Backend

```bash
cd skillbridge-backend
```

### 2. Build Application

```bash
mvn clean install
```

This may take a few minutes to download dependencies.

### 3. Run Application

```bash
mvn spring-boot:run
```

You should see:
```
Tomcat started on port(s): 8080
```

**Backend is now running at:** `http://localhost:8080/api`

---

## Step 3: Build and Run Frontend (3 minutes)

### 1. Open New Terminal and Navigate to Frontend

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

You should see:
```
VITE v5.x ready in XXX ms
➜  Local:   http://localhost:3000/
```

**Frontend is now running at:** `http://localhost:3000`

---

## Step 4: Access the Application

1. Open your browser
2. Go to: `http://localhost:3000`
3. You're redirected to login page
4. Login with test credentials:
   - **Email:** `testuser@example.com`
   - **Password:** `Password123!`

---

## Create Your First Application

1. After login, click "Applications" in navigation
2. Click "Add Application" button
3. Fill in the form:
   - **Company:** Google
   - **Job Role:** Senior Engineer
   - **Status:** APPLIED
   - **Applied Date:** 2025-02-14
4. Click "Save"

View it in the Dashboard!

---

## Testing with Postman

### 1. Import Collection

1. Open Postman
2. Click "Import"
3. Upload `postman_collection.json` from the root directory
4. Collection is ready with all endpoints

### 2. Login Request

1. Find "Login" request in Authentication folder
2. Update email/password if needed
3. Send request
4. Token automatically saved to `{{token}}` variable

### 3. Test All Endpoints

All other requests will automatically use the saved token!

---

## Common Issues & Solutions

### Backend Won't Start

**Error: Port 8080 already in use**
```
Change port in: skillbridge-backend/src/main/resources/application.properties
server.port=8081
```

**Error: Cannot connect to database**
```
Check MySQL is running:
mysql -u root -p -e "SELECT 1;"

Verify credentials in application.properties match your MySQL setup.
```

### Frontend Won't Load

**Error: Cannot find module**
```bash
cd skillbridge-frontend
rm -rf node_modules
npm install
```

**Error: Blank page, console error**
- Open browser console (F12)
- Check error messages
- Ensure backend is running on http://localhost:8080

### Login Fails

**Error: Invalid credentials**
- Make sure you're using test user email and password
- Database schema was imported successfully

---

## Project Structure

```
SkillBridge/
├── skillbridge-backend/     ← Spring Boot backend
├── skillbridge-frontend/    ← React TypeScript frontend
├── schema.sql              ← Database setup
├── README.md               ← Full documentation
├── PROJECT_SUMMARY.md      ← What's included
├── DEPLOYMENT_GUIDE.md     ← Production deployment
└── postman_collection.json ← API testing
```

---

## Key Features to Try

### 1. Dashboard
- View application statistics
- See breakdown by status
- Track offers and rejections

### 2. Applications Management
- Create job applications
- Edit application details
- Delete applications
- Paginated list view

### 3. Interview Tracking
- Add interview rounds to applications
- Track interview type (HR, Technical, Managerial)
- Record results (Passed, Failed, Pending)
- Add interview notes

### 4. Authentication
- Register new accounts
- Secure JWT login
- Auto logout on token expiration
- Protected routes

---

## Development Commands

### Backend

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Run tests
mvn test

# Generate test coverage
mvn jacoco:report
```

### Frontend

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## API Quick Reference

### Authentication
```bash
# Register
POST /auth/register
Body: { email, password, confirmPassword }

# Login
POST /auth/login
Body: { email, password }
Response: { token, userId, email, role }
```

### Applications
```bash
# Create
POST /applications
Headers: Authorization: Bearer {token}

# List
GET /applications?page=0&size=10
Headers: Authorization: Bearer {token}

# Get
GET /applications/{id}
Headers: Authorization: Bearer {token}

# Update
PUT /applications/{id}
Headers: Authorization: Bearer {token}

# Delete
DELETE /applications/{id}
Headers: Authorization: Bearer {token}
```

### Dashboard
```bash
# Get Stats
GET /dashboard/stats
Headers: Authorization: Bearer {token}
Response: { totalApplications, appliedCount, ... }
```

---

## Next Steps

### Learn the Codebase
1. Read [BACKEND_NOTES.md](skillbridge-backend/BACKEND_NOTES.md)
2. Read [FRONTEND_NOTES.md](skillbridge-frontend/FRONTEND_NOTES.md)

### Deploy to Production
See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for:
- Docker deployment
- AWS/Google Cloud/Azure
- Nginx/Apache setup
- SSL/HTTPS configuration

### Customize
- Update UI colors in `frontend/src/main.tsx`
- Add more fields to applications
- Customize dashboard statistics
- Add email notifications

### Testing
- Write unit tests for backend services
- Write integration tests
- Test with Postman collection

---

## File Locations

| What | Where |
|------|-------|
| Test User | schema.sql |
| Backend Config | skillbridge-backend/src/main/resources/application.properties |
| API Base URL | skillbridge-frontend/src/config/constants.ts |
| JWT Secret | application.properties |
| Sample Requests | postman_collection.json |

---

## Support

### Documentation
- **Complete Setup**: [README.md](README.md)
- **Deployment**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Backend Details**: [skillbridge-backend/BACKEND_NOTES.md](skillbridge-backend/BACKEND_NOTES.md)
- **Frontend Details**: [skillbridge-frontend/FRONTEND_NOTES.md](skillbridge-frontend/FRONTEND_NOTES.md)
- **Requirements**: [SkillBridge_SRS_V2.txt](SkillBridge_SRS_V2.txt)

### Troubleshooting
Check the [README.md](README.md) Troubleshooting section for detailed solutions.

---

## What's Working?

✓ User registration and login  
✓ JWT authentication  
✓ Create/Read/Update/Delete applications  
✓ Interview round tracking  
✓ Dashboard statistics  
✓ Form validation  
✓ Error handling  
✓ Protected routes  
✓ Database persistence  
✓ CORS configuration  

---

## Make It Your Own

### Change Default Port
- **Backend**: Edit `application.properties` (server.port=8080)
- **Frontend**: Edit `vite.config.ts` (port: 3000)

### Customize Database
- Edit `schema.sql` before importing
- Add more fields to job applications
- Add more user types

### Update UI Theme
- Edit Material UI theme in `src/main.tsx`
- Change colors, fonts, spacing
- Add custom components

---

## Performance Tips

1. Use pagination for large datasets
2. Clear browser cache if having issues
3. Monitor network tab in DevTools
4. Check backend logs for errors
5. Use Postman to test API independently

---

## Security Notes

- JWT tokens expire after 24 hours
- Passwords are BCrypt encrypted
- Only user-owned data is accessible
- All API inputs are validated
- CORS is configured for frontend
- Use HTTPS in production

---

**You're ready to go!** 

Start with the [Dashboard](http://localhost:3000) and explore the application.

For questions, check the detailed documentation in [README.md](README.md).

Happy coding! 🚀

---

**Last Updated:** February 14, 2025  
**SkillBridge v1.0.0**
