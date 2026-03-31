# API Reference

Base URL (default): `http://localhost:1234`

## Authentication
### `POST /signup`
Create a new user.

Request body:
```json
{
  "name": "Dr. Sam",
  "email": "sam@example.com",
  "password": "secret",
  "userType": "doctor"
}
```

### `POST /signin`
Sign in and receive a token.

Request body:
```json
{
  "email": "sam@example.com",
  "password": "secret"
}
```

Response (example):
```json
{
  "success": true,
  "message": "Sign-in successful",
  "userID": 2,
  "userType": "doctor",
  "token": "<jwt>"
}
```

## Doctor Endpoints
### `POST /create-slot`
Create an availability slot for the signed-in doctor.

Request body:
```json
{
  "slotDate": "2026-04-01T00:00:00Z",
  "startTime": "2026-04-01T09:00:00Z",
  "endTime": "2026-04-01T09:30:00Z"
}
```

### `GET /view-all-doctors`
Get all users with `doctor` role.

## Patient Endpoints
### `POST /select-dr`
Select doctor context (used by subsequent slot queries).

Request body:
```json
{
  "doctorName": "Dr. Sam"
}
```

### `GET /view-avail-slot`
Get available slots for selected doctor.

### `POST /choose-slot`
Reserve a slot for the current patient.

Request body:
```json
{
  "slotID": 12
}
```

### `DELETE /cancel-appointment/{scheduleid}`
Cancel an appointment and release its slot.
> Note: despite the route parameter name `scheduleid`, the handler currently treats it as an appointment ID.

### `GET /get-all-reservations/{patientID}`
Get all reservations for a patient.

### `PUT /update-slot`
Replace reservation from one slot to another.

Request body:
```json
{
  "oldSlotID": 1,
  "newSlotID": 2
}
```

## Response Pattern
Most endpoints return JSON objects containing:
- `success`: boolean
- `message`: string
- endpoint-specific fields (for example `schedules`, `reservations`, `token`)

## Notes
- CORS is enabled for one configured origin (`CORS_ALLOWED_ORIGIN`).
- JWT is issued on sign-in, but request-token validation middleware is not yet enforced on all routes.
