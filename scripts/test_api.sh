#!/bin/bash

# Configuration
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:8080/api/v1"
AI_URL="http://localhost:8000"

echo "==========================================="
echo "   Pixe API Integration Test Suite"
echo "==========================================="

check_status() {
    url=$1
    expected_status=$2
    name=$3
    
    echo -n "Testing $name ($url)... "
    response=$(curl -s -o /dev/null -w "%{http_code}" $url)
    
    if [ "$response" == "$expected_status" ]; then
        echo "✅ PASS ($response)"
    else
        echo "❌ FAIL (Expected $expected_status, got $response)"
    fi
}

# 1. Health Checks
echo "--- Health Checks ---"
check_status "$FRONTEND_URL" 200 "Frontend Homepage"
check_status "$BACKEND_URL/health" 200 "Go Backend Health"
check_status "$AI_URL/health" 200 "Python AI Health"

# 2. Functional Tests (Mock)
echo "--- Functional Tests ---"

echo -n "Testing Lead Submission (Go Backend)... "
# Valid Payload
response=$(curl -s -X POST "$BACKEND_URL/leads" \
    -H "Content-Type: application/json" \
    -d '{"name": "Test User", "phone": "9876543210", "email": "test@example.com"}')

if echo "$response" | grep -q '"success":true'; then
    echo "✅ PASS"
else
    echo "❌ FAIL: $response"
fi

echo -n "Testing AI Generation (Python)... "
response=$(curl -s -X POST "$AI_URL/generate" \
    -H "Content-Type: application/json" \
    -d '{"prompt": "Hello World"}')

if echo "$response" | grep -q '"text"'; then
   echo "✅ PASS"
else
   echo "❌ FAIL: $response"
fi

echo "==========================================="
