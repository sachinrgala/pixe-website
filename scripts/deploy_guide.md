# Deploying Pixe Microservices to Google Cloud Run

This guide details how to deploy the **Frontend**, **Go Backend**, and **Python AI** services to Google Cloud Run.

## Automated Deployment

We have created a unified script to handle the deployment and wiring of all services.

### Prerequisites
1. **Google Cloud SDK** installed and authenticated (`gcloud auth login`).
2. **Project created** on Google Cloud Platform.

### Steps

1. **Run the Deploy Script:**
   ```bash
   # Usage: ./scripts/deploy_cloud_run.sh [PROJECT_ID] [REGION]
   ./scripts/deploy_cloud_run.sh my-pixe-project us-central1
   ```

   This script will:
   - Enable necessary Google Cloud APIs.
   - Build and Upload Docker images for all 3 services.
   - Deploy them to Cloud Run (managed).
   - **Important**: It auto-wires the URLs via environment variables (e.g., telling the Frontend where the AI service lives).

2. **Configure Database Secret:**
   After deployment, you must manually connect the Database.
   
   - Go to Google Cloud Console > Cloud Run.
   - Select `pixe-frontend` and `pixe-backend`.
   - Edit & Deploy New Revision > Variables & Secrets.
   - Add Environment Variable:
     - `DATABASE_URL`: Your production PostgreSQL connection string (from Neon, Supabase, or Cloud SQL).
   
## Manual Configuration (Reference)

If you need to tweak settings manually, here are the key environment variables each service expects:

### Frontend (pixe-frontend)
- `DATABASE_URL`: Postgres Connection String.
- `AI_SERVICE_URL`: URL of the deployed `pixe-ai` service (e.g. `https://pixe-ai-xyz-uc.a.run.app`).
- `BACKEND_API_URL`: URL of the deployed `pixe-backend` service + `/api/v1` (e.g. `https://pixe-backend-xyz-uc.a.run.app/api/v1`).
- `COOKIE_SECRET`: Long random string for session signing.

### Backend (pixe-backend)
- `DATABASE_URL`: Same Postgres Connection String.

### AI Service (pixe-ai)
- No external dependencies currently.
