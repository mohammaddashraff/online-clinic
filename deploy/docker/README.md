# Docker Assets

This directory contains container build definitions for local deployment experiments.

- `Dockerfile.backend`: builds the Go API service
- `Dockerfile.frontend`: builds the React frontend
- `Dockerfile.database`: PostgreSQL image with schema initialization
- `init.sql`: schema bootstrap script

Use these Dockerfiles with the project root as context for backend, `frontend/` context for frontend, and `deploy/docker/` context for database.
