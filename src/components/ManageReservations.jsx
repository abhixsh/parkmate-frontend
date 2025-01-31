import React, { useState, useEffect } from 'react';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editReservation, setEditReservation] = useState({
    fullName: '',
    email: '',
    vehicleType: '',
    vehiclePlateNumber: '',
    reservationDate: '',
    startTime: '',
    endTime: '',
    spotName: ''
  });
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/parkmate/reservation';

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error fetching reservations: ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setReservations(data);
      } else {
        setError('Invalid response format from server');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch reservations');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }

      setReservations(reservations.filter(reservation => reservation.reservationID !== id));
    } catch (err) {
      setError(`Error deleting reservation: ${err.message}`);
    }
  };

  const handleEdit = (reservation) => {
    setIsEditing(true);
    setEditReservation(reservation);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const reservationData = {
        ...editReservation,
        reservationDate: new Date(editReservation.reservationDate).toISOString(),
        startTime: new Date(editReservation.startTime).toISOString(),
        endTime: new Date(editReservation.endTime).toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/${isEditing ? editReservation.reservationID : ''}`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update reservation' : 'Failed to create reservation');
      }

      fetchReservations();
      setIsEditing(false);
      setEditReservation({
        fullName: '',
        email: '',
        vehicleType: '',
        vehiclePlateNumber: '',
        reservationDate: '',
        startTime: '',
        endTime: '',
        spotName: ''
      });
    } catch (err) {
      setError(`Error saving reservation: ${err.message}`);
    }
  };

  return (
    <div className="manage-reservations bg-gray-100 min-h-screen p-10">
      <h2 className="text-3xl font-semibold text-[#1A202C] mb-6">Manage Reservations</h2>

      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">{error}</div>}

      {/* Reservation Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Reservation' : 'Add New Reservation'}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <input type="text" placeholder="Full Name" value={editReservation.fullName} onChange={(e) => setEditReservation({ ...editReservation, fullName: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="email" placeholder="Email" value={editReservation.email} onChange={(e) => setEditReservation({ ...editReservation, email: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="text" placeholder="Vehicle Type" value={editReservation.vehicleType} onChange={(e) => setEditReservation({ ...editReservation, vehicleType: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="text" placeholder="Vehicle Plate Number" value={editReservation.vehiclePlateNumber} onChange={(e) => setEditReservation({ ...editReservation, vehiclePlateNumber: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="date" placeholder="Reservation Date" value={editReservation.reservationDate} onChange={(e) => setEditReservation({ ...editReservation, reservationDate: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="time" placeholder="Start Time" value={editReservation.startTime} onChange={(e) => setEditReservation({ ...editReservation, startTime: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="time" placeholder="End Time" value={editReservation.endTime} onChange={(e) => setEditReservation({ ...editReservation, endTime: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="text" placeholder="Spot Name" value={editReservation.spotName} onChange={(e) => setEditReservation({ ...editReservation, spotName: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <button type="submit" className="w-full bg-[#FFBB00] text-white p-3 rounded-lg">{isEditing ? 'Save Changes' : 'Add Reservation'}</button>
        </form>
      </div>

      {/* Reservation List */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6">Existing Reservations</h3>
        <ul className="space-y-4">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <li key={reservation.reservationID} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md">
                <span className="font-semibold">{reservation.fullName}</span>
                <span className="mx-2">-</span>
                <span>{reservation.vehiclePlateNumber}</span>
                <span className="mx-2">-</span>
                <span>{reservation.reservationDate}</span>
                <span className="mx-2">-</span>
                <span>{reservation.startTime} - {reservation.endTime}</span>
                <div className="space-x-4">
                  <button onClick={() => handleEdit(reservation)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>
                  <button onClick={() => handleDelete(reservation.reservationID)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No reservations available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageReservations;
