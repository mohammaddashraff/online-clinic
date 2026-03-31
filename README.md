# Online Clinic Reservation System

A full-stack clinic scheduling platform where doctors publish available slots and patients reserve, cancel, and update appointments.

## Overview
This project demonstrates a complete appointment workflow across a Go backend, PostgreSQL database, and React frontend.

It was built to solve a common operational problem in small clinics: coordinating doctor availability and patient bookings with a simple web interface and API.

## Quick Start
### 1. Clone and configure
```bash
git clone <your-repo-url>
cd online-clinic
cp .env.example .env
cp frontend/.env.example frontend/.env
```

### 2. Start PostgreSQL
Run a local PostgreSQL instance and create a database named `webclinic`, then initialize schema:
```bash
psql -U postgres -d webclinic -f deploy/docker/init.sql
```

### 3. Run backend
```bash
go run .
```
Backend runs on `http://localhost:1234` by default.

### 4. Run frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`.

## Main Features
- User registration and sign-in (`doctor` / `patient` roles)
- Doctor slot creation
- Patient doctor selection and available-slot browsing
- Appointment booking
- Appointment cancellation
- Appointment update flow (replace old slot with new slot)
- Reservation history retrieval per patient

## Tech Stack
| Layer | Technology |
|---|---|
| Backend | Go (`net/http`, `gorilla/mux`, `gorilla/handlers`) |
| Auth | JWT token issuance (`dgrijalva/jwt-go`) |
| Database | PostgreSQL |
| Frontend | React (Create React App), Axios, Bootstrap |
| Containerization | Dockerfiles for backend/frontend/database |

## Project Structure
```text
online-clinic/
├── main.go                 # API router and server bootstrap
├── config.go               # Environment-based configuration
├── users.go                # Sign-up/sign-in and JWT generation
├── doctors.go              # Doctor slot creation
├── patients.go             # Patient booking/cancel/update flows
├── frontend/               # React client application
├── deploy/
│   ├── docker/             # Dockerfiles + database schema init
│   └── kubernetes/         # Deployment reference artifacts
├── docs/
│   ├── SETUP.md
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── DECISIONS.md
└── assets/screenshots/     # Demo visuals for README/portfolio
```

## Environment Variables
### Backend (`.env`)
| Variable | Purpose | Default |
|---|---|---|
| `APP_PORT` | API server port | `1234` |
| `CORS_ALLOWED_ORIGIN` | Allowed frontend origin | `http://localhost:3000` |
| `DB_USER` | PostgreSQL user | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `postgres` |
| `DB_NAME` | Database name | `webclinic` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `JWT_SECRET` | JWT signing key | `change-me-in-development` |

### Frontend (`frontend/.env`)
| Variable | Purpose | Default |
|---|---|---|
| `REACT_APP_API_BASE_URL` | Backend API base URL | `http://localhost:1234` |

## API & Usage
- Endpoint reference: [docs/API.md](docs/API.md)
- Setup guide: [docs/SETUP.md](docs/SETUP.md)
- Architecture notes: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Initial audit snapshot: [docs/AUDIT.md](docs/AUDIT.md)

## Example Workflow
1. Sign up two users: one doctor and one patient.
2. Sign in as doctor and create availability slots.
3. Sign in as patient, select doctor, and fetch available slots.
4. Book a slot and verify reservation list.
5. Cancel or update reservation.

## Screenshots / Demo
- Existing deployment artifact: `assets/screenshots/openshift-deployment.pdf`
- Recommended additions for portfolio polish:
  - Login/registration screen
  - Doctor slot creation screen
  - Patient booking + reservations screen

## Why This Project Is Notable
- End-to-end full-stack workflow, not just isolated CRUD endpoints
- Clear separation between backend API and frontend client
- Includes deployment-oriented artifacts (Docker + Kubernetes references)
- Covers realistic scheduling operations (create, reserve, cancel, update)

## Challenges and Solutions
- Challenge: Hardcoded configuration and credentials reduce portability/security.
  - Solution: Introduced environment-driven configuration and example env files.
- Challenge: Repository was difficult to scan quickly.
  - Solution: Standardized structure and added focused technical docs.
- Challenge: Frontend API URL duplicated across files.
  - Solution: Centralized API configuration in `frontend/src/config.js`.

## Future Improvements
- Add password hashing and JWT validation middleware
- Replace global mutable state in backend handlers with request-scoped/session-safe design
- Add unit/integration tests for booking flows
- Add CI workflow (lint + test + build)
- Add API versioning and request validation layer

## Author
Muhammad Ashraf

## License
This repository currently has no explicit license file.
If you plan to share/reuse publicly, add a license such as MIT.
