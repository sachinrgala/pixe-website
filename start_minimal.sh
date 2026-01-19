#!/bin/bash

# Configuration
export DATABASE_URL="postgres://postgres:postgres@localhost:5432/pixe_db?sslmode=disable"
export PATH=$HOME/go_dist/go/bin:$PATH
export BACKEND_API_URL="http://localhost:8080/api/v1"
export NODE_ENV=development

# SECURITY: Override default insecure secrets
export JWT_SECRET="$(openssl rand -hex 32 2>/dev/null || echo 'safe_fallback_secret_for_dev_mode_only')"
export ADMIN_EMAIL="admin@pixe.com"
export ADMIN_PASSWORD_HASH='$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.U9oNNlKbJm8HQy'

echo "==========================================="
echo "   Pixe Safe Launcher (No AI Service)"
echo "==========================================="

# 1. Start Backend Service (Go)
echo "[1/2] Starting Go Backend (Port 8080)..."
cd backend
if command -v go &> /dev/null; then
    go run cmd/server/main.go &
    GO_PID=$!
    echo "   -> Backend PID: $GO_PID"
else
    echo "⚠️  Go not found. Backend will not start."
fi
cd ..

# 2. Start Frontend (Next.js)
echo "[2/2] Starting Frontend (Port 3000)..."
cd frontend
# Using nice to lower priority and potentially help scheduler, though won't fix OOM
# Increasing Node memory limit might actually ENABLE it to crash faster if system is low,
# but limiting it might cause GC thrashing. Let's start standard but one by one.
npm run dev -- -p 3002 &
FRONT_PID=$!
echo "   -> Frontend PID: $FRONT_PID"
cd ..

echo "==========================================="
echo "✅  Minimal Services Started"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend:  http://localhost:8080/api/v1/health"
echo "   - AI Service: DISABLED (Run separate if needed)"
echo "==========================================="

# Cleanup on exit
trap "kill $GO_PID $FRONT_PID" EXIT

wait
