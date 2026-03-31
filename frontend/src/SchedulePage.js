// SchedulePage.js

// SchedulePage.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SchedulePage.css';
import { API_BASE_URL } from './config';
function SchedulePage({ userType, onLogout, token }) {
  const [mySlots, setMySlots] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [newStartHour, setNewStartHour] = useState('');
  const [newEndHour, setNewEndHour] = useState('');

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear user authentication token, reset state, etc.
    // ...

    // Call the onLogout callback to notify the parent component
    onLogout();
  };
  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  const handleStartHourChange = (event) => {
    setNewStartHour(event.target.value);
  };

  const handleEndHourChange = (event) => {
    setNewEndHour(event.target.value);
  };

  const handleAddSlot = async () => {
    if (newDate.trim() !== '' && newStartHour.trim() !== '' && newEndHour.trim() !== '') {
      const slotDate = new Date(`${newDate}T${newStartHour}:00Z`).toISOString();
      const startTime = new Date(`${newDate}T${newStartHour}:00Z`).toISOString();
      const endTime = new Date(`${newDate}T${newEndHour}:00Z`).toISOString();
      const newSlot = {
        slotDate,
        startTime,
        endTime,
      };

      try {
        // Send the new slot to the backend for storage
        await axios.post(`${API_BASE_URL}/create-slot`, newSlot, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setMySlots([...mySlots, newSlot]);
        setNewDate('');
        setNewStartHour('');
        setNewEndHour('');
      } catch (error) {
        console.error('Error creating slot:', error);
      }
    }
  };




  const handleRemoveSlot = async (index) => {
    const slotToRemove = mySlots[index];

    try {
      await axios.delete(`${API_BASE_URL}/create-slot/${slotToRemove}`);
      const updatedSlots = [...mySlots];
      updatedSlots.splice(index, 1);
      setMySlots(updatedSlots);
    } catch (error) {
      console.error('Error removing slot:', error);
    }
  };

  return (
      <div className="container mt-5">
        {/* Logout Button */}
        <button className="btn btn-danger" onClick={handleLogout} style={{ position: 'absolute', top: 10, right: 10 }}>
          Logout
        </button>
        {userType === 'doctor' ? (
            <h1 className="mb-4">Set Your Schedule</h1>
        ) : (
            <h1 className="mb-4">My Appointments</h1>
        )}

        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-4">My Slots</h2>
            {mySlots.length === 0 ? (
                <p>No slots added yet.</p>
            ) : (
                <ul className="list-group">
                  {mySlots.map((slot, index) => (
                      <li
                          className={`list-group-item d-flex justify-content-between align-items-center ${
                              index === mySlots.length - 1 ? 'new-slot' : ''
                          }`}
                          key={index}
                      >
                  <span>
                    {slot.slotDate.slice(0,10)} {slot.startTime.slice(11,16)} - {slot.endTime.slice(11,16)}
                  </span>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemoveSlot(index)}
                        >
                          Remove
                        </button>
                      </li>
                  ))}
                </ul>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="mb-4">Create New Slot</h2>
            <div className="mb-3">
              <label htmlFor="dateInput" className="form-label">
                Date
              </label>
              <input
                  type="date"
                  className="form-control"
                  id="dateInput"
                  value={newDate}
                  onChange={handleDateChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startHourInput" className="form-label">
                Start Hour
              </label>
              <input
                  type="time"
                  className="form-control"
                  id="startHourInput"
                  value={newStartHour}
                  onChange={handleStartHourChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endHourInput" className="form-label">
                End Hour
              </label>
              <input
                  type="time"
                  className="form-control"
                  id="endHourInput"
                  value={newEndHour}
                  onChange={handleEndHourChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAddSlot}>
              Add Slot
            </button>
          </div>
        </div>

      </div>
  );
}

export default SchedulePage;
