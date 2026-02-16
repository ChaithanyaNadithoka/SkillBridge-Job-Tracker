@echo off
REM SkillBridge Verification Script for Windows

echo ========================================
echo SkillBridge Setup Verification
echo ========================================
echo.

REM Check Java
echo Checking Java...
java -version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Java is installed
    java -version
) else (
    echo [ERROR] Java is NOT installed
)
echo.

REM Check Maven
echo Checking Maven...
mvn -version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Maven is installed
    mvn -version
) else (
    echo [ERROR] Maven is NOT installed
)
echo.

REM Check Node.js
echo Checking Node.js...
node -v >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Node.js is installed
    node -v
) else (
    echo [ERROR] Node.js is NOT installed
)
echo.

REM Check npm
echo Checking npm...
npm -v >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] npm is installed
    npm -v
) else (
    echo [ERROR] npm is NOT installed
)
echo.

REM Check MySQL
echo Checking MySQL...
mysql -version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] MySQL is installed
    mysql -version
) else (
    echo [ERROR] MySQL is NOT installed
)
echo.

REM Check directories
echo ========================================
echo Checking Project Structure...
echo ========================================
echo.

if exist skillbridge-backend (
    echo [OK] Backend directory exists
) else (
    echo [ERROR] Backend directory missing
)

if exist skillbridge-frontend (
    echo [OK] Frontend directory exists
) else (
    echo [ERROR] Frontend directory missing
)

if exist schema.sql (
    echo [OK] Database schema exists
) else (
    echo [ERROR] Database schema missing
)

if exist postman_collection.json (
    echo [OK] Postman collection exists
) else (
    echo [ERROR] Postman collection missing
)

if exist README.md (
    echo [OK] README exists
) else (
    echo [ERROR] README missing
)

echo.
echo ========================================
echo Verification Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Ensure all tools are installed
echo 2. Start MySQL service: net start MySQL80
echo 3. Import schema.sql into MySQL
echo 4. Run: build.bat
echo.
