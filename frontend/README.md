# Frontend

React client for the Online Clinic Reservation System.

## Run Locally
```bash
cp .env.example .env
npm install
npm start
```

By default the app expects backend API at `http://localhost:1234`.
Configure it with:

```env
REACT_APP_API_BASE_URL=http://localhost:1234
```

## Main Screens
- `SignIn` / `SignUp`
- `SchedulePage` (doctor)
- `PatientPage` (patient)

For full project setup, see the root [README](../README.md).
