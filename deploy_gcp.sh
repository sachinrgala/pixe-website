#!/bin/bash
# deploy_gcp.sh - Deploy Pixe Website to Google Cloud Run
# Usage: ./deploy_gcp.sh

set -e

# Configuration - UPDATE THESE
PROJECT_ID="${GCP_PROJECT_ID:-your-project-id}"
REGION="${GCP_REGION:-asia-south1}"  # Mumbai

echo "🚀 Deploying Pixe Website to Google Cloud Run"
echo "   Project: $PROJECT_ID"
echo "   Region: $REGION"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Install: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Ensure authenticated
gcloud config set project $PROJECT_ID

echo "📦 Step 1: Building and deploying Backend..."
cd backend
gcloud run deploy pixe-backend \
    --source . \
    --region $REGION \
    --allow-unauthenticated \
    --memory 256Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 3 \
    --timeout 60s


BACKEND_URL=$(gcloud run services describe pixe-backend --region $REGION --format='value(status.url)')
echo "✅ Backend deployed: $BACKEND_URL"

# echo ""
# echo "🤖 Step 2: Building and deploying AI Service..."
# if [ -d "../ai-service" ]; then
#     cd ../ai-service
#     gcloud run deploy pixe-ai \
#         --source . \
#         --region $REGION \
#         --allow-unauthenticated \
#         --memory 1Gi \
#         --cpu 1 \
#         --min-instances 0 \
#         --max-instances 1 \
#         --timeout 120s
#     
#     AI_URL=$(gcloud run services describe pixe-ai --region $REGION --format='value(status.url)')
#     echo "✅ AI Service deployed: $AI_URL"
#     cd ../backend # Stay relative
# else
#     echo "⚠️  AI Service directory not found, skipping..."
#     AI_URL="N/A"
# fi

echo ""
echo "🌐 Step 3: Building and deploying Frontend..."
cd ../frontend
gcloud run deploy pixe-frontend \
    --source . \
    --region $REGION \
    --allow-unauthenticated \
    --memory 2Gi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 3 \
    --timeout 60s \
    --set-env-vars "NEXT_PUBLIC_API_URL=$BACKEND_URL,NODE_OPTIONS=--max-old-space-size=1536"

FRONTEND_URL=$(gcloud run services describe pixe-frontend --region $REGION --format='value(status.url)')
echo "✅ Frontend deployed: $FRONTEND_URL"

echo ""
echo "=========================================="
echo "🎉 Deployment Complete!"
echo "=========================================="
echo "Frontend:  $FRONTEND_URL"
echo "Backend:   $BACKEND_URL"
echo "AI Service: $AI_URL"
echo ""
echo "Next steps:"
echo "1. Update Backend ALLOWED_ORIGINS to include Frontend URL"
echo "2. Configure custom domain (optional)"
echo "3. Set up Supabase/Neon for PostgreSQL"
