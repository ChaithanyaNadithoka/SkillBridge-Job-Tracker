# SkillBridge Deployment Guide

## Prerequisites

- Java 17 JDK
- MySQL 8.0+
- Node.js 18+
- Git

## Backend Deployment

### 1. Build the Backend

```bash
cd skillbridge-backend
mvn clean package
```

This creates an executable JAR file at: `target/skillbridge-backend-1.0.0.jar`

### 2. Configure Application Properties

Update `src/main/resources/application.properties` for your environment:

```properties
spring.datasource.url=jdbc:mysql://your-db-host:3306/skillbridge_db
spring.datasource.username=skillbridge_user
spring.datasource.password=your-secure-password
spring.jpa.hibernate.ddl-auto=validate
server.port=8080
```

### 3. Deploy JAR File

```bash
# Option 1: Direct execution
java -jar skillbridge-backend-1.0.0.jar

# Option 2: Run as background service (Linux/Mac)
nohup java -jar skillbridge-backend-1.0.0.jar > app.log 2>&1 &

# Option 3: Windows Service (using NSSM)
nssm install SkillBridgeAPI java -jar "C:\path\to\jar"
nssm start SkillBridgeAPI
```

### 4. Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/skillbridge-backend-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:

```bash
docker build -t skillbridge-api .
docker run -p 8080:8080 skillbridge-api
```

## Frontend Deployment

### 1. Build the Frontend

```bash
cd skillbridge-frontend
npm install
npm run build
```

This creates a `dist` directory with production-ready files.

### 2. Static File Serving Options

#### Nginx

```nginx
server {
    listen 80;
    server_name skillbridge.com;

    location / {
        root /var/www/skillbridge;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Apache

```apache
<VirtualHost *:80>
    ServerName skillbridge.com
    DocumentRoot /var/www/skillbridge/dist

    <Directory /var/www/skillbridge/dist>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    ProxyPassReverse /api http://localhost:8080/api
</VirtualHost>
```

#### Vercel (Recommended for React)

1. Connect your Git repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables
5. Deploy

## Database Deployment

### 1. Create Database

```bash
mysql -u root -p < schema.sql
```

### 2. Create Backup User

```sql
CREATE USER 'skillbridge_backup'@'localhost' IDENTIFIED BY 'backup_password';
GRANT SELECT ON skillbridge_db.* TO 'skillbridge_backup'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Setup Automated Backups

```bash
# Backup script (backup-db.sh)
#!/bin/bash
BACKUP_DIR="/backups/database"
DATE=$(date +%Y%m%d_%H%M%S)

mysqldump -u skillbridge_user -p'password' skillbridge_db > $BACKUP_DIR/skillbridge_db_$DATE.sql

# Add to crontab for daily backups
crontab -e
# Add: 0 2 * * * /path/to/backup-db.sh
```

## SSL/HTTPS Setup

### Let's Encrypt with Certbot

```bash
sudo apt-get install certbot python3-certbot-nginx

sudo certbot certonly --nginx -d skillbridge.com -d www.skillbridge.com

sudo systemctl restart nginx
```

## Monitoring and Logging

### Backend Logging Configuration

Add to `application.properties`:

```properties
logging.level.com.skillbridge=DEBUG
logging.file.name=logs/app.log
logging.file.max-size=10MB
logging.file.max-history=10
```

### Frontend Error Tracking

Add error tracking service (Sentry):

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

## Performance Optimization

### Backend
- Enable HTTP/2
- Setup connection pooling
- Cache frequently accessed data
- Monitor memory usage
- Setup auto-scaling if using cloud

### Frontend
- Enable gzip compression
- Setup CDN for static assets
- Implement service worker for PWA
- Monitor page load times
- Use analytics for user insights

## Health Checks

### Backend Health Endpoint

Add to `HealthController.java`:

```java
@GetMapping("/health")
public ResponseEntity<String> health() {
    return ResponseEntity.ok("UP");
}
```

### Load Balancer Configuration

Monitor the `/health` endpoint for backend availability.

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Setup firewall rules
- [ ] Regular security updates
- [ ] Database encryption
- [ ] API rate limiting
- [ ] Input validation
- [ ] CORS properly configured
- [ ] Secrets management
- [ ] Regular backups
- [ ] Security headers (CSP, X-Frame-Options, etc.)

## Rollback Procedure

1. Keep previous version JAR
2. Stop current service
3. Backup database
4. Deploy previous JAR
5. Restart service
6. Verify functionality

## Post-Deployment Checklist

- [ ] Verify database connection
- [ ] Test authentication flow
- [ ] Check API endpoints
- [ ] Verify frontend access
- [ ] Monitor error logs
- [ ] Test backup restoration
- [ ] Perform load testing
- [ ] Document configuration
- [ ] Setup alerts
- [ ] Document runbooks

## Cloud Deployment Examples

### AWS EC2

```bash
# Launch EC2 instance
aws ec2 run-instances --image-id ami-xxxxxxxx --instance-type t3.medium

# SSH into instance
ssh -i key.pem ec2-user@instance-ip

# Install Java and MySQL
sudo yum install java-17-amazon-correto
sudo yum install mysql-server

# Deploy application
scp -i key.pem target/app.jar ec2-user@instance-ip:~/
```

### Google Cloud Run

```bash
gcloud run deploy skillbridge-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure App Service

```bash
az webapp up --name skillbridge-api --resource-group my-group
az webapp config appsettings set --resource-group my-group --name skillbridge-api --settings WEBSITES_PORT=8080
```

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check credentials in application.properties
- Verify firewall allows 3306 port

### Frontend Not Loading
- Check nginx/apache configuration
- Verify API URL in frontend config
- Check browser console for errors
- Verify CORS configuration

### API Returning 500
- Check backend logs
- Verify database connectivity
- Check JWT configuration
- Verify file permissions

## Support and Maintenance

- Schedule regular backups
- Monitor disk space
- Keep dependencies updated
- Review logs regularly
- Plan capacity upgrades
- Document all changes
- Maintain runbooks
