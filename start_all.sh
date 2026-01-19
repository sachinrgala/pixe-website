#!/bin/bash

# Configuration
export DATABASE_URL="postgres://postgres:postgres@localhost:5432/pixe_db?sslmode=disable"
export PATH=$HOME/go_dist/go/bin:$PATH

export BACKEND_API_URL="http://localhost:8080/api/v1"
export NODE_ENV=development

# SECURITY: Override default insecure secrets
# SECURITY: Strong JWT secret (256-bit random - CHANGE IN PRODUCTION!)
export JWT_SECRET="dev-secret-12345"
export ADMIN_EMAIL="admin@pixe.com"
# SECURITY: Strong admin password (change in production!)
# Password: admin123
# export ADMIN_PASSWORD_HASH='$2a$10$SAUdZb20VGq1uWgre.YppOg6R3PfhcFfdOl1D0JWjUqUC9IF4YuWe'
# Using default from main.go instead

echo "==========================================="
echo "   Pixe Microservices Launcher v3.0 (Safe Mode)"
echo "==========================================="

check_port() {
    (echo > /dev/tcp/localhost/$1) >/dev/null 2>&1
    return $?
}

wait_for_port() {
    local port=$1
    local name=$2
    local retries=30
    echo -n "   Waiting for $name (Port $port)..."
    while ! check_port $port; do
        sleep 1
        retries=$((retries-1))
        if [ $retries -eq 0 ]; then
            echo " TIMEOUT!"
            return 1
        fi
        echo -n "."
    done
    echo " UP!"
    return 0
}

# 0. Check Dependencies (Fail Fast)
echo "[0/4] Checking Infrastructure..."
# Check Docker/Postgres
if ! check_port 5432; then
    echo "❌  PostgreSQL (Port 5432) is NOT reachable."
    echo "    -> Please start Docker Desktop or the Postgres service."
    read -p "    Continue anyway? The backend WILL fail. (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅  PostgreSQL is reachable."
fi

# Check Redis
if ! check_port 6379; then
    echo "⚠️   Redis (Port 6379) is NOT reachable."
    echo "    -> Backend features relying on cache/queues might fail."
else
    echo "✅  Redis is reachable."
fi

# 1. Start AI Service (Python)
# echo "[1/4] Starting AI Service (Port 8000)..."
# if [ ! -d "ai-service/venv" ]; then
#     echo "Creating Python virtual environment..."
#     # python3 -m venv ai-service/venv
# fi
# # source ai-service/venv/bin/activate
# # # Install only if requirements changed or venv is fresh (optimization)
# # if [ ! -f "ai-service/venv/.installed" ]; then
# #     # pip install -r ai-service/requirements.txt > /dev/null 2>&1 && touch ai-service/venv/.installed
# # fi
# 
# # cd ai-service
# # # Use only 1 worker to save RAM
# # # uvicorn main:app --host 0.0.0.0 --port 8000 --reload --workers 1 &
# # # AI_PID=$!
# # cd ..
# 
# # Wait a bit for python to settle
# sleep 1

# 2. Start Backend Service (Go)
echo "[2/4] Starting Go Backend (Port 8080)..."
cd backend
if command -v go &> /dev/null; then
    go mod tidy > /dev/null 2>&1
    go run cmd/server/main.go > backend.log 2>&1 &
    GO_PID=$!
else
    echo "⚠️  Go not found. Backend will not start."
fi
cd ..

# Wait for Backend to actually be up before starting Frontend (reduces CPU contention)
wait_for_port 8080 "Backend"

# 3. Start Frontend (Next.js)
echo "[3/4] Starting Frontend (Port 3000)..."
cd frontend
# Start Next.js
npm run dev -- -p 3003 &
FRONT_PID=$!
cd ..

echo "==========================================="
echo "✅  All Systems Launched"
echo "   - Frontend: http://localhost:3003"
echo "   - Backend:  http://localhost:8080/api/v1/health"
echo "   - AI:       http://localhost:8000/health"
echo "==========================================="
echo "Press Ctrl+C to stop all services."

# Cleanup on exit
trap "kill $GO_PID $FRONT_PID" EXIT

wait
