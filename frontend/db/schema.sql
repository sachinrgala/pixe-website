-- Database Schema for Pixe

-- 1. Users & Auth
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 2. Pages (CMS)
CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  html TEXT DEFAULT '',
  css TEXT DEFAULT '',
  components JSONB DEFAULT '[]',
  styles JSONB DEFAULT '[]',
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  og_image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- 3. Settings (Key-Value Store)
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Media Library
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  mime_type VARCHAR(100),
  size_bytes INTEGER,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Leads & Forms
CREATE TABLE IF NOT EXISTS leads (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255),
   phone VARCHAR(50) NOT NULL,
   course VARCHAR(255),
   source VARCHAR(100),
   status VARCHAR(20) DEFAULT 'new',
   notes TEXT,
   ip_address VARCHAR(50), 
   utm_source VARCHAR(100),
   utm_medium VARCHAR(100),
   utm_campaign VARCHAR(255),
   utm_content VARCHAR(255),
   page_url TEXT,
   user_agent TEXT,
   created_at TIMESTAMP DEFAULT NOW(),
   updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);

CREATE TABLE IF NOT EXISTS form_submissions (
  id SERIAL PRIMARY KEY,
  form_id VARCHAR(50) NOT NULL,
  data JSONB NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. System Logs
CREATE TABLE IF NOT EXISTS webhook_logs (
     id SERIAL PRIMARY KEY,
     source VARCHAR(50) NOT NULL,
     event_type VARCHAR(255),
     payload JSONB,
     created_at TIMESTAMP DEFAULT NOW()
);
