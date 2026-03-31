import { render, screen } from '@testing-library/react';

jest.mock('./SignIn', () => function MockSignIn() {
  return <h2>Sign In</h2>;
});

jest.mock('./SignUp', () => function MockSignUp() {
  return <h2>Sign Up</h2>;
});

jest.mock('./SchedulePage', () => function MockSchedulePage() {
  return <h2>Set Your Schedule</h2>;
});

jest.mock('./PatientPage', () => function MockPatientPage() {
  return <h2>Choose a Doctor and Slot</h2>;
});

import App from './App';

test('renders sign in heading by default', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /sign in/i });
  expect(heading).toBeInTheDocument();
});
