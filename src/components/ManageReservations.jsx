// src/components/ManageReservations.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editReservation, setEditReservation] = useState(null);

  useEffect(() => {
    // Fetch reservations from API (this is an example, update with real API call)
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

  const handleEdit = (reservation) => {
    setIsEditing(true);
    setEditReservation(reservation);
  };

  const handleSave = async () => {
    if (isEditing) {
      // Update reservation API call
      const response = await fetch(`/api/reservations/${editReservation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editReservation),
      });
      if (response.ok) {
        setReservations(reservations.map(reservation =>
          reservation.id === editReservation.id ? editReservation : reservation
        ));
        setIsEditing(false);
        setEditReservation(null);
      }
    } else {
      // Add new reservation API call
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editReservation),
      });
      if (response.ok) {
        const newReservation = await response.json();
        setReservations([...reservations, newReservation]);
        setEditReservation(null);
      }
    }
  };

  return (
    <div className="manage-reservations bg-gray-100 min-h-screen p-10">
      <h2 className="text-3xl font-semibold text-[#1A202C] mb-6">Manage Reservations</h2>

      {/* Add/Edit Reservation Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Reservation' : 'Add New Reservation'}</h3>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSave(); }}
          className="space-y-4"
        >
          <div className="flex justify-between space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">User Name</label>
              <input
                type="text"
                value={editReservation?.user?.name || ''}
                onChange={(e) => setEditReservation({ ...editReservation, user: { ...editReservation.user, name: e.target.value } })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Parking Spot</label>
              <input
                type="text"
                value={editReservation?.parkingSpot?.name || ''}
                onChange={(e) => setEditReservation({ ...editReservation, parkingSpot: { ...editReservation.parkingSpot, name: e.target.value } })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00]"
                required
              />
            </div>
          </div>

          <div className="flex justify-between space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Reservation Time</label>
              <input
                type="datetime-local"
                value={editReservation?.time || ''}
                onChange={(e) => setEditReservation({ ...editReservation, time: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Status</label>
              <select
                value={editReservation?.status || 'pending'}
                onChange={(e) => setEditReservation({ ...editReservation, status: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00]"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFBB00] text-white p-3 rounded-lg hover:bg-[#1A202C] hover:text-[#FFBB00] transition duration-300"
          >
            {isEditing ? 'Save Changes' : 'Add Reservation'}
          </button>
        </form>
      </div>

      {/* Reservations List */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6">Existing Reservations</h3>
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md hover:bg-[#FFBB00] hover:text-white transition duration-300">
              <span>{reservation.user.name} - {reservation.parkingSpot.name} ({reservation.status})</span>
              <div className="space-x-4">
                <button
                  onClick={() => handleEdit(reservation)}
                  className="bg-[#1A202C] text-white px-4 py-2 rounded-lg hover:bg-[#FFBB00] transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCancel(reservation.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageReservations;
