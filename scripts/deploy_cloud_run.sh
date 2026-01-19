#!/bin/bash

# Pixe Cloud Run Deployer
# Usage: ./scripts/deploy_cloud_run.sh [PROJECT_ID] [REGION]

PROJECT_ID=$1
REGION=${2:-us-central1}

if [ -z "$PROJECT_ID" ]; then
    echo "Usage: $0 [PROJECT_ID] [REGION]"
    echo "Example: $0 my-gcp-project us-central1"
    exit 1
fi

echo "==========================================="
echo "   Pixe Cloud Run Deployer"
echo "   Project: $PROJECT_ID | Region: $REGION"
echo "==========================================="

# 1. Enable Services
echo "[1/4] Enabling required APIs..."
gcloud services enable run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    --project "$PROJECT_ID"

# 2. Deploy AI Service
echo "[2/4] Deploying AI Service..."
gcloud run deploy pixe-ai \
    --source ./ai-service \
    --platform managed \
    --region "$REGION" \
    --project "$PROJECT_ID" \
    --allow-unauthenticated \
    --port 8000 \
    --min-instances 0 \
    --max-instances 1 \
    --cpu-boost

AI_URL=$(gcloud run services describe pixe-ai --platform managed --region "$REGION" --project "$PROJECT_ID" --format 'value(status.url)')
echo "✅ AI Service Deployed: $AI_URL"

# 3. Deploy Backend Service
echo "[3/4] Deploying Go Backend..."
gcloud run deploy pixe-backend \
    --source ./backend \
    --platform managed \
    --region "$REGION" \
    --project "$PROJECT_ID" \
    --allow-unauthenticated \
    --port 8080 \
    --min-instances 0 \
    --max-instances 1 \
    --set-env-vars "DB_HOST=pending,DB_USER=pending"

BACKEND_URL=$(gcloud run services describe pixe-backend --platform managed --region "$REGION" --project "$PROJECT_ID" --format 'value(status.url)')
echo "✅ Backend Service Deployed: $BACKEND_URL"

# 4. Deploy Frontend (Gateway)
echo "[4/4] Deploying Frontend..."
gcloud run deploy pixe-frontend \
    --source ./frontend \
    --platform managed \
    --region "$REGION" \
    --project "$PROJECT_ID" \
    --allow-unauthenticated \
    --port 3000 \
    --min-instances 0 \
    --max-instances 2 \
    --set-env-vars "AI_SERVICE_URL=$AI_URL,BACKEND_API_URL=$BACKEND_URL/api/v1,NODE_ENV=production"

FRONTEND_URL=$(gcloud run services describe pixe-frontend --platform managed --region "$REGION" --project "$PROJECT_ID" --format 'value(status.url)')

echo "==========================================="
echo "🎉 Deployment Complete!"
echo "   - Website: $FRONTEND_URL"
echo "   - Backend: $BACKEND_URL"
echo "   - AI:      $AI_URL"
echo ""
echo "IMPORTANT: Don't forget to set DATABASE_URL in the Cloud Console secrets!"
echo "==========================================="
