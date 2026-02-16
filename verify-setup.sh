#!/bin/bash

# SkillBridge Verification Script
# This script verifies that all prerequisites are installed and working

echo "========================================"
echo "SkillBridge Setup Verification"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        return 1
    fi
}

# Function to get version
get_version() {
    $1 --version 2>&1 | head -n 1
}

echo "Checking Java..."
if check_command java; then
    echo "  $(get_version java)"
fi
echo ""

echo "Checking Maven..."
if check_command mvn; then
    echo "  $(get_version mvn)"
fi
echo ""

echo "Checking Node.js..."
if check_command node; then
    echo "  $(get_version node)"
fi
echo ""

echo "Checking npm..."
if check_command npm; then
    echo "  $(get_version npm)"
fi
echo ""

echo "Checking MySQL..."
if check_command mysql; then
    echo "  $(get_version mysql)"
fi
echo ""

echo "Checking Git..."
if check_command git; then
    echo "  $(get_version git)"
fi
echo ""

echo "========================================"
echo "Checking Project Structure..."
echo "========================================"
echo ""

# Check directories
if [ -d "skillbridge-backend" ]; then
    echo -e "${GREEN}✓${NC} Backend directory exists"
else
    echo -e "${RED}✗${NC} Backend directory missing"
fi

if [ -d "skillbridge-frontend" ]; then
    echo -e "${GREEN}✓${NC} Frontend directory exists"
else
    echo -e "${RED}✗${NC} Frontend directory missing"
fi

# Check files
if [ -f "schema.sql" ]; then
    echo -e "${GREEN}✓${NC} Database schema exists"
else
    echo -e "${RED}✗${NC} Database schema missing"
fi

if [ -f "postman_collection.json" ]; then
    echo -e "${GREEN}✓${NC} Postman collection exists"
else
    echo -e "${RED}✗${NC} Postman collection missing"
fi

if [ -f "README.md" ]; then
    echo -e "${GREEN}✓${NC} README exists"
else
    echo -e "${RED}✗${NC} README missing"
fi

echo ""
echo "========================================"
echo "Verification Complete!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Ensure all tools are installed"
echo "2. Start MySQL service"
echo "3. Import schema.sql into MySQL"
echo "4. Run: ./build.sh (or build.bat on Windows)"
echo ""
