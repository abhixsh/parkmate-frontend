// src/components/ManageReservations.jsx
import React, { useState, useEffect } from 'react';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservations from API
    const fetchReservations = async () => {
      const response = await fetch('/api/reservations');
      const data = await response.json();
      setReservations(data);
    };

    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    // Call API to cancel reservation
    const response = await fetch(`/api/reservations/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setReservations(reservations.filter(reservation => reservation.id !== id));
    }
  };

  return (
    <div className="manage-reservations">
      <h2>Manage Reservations</h2>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id} className="reservation">
            <span>{reservation.user.name} - {reservation.parkingSpot.name}</span>
            <button onClick={() => handleCancel(reservation.id)} className="btn-cancel">Cancel Reservation</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageReservations;
