@echo off
REM SkillBridge Build Script for Windows

echo ========================================
echo SkillBridge - Building Full Stack App
echo ========================================

REM Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Maven is not installed or not in PATH
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    exit /b 1
)

echo.
echo Building Backend...
cd skillbridge-backend
call mvn clean install
if %ERRORLEVEL% neq 0 (
    echo ERROR: Backend build failed
    cd ..
    exit /b 1
)
cd ..

echo.
echo Building Frontend...
cd skillbridge-frontend
call npm install
if %ERRORLEVEL% neq 0 (
    echo ERROR: Frontend dependencies installation failed
    cd ..
    exit /b 1
)
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ERROR: Frontend build failed
    cd ..
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Start MySQL: net start MySQL80
echo 2. Import schema: mysql -u root -p ^< schema.sql
echo 3. Start Backend: cd skillbridge-backend && mvn spring-boot:run
echo 4. Start Frontend: cd skillbridge-frontend && npm run dev
echo.
