import React, { useState, useEffect } from 'react';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editReservation, setEditReservation] = useState({
    reservationId: '',
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

      setReservations(reservations.filter(reservation => reservation.reservationId !== id));
    } catch (err) {
      setError(`Error deleting reservation: ${err.message}`);
    }
  };

  const handleEdit = (reservation) => {
    const formattedReservation = {
      ...reservation,
      // Convert Unix timestamp to date string for the date input
      reservationDate: formatDateForInput(reservation.reservationDate),
      // Keep Unix timestamps as is for time fields
      startTime: reservation.startTime,
      endTime: reservation.endTime
    };
    setIsEditing(true);
    setEditReservation(formattedReservation);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const reservationData = {
      ...editReservation,
      reservationId: isEditing ? editReservation.reservationId : undefined, // don't send reservationId when creating new
      reservationDate: editReservation.reservationDate ? new Date(editReservation.reservationDate).getTime() : null,
      startTime: editReservation.startTime ? new Date(editReservation.startTime).getTime() : null,
      endTime: editReservation.endTime ? new Date(editReservation.endTime).getTime() : null
    };

    if (!reservationData.reservationDate || !reservationData.startTime || !reservationData.endTime) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${isEditing ? editReservation.reservationId : ''}`, {
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
        reservationId: '', // Reset reservationId when creating a new one
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


  // Format date for display (Unix timestamp to YYYY-MM-DD)
  const formatDateForInput = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  // Format date for display
  const formatDateForDisplay = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString();
  };

  // Format time for display (Unix timestamp to HH:MM)
  const formatTimeForDisplay = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Convert time input value to Unix timestamp
  const handleTimeChange = (field, timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date(editReservation.reservationDate);
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    setEditReservation({
      ...editReservation,
      [field]: date.getTime()
    });
  };

  return (
    <div className="manage-reservations bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Manage Reservations</h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-r-lg animate-fadeIn">
          {error}
        </div>
      )}

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8 transition-all duration-300 hover:shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
          <span className={`mr-2 ${isEditing ? 'text-black' : 'text-blacks'}`}>
            {isEditing ? 'Edit Reservation' : 'Add New Reservation'}
          </span>
        </h3>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={editReservation.fullName}
              onChange={(e) => setEditReservation({ ...editReservation, fullName: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent transition-all"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={editReservation.email}
              onChange={(e) => setEditReservation({ ...editReservation, email: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent transition-all"
              required
            />
            <input
              type="text"
              placeholder="Vehicle Type"
              value={editReservation.vehicleType}
              onChange={(e) => setEditReservation({ ...editReservation, vehicleType: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent transition-all"
              required
            />
            <input
              type="text"
              placeholder="Vehicle Plate Number"
              value={editReservation.vehiclePlateNumber}
              onChange={(e) => setEditReservation({ ...editReservation, vehiclePlateNumber: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="space-y-4">
            <input
              type="date"
              value={editReservation.reservationDate}
              onChange={(e) => setEditReservation({ ...editReservation, reservationDate: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent transition-all"
              required
            />
            <input
              type="time"
              value={editReservation.startTime ? formatTimeForDisplay(editReservation.startTime) : ''}
              onChange={(e) => handleTimeChange('startTime', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent transition-all"
              required
            />
            <input
              type="time"
              value={editReservation.endTime ? formatTimeForDisplay(editReservation.endTime) : ''}
              onChange={(e) => handleTimeChange('endTime', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent transition-all"
              required
            />
            <input
              type="text"
              placeholder="Spot Name"
              value={editReservation.spotName}
              onChange={(e) => setEditReservation({ ...editReservation, spotName: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-[#FFBB00] hover:bg-[#FFA500] text-white p-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isEditing ? 'Save Changes' : 'Add Reservation'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">Existing Reservations</h3>
        <div className="space-y-4">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div
                key={reservation.reservationId}
                className="flex flex-col md:flex-row md:justify-between md:items-center p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
                  <span className="font-semibold text-gray-800">{reservation.fullName}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">{reservation.vehiclePlateNumber}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">{formatDateForDisplay(reservation.reservationDate)}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">
                    {formatTimeForDisplay(reservation.startTime)} - {formatTimeForDisplay(reservation.endTime)}
                  </span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">{reservation.spotName}</span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(reservation)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(reservation.reservationId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No reservations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageReservations;
