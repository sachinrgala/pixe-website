#!/bin/bash

BASE_URL="http://localhost:8080/api/v1"
EMAIL="admin@pixe.com"
PASSWORD="admin123"

echo "0. Authenticating..."
LOGIN_RES=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

# Extract Token (assuming { "token": "..." })
TOKEN=$(echo $LOGIN_RES | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login Failed."
  echo "Response: $LOGIN_RES"
  exit 1
else
  echo "✅ Login Successful. Token obtained."
fi

echo -e "\n1. Testing GET /api/courses..."
curl -s "$BASE_URL/courses" | head -n 5

echo -e "\n\n2. Testing POST /api/courses (Create Testing Course)..."
CREATE_RES=$(curl -s -X POST "$BASE_URL/courses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Test Course","slug":"test-course","description":"A test course","duration":"1 Week","price":100,"status":"draft"}')
echo "Response: $CREATE_RES"

CREATED_ID=$(echo $CREATE_RES | grep -o '"id":[0-9]*' | head -1 | awk -F':' '{print $2}')

if [ -z "$CREATED_ID" ]; then
  echo "❌ Failed to create course or extracting ID failed."
else
  echo "✅ Course Created with ID: $CREATED_ID"

  echo -e "\n3. Testing PUT /api/courses/$CREATED_ID (Update)..."
  UPDATE_RES=$(curl -s -X PUT "$BASE_URL/courses/$CREATED_ID" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"title":"Test Course Updated","slug":"test-course-updated","description":"Updated description","duration":"2 Weeks","price":200,"status":"published"}')
  echo "Response: $UPDATE_RES"

  echo -e "\n4. Testing DELETE /api/courses/$CREATED_ID (Delete)..."
  DELETE_RES=$(curl -s -X DELETE "$BASE_URL/courses/$CREATED_ID" \
    -H "Authorization: Bearer $TOKEN")
  echo "Response Status: $DELETE_RES"
  
  # Check if deleted
  CHECK_RES=$(curl -s "$BASE_URL/courses")
  if echo "$CHECK_RES" | grep -q "\"id\":$CREATED_ID"; then
     echo "❌ Course $CREATED_ID still exists in list!"
  else
     echo "✅ Course $CREATED_ID successfully deleted."
  fi
fi

echo -e "\n5. Testing AI Generate (Mock Check)..."
echo "Skipping AI check (Service known to be disabled)."
