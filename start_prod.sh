#!/bin/bash

# Configuration
export DATABASE_URL="postgres://postgres:postgres@localhost:5432/pixe_db?sslmode=disable"
export PATH=$HOME/go_dist/go/bin:$PATH
export BACKEND_API_URL="http://127.0.0.1:8080/api/v1"
export NODE_ENV=production

# SECURITY: Strong JWT secret (Example for Prod)
export JWT_SECRET="prod-secret-CHANGE_THIS_TO_STRONG_RANDOM_VALUE"

# SECURITY: Block weak credentials (OPS-001)
if [[ "$DATABASE_URL" == *"postgres:postgres"* ]]; then
    echo "❌ SECURITY FATAL: Default database credentials detected!"
    echo "   You are running 'start_prod.sh' (Production Mode)."
    echo "   usage of 'postgres:postgres' is STRICTLY FORBIDDEN."
    echo "   Please set a strong password in DATABASE_URL."
    exit 1
fi

echo "==========================================="
echo "   Pixe Production Launcher (Optimized)"
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

# 1. Build & Start Optimized Go Backend
echo "[1/2] Building & Starting Optimized Backend..."
cd backend
if command -v go &> /dev/null; then
    # Build with linker flags to strip debug symbols (-s -w) for smaller binary and lower RAM
    go build -ldflags="-s -w" -o server_prod cmd/server/main.go
    ./server_prod > backend_prod.log 2>&1 &
    GO_PID=$!
else
    echo "❌ Go not found."
    exit 1
fi
cd ..

wait_for_port 8080 "Backend"

# 2. Start Optimized Frontend (Next.js Production)
echo "[2/2] Starting Optimized Frontend..."
cd frontend
# Assumes 'npm run build' was already run (which we did in previous step)
npm start -- -p 3003 > frontend_prod.log 2>&1 &
FRONT_PID=$!
cd ..

echo "==========================================="
echo "🚀  Production Stack Running (Optimized)"
echo "   - Frontend: http://localhost:3003"
echo "   - Backend:  http://localhost:8080/api/v1/health"
echo "==========================================="
echo "   Note: Hot-reload is DISABLED in this mode."
echo "   Use this mode for deployment or low-resource usage."
echo "==========================================="

# Cleanup on exit
trap "kill $GO_PID $FRONT_PID" EXIT

wait
