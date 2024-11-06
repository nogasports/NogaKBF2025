# Deployment Guide

## Prerequisites

1. Node.js (v18 or higher)
2. PostgreSQL (v14 or higher)
3. Redis (v6 or higher)
4. AWS Account (for S3 storage)
5. Domain name and SSL certificate

## Environment Setup

1. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

2. Configure environment variables:
```env
NODE_ENV=production
PORT=3000

# Database
DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=kbf_db

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-jwt-refresh-secret

# AWS S3
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name

# Frontend
FRONTEND_URL=https://your-frontend-domain.com

# Redis
REDIS_URL=redis://your-redis-host:6379
```

## Database Setup

1. Create the database:
```sql
CREATE DATABASE kbf_db;
```

2. Run migrations:
```bash
npm run typeorm migration:run
```

3. Seed initial data:
```bash
npm run seed
```

## Production Build

1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
npm run build
```

## Deployment Options

### Docker Deployment

1. Build Docker image:
```bash
docker build -t kbf-api .
```

2. Run container:
```bash
docker run -d \
  --name kbf-api \
  -p 3000:3000 \
  --env-file .env \
  kbf-api
```

### PM2 Deployment

1. Install PM2:
```bash
npm install -g pm2
```

2. Start the application:
```bash
pm2 start ecosystem.config.js
```

3. Save PM2 process list:
```bash
pm2 save
```

4. Setup PM2 startup script:
```bash
pm2 startup
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.kbf.co.ke;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL Setup

1. Install Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
```

2. Obtain SSL certificate:
```bash
sudo certbot --nginx -d api.kbf.co.ke
```

## Monitoring

1. Setup monitoring with PM2:
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

2. Monitor application:
```bash
pm2 monit
```

## Backup Strategy

1. Database backups:
```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/path/to/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump -U your-db-user kbf_db > "$BACKUP_DIR/kbf_db_$TIMESTAMP.sql"
```

2. S3 backups:
```bash
# Upload backup to S3
aws s3 cp "$BACKUP_DIR/kbf_db_$TIMESTAMP.sql" s3://your-bucket/backups/
```

## Security Checklist

- [ ] SSL certificate installed and renewed
- [ ] Firewall configured (allow ports 80, 443, 3000)
- [ ] Database access restricted to application IP
- [ ] Environment variables secured
- [ ] Regular security updates enabled
- [ ] Rate limiting configured
- [ ] CORS settings reviewed
- [ ] File upload limits set
- [ ] WebSocket security configured