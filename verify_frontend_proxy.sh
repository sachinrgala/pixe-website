#!/bin/bash
# verify_frontend_proxy.sh

# 1. Login via Frontend (Port 3002) to get Token
echo "1. Logging in via Frontend (http://localhost:3002/api/login)..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3002/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pixe.com", "password":"admin123"}')

# Use Python to extract token
TOKEN=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))")

if [ -z "$TOKEN" ]; then
    echo "❌ Login failed via Frontend. Response: $LOGIN_RESPONSE"
    exit 1
fi

echo "✅ Got Token: ${TOKEN:0:15}..."

# 2. Test Protected Route via Frontend Proxy (Port 3002) using Cookie
echo "2. Testing POST /api/courses via Frontend using Cookie..."
# Simulating browser behavior: sending token in 'Cookie' header
PROXY_RESPONSE=$(curl -s -X POST "http://localhost:3002/api/courses" \
  -b "token=$TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Frontend Proxy Test",
    "slug": "frontend-proxy-test",
    "description": "Testing proxy auth",
    "duration": "1 Day",
    "price": 0
  }')

if [[ "$PROXY_RESPONSE" == *"Unauthorized"* ]]; then
    echo "❌ Proxy verification FAILED. Response: $PROXY_RESPONSE"
    echo "This confirms the proxy is stripping the Cookie or Authorization header."
    exit 1
elif [[ "$PROXY_RESPONSE" == *"id"* ]]; then
    echo "✅ Proxy verification SUCCESS! Course created via Frontend."
    # Cleanup
    ID=$(echo "$PROXY_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('id'))")
    echo "Cleaning up course ID $ID..."
    curl -s -X DELETE "http://localhost:3002/api/courses/$ID" -b "token=$TOKEN" > /dev/null
else
    echo "⚠️ Unexpected response: $PROXY_RESPONSE"
fi
