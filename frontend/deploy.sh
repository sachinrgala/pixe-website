#!/bin/bash

# Pixe CMS - GCP Cloud Run Deployment Script
# Prerequisites: gcloud CLI installed and authenticated

set -e

# Configuration
PROJECT_ID="${GCP_PROJECT_ID:-your-project-id}"
REGION="${GCP_REGION:-us-central1}"
SERVICE_NAME="pixe-cms"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 Deploying Pixe CMS to Cloud Run"
echo "Project: ${PROJECT_ID}"
echo "Region: ${REGION}"
echo ""

# Step 1: Build the Docker image
echo "📦 Building Docker image..."

# Patcher: Ensure static assets are present for standalone build
echo "🔧 Patching standalone build with static assets..."
cp -r public ".next/standalone/pixe website/frontend/"
cp -r .next/static ".next/standalone/pixe website/frontend/.next/"

docker build -t ${IMAGE_NAME}:latest .

# Step 2: Push to Google Container Registry
echo "⬆️ Pushing to Container Registry..."
docker push ${IMAGE_NAME}:latest

# Step 3: Deploy to Cloud Run
echo "☁️ Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --min-instances 0 \
  --max-instances 2 \
  --memory 512Mi \
  --cpu 1 \
  --concurrency 80 \
  --timeout 60 \
  --set-env-vars "NODE_ENV=production" \
  --project ${PROJECT_ID}

# Get the URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)' --project ${PROJECT_ID})

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site is live at: ${SERVICE_URL}"
echo ""
echo "📋 Next steps:"
echo "   1. Set up a custom domain in Cloud Run console"
echo "   2. Configure Cloudflare DNS to point to your domain"
echo "   3. Add environment variables for database connection"
