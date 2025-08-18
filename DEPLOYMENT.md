# 🚀 Deployment Guide

This guide covers deploying the Vehicle Damage Detection System to various platforms.

## 📋 Prerequisites

- **Git** installed and configured
- **Python 3.8+** with pip
- **Node.js 18+** with npm
- **Docker** (optional, for containerized deployment)

## 🏠 Local Development Deployment

### 1. Clone and Setup

```bash
git clone https://github.com/yourusername/vehicle-damage-detector.git
cd vehicle-damage-detector
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Access

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🐳 Docker Deployment

### 1. Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 2. Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### 3. Docker Compose

Create `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - BACKEND_URL=http://localhost:8000
    volumes:
      - ./backend:/app
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  backend_data:
```

### 4. Run with Docker

```bash
# Build and start services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

## ☁️ Cloud Deployment

### AWS Deployment

#### 1. Backend on AWS Lambda

```bash
# Install AWS SAM CLI
pip install aws-sam-cli

# Build and deploy
sam build
sam deploy --guided
```

#### 2. Frontend on AWS S3 + CloudFront

```bash
# Build frontend
cd frontend
npm run build

# Deploy to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Configure CloudFront for HTTPS
```

### Azure Deployment

#### 1. Backend on Azure Functions

```bash
# Install Azure Functions Core Tools
npm install -g azure-functions-core-tools@4

# Create function app
func init backend --python
func new --name detect-damage --template "HTTP trigger"

# Deploy
func azure functionapp publish your-function-app-name
```

#### 2. Frontend on Azure Static Web Apps

```bash
# Install Azure CLI
# Build and deploy
npm run build
az staticwebapp create --name your-app-name --source .
```

### Google Cloud Deployment

#### 1. Backend on Cloud Run

```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT_ID/vehicle-damage-backend
gcloud run deploy --image gcr.io/PROJECT_ID/vehicle-damage-backend --platform managed
```

#### 2. Frontend on Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize and deploy
firebase init hosting
firebase deploy
```

## 🔧 Production Configuration

### 1. Environment Variables

Create `.env.production`:

```env
# Production Settings
NODE_ENV=production
LOG_LEVEL=WARNING

# Backend Configuration
BACKEND_URL=https://your-backend-domain.com
CORS_ORIGINS=https://your-frontend-domain.com

# Frontend Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_APP_NAME=Vehicle Damage Detector

# Security
JWT_SECRET=your-super-secure-jwt-secret
SESSION_SECRET=your-super-secure-session-secret
```

### 2. SSL/HTTPS Configuration

```bash
# Install Certbot for Let's Encrypt
sudo apt-get install certbot

# Generate SSL certificate
sudo certbot certonly --standalone -d your-domain.com

# Configure Nginx
sudo nano /etc/nginx/sites-available/your-domain
```

### 3. Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Monitoring and Logging

### 1. Application Monitoring

```bash
# Install monitoring tools
pip install prometheus-client
npm install --save-dev @sentry/nextjs

# Configure logging
export LOG_LEVEL=INFO
export LOG_FORMAT=json
```

### 2. Health Checks

```bash
# Backend health check
curl http://localhost:8000/health

# Frontend health check
curl http://localhost:3000/api/health
```

### 3. Performance Monitoring

```bash
# Install performance monitoring
npm install --save-dev @next/bundle-analyzer
npm install --save-dev lighthouse

# Run performance audit
npx lighthouse http://localhost:3000
```

## 🔒 Security Considerations

### 1. Environment Variables

- Never commit `.env` files to version control
- Use secure secret management services
- Rotate secrets regularly

### 2. CORS Configuration

```python
# backend/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],  # Restrict to your domain
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

### 3. Rate Limiting

```bash
# Install rate limiting
pip install slowapi

# Configure in backend
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
```

## 📈 Scaling Considerations

### 1. Load Balancing

```bash
# Install HAProxy
sudo apt-get install haproxy

# Configure load balancer
sudo nano /etc/haproxy/haproxy.cfg
```

### 2. Database Scaling

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Configure connection pooling
pip install psycopg2-binary
```

### 3. Caching

```bash
# Install Redis
sudo apt-get install redis-server

# Configure caching
pip install redis
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port
   netstat -tulpn | grep :8000
   
   # Kill process
   kill -9 <PID>
   ```

2. **Permission Denied**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER /path/to/project
   chmod +x start_*.bat
   ```

3. **Dependencies Issues**
   ```bash
   # Clear cache and reinstall
   pip cache purge
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Mode

```bash
# Enable debug logging
export LOG_LEVEL=DEBUG
export PYTHONPATH=.

# Run with verbose output
python main.py --log-level debug
npm run dev -- --verbose
```

## 📚 Additional Resources

- [FastAPI Deployment Guide](https://fastapi.tiangolo.com/deployment/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [AWS Deployment Guide](https://aws.amazon.com/getting-started/)
- [Azure Deployment Guide](https://docs.microsoft.com/en-us/azure/)

---

**Need Help?** Create an issue on GitHub or check the troubleshooting section above.
