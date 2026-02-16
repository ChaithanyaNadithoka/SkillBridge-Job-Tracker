#!/bin/bash

# SkillBridge Build Script for macOS/Linux

echo "========================================"
echo "SkillBridge - Building Full Stack App"
echo "========================================"

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven is not installed"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    exit 1
fi

echo ""
echo "Building Backend..."
cd skillbridge-backend
mvn clean install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend build failed"
    cd ..
    exit 1
fi
cd ..

echo ""
echo "Building Frontend..."
cd skillbridge-frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend dependencies installation failed"
    cd ..
    exit 1
fi
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend build failed"
    cd ..
    exit 1
fi
cd ..

echo ""
echo "========================================"
echo "Build Complete!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Start MySQL service"
echo "2. Import schema: mysql -u root -p < schema.sql"
echo "3. Start Backend: cd skillbridge-backend && mvn spring-boot:run"
echo "4. Start Frontend: cd skillbridge-frontend && npm run dev"
echo ""
