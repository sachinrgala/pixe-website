# Pixe - High Performance AI-Powered CMS

Pixe is a state-of-the-art education technology platform built with a microservice architecture. It features a modern Next.js 15 frontend, a high-performance Go backend, and a specialized Python AI service for content generation.

## 🌟 Key Features

### 🎓 Content Management
- **Course Management**: Create, edit, and publish courses with dynamic routing.
- **Success Stories**: Manage student testimonials and "Hall of Fame".
- **Events & Webinars**: Schedule masterclasses and live sessions.
- **Blog & Resources**: Full-featured CMS for articles and downloads.
- **Locations Dropdown**: Rich UI for city-specific landing pages and international presence.

### 🤖 AI Integration
- **Smart Content**: Auto-generate course descriptions using the "✨ Generate with AI" button.
- **Microservice**: Dedicated Python FastAPI service running local LLMs (DistilGPT-2).

### 💼 Business Features
- **Corporate Hiring**: Lead generation pipeline for hiring partners.
- **Analytics & PPC**: Dashboard for tracking site performance and ad spend.
- **Partner Network**: Manage hiring partner logos and relationships.

### 🛡️ Security
- **Admin Authentication**: JWT-based secure login system.
- **Protected Routes**: Middleware protection for `/dashboard`.
- **Rate Limiting**: Backend protection against abuse.

## 🏗️ Architecture

| Service | Port | Tech Stack | Role |
|---------|------|------------|------|
| **Frontend** | `3000`* | Next.js 15, React, Tailwind | UI, Router, Admin Dashboard |
| **Backend** | `8080` | Go (Fiber) | API, Auth, Data Store (In-Memory) |
| **AI Service** | `8000` | Python (FastAPI) | Text Generation |

*\*Note: Frontend may auto-switch to 3001/3002 if ports are busy.*

## 🚀 Getting Started

### 1. Start All Services
We provide a unified launch script to start the entire stack:

```bash
./start_all.sh
```

### 2. Access the Platform
- **Public Website**: `http://localhost:3000` (Home, Courses, About)
- **Admin Dashboard**: `http://localhost:3000/dashboard`

### 3. Login Credentials
The dashboard is protected. Use the default admin credentials:

- **Email**: `admin@pixe.com`
- **Password**: `admin123`

## 🛠️ Project Structure
- `frontend/`: Next.js 15 App Router application.
- `backend/`: Go Fiber REST API.
- `ai-service/`: Python FastAPI application.
- `wireframe/`: Design reference assets.

## 📝 Configuration
- **Settings**: Manage global site settings (Phone, Banner, Webhook URL) via `/dashboard/settings`.
- **Webhooks**: Configure corporate lead webhooks in the Settings panel.

## ⚠️ Current Limitations
- **Persistence**: Data is currently stored In-Memory. Restarting the backend will reset data to defaults. Connect a PostgreSQL database for production usage.
