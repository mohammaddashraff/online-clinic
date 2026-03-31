# Setup Guide

## Prerequisites
- Go 1.21+
- Node.js 18+
- npm 9+
- PostgreSQL 14+ (or Docker)

## 1. Clone
```bash
git clone <your-repo-url>
cd online-clinic
```

## 2. Configure Environment
```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

Adjust values in `.env` if your PostgreSQL credentials or host differ.

## 3. Initialize Database
Create the database and apply schema:
```bash
createdb webclinic
psql -U postgres -d webclinic -f deploy/docker/init.sql
```

## 4. Run Backend
```bash
go run .
```
Default API URL: `http://localhost:1234`

## 5. Run Frontend
```bash
cd frontend
npm install
npm start
```
Default app URL: `http://localhost:3000`

## Docker Notes
Dockerfiles are available under `deploy/docker/`:
- `Dockerfile.backend`
- `Dockerfile.frontend`
- `Dockerfile.database`

Example build commands:
```bash
docker build -f deploy/docker/Dockerfile.database -t clinic-db ./deploy/docker
docker build -f deploy/docker/Dockerfile.backend -t clinic-api .
docker build -f deploy/docker/Dockerfile.frontend -t clinic-ui ./frontend
```

## Troubleshooting
- `go: command not found`: install Go and ensure it is on your PATH.
- `react-scripts: command not found`: run `npm install` inside `frontend/`.
- CORS errors in browser: verify `CORS_ALLOWED_ORIGIN` in `.env` matches frontend URL.
- DB connection issues: confirm `DB_*` values in `.env` and that PostgreSQL is running.
