import React, { useState, useEffect } from 'react';

const ManageParkingSpots = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSpot, setEditSpot] = useState({
    name: '',
    location: '',
    type: '',
    hourlyRate: '',
    isAvailable: false
  });
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/parkmate/parkingspot';

  useEffect(() => {
    fetchParkingSpots();
  }, []);


  const fetchParkingSpots = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error fetching parking spots: ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setParkingSpots(data);
      } else {
        setError('Invalid response format from server');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch parking spots');
    }
  };

  // Handle deleting a parking spot
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete parking spot');
      }

      setParkingSpots(parkingSpots.filter(spot => spot.id !== id));
    } catch (err) {
      setError(`Error deleting parking spot: ${err.message}`);
    }
  };

  // Handle editing a parking spot
  const handleEdit = (spot) => {
    setIsEditing(true);
    setEditSpot(spot);
  };

  // Handle adding or updating a parking spot
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const spotData = {
        ...editSpot,
        hourlyRate: parseFloat(editSpot.hourlyRate),
      };

      const response = await fetch(`${API_BASE_URL}/${isEditing ? editSpot.id : ''}`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spotData),
      });

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update parking spot' : 'Failed to create parking spot');
      }

      fetchParkingSpots(); // Refresh parking spot list
      setIsEditing(false);
      setEditSpot({ name: '', location: '', type: '', hourlyRate: '', isAvailable: false });
    } catch (err) {
      setError(`Error saving parking spot: ${err.message}`);
    }
  };

  return (
    <div className="manage-parking-spots bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 md:p-10">
      <h2 className="text-3xl font-bold text-[#1A202C] mb-8 border-b pb-4">Manage Parking Spots</h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r animate-fadeIn">
          {error}
        </div>
      )}

      {/* Add or Edit Parking Spot Form */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {isEditing ? 'Edit Parking Spot' : 'Add New Parking Spot'}
        </h3>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Spot Name"
            value={editSpot.name}
            onChange={(e) => setEditSpot({ ...editSpot, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent outline-none transition-all"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={editSpot.location}
            onChange={(e) => setEditSpot({ ...editSpot, location: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent outline-none transition-all"
            required
          />
          <input
            type="text"
            placeholder="Type"
            value={editSpot.type}
            onChange={(e) => setEditSpot({ ...editSpot, type: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent outline-none transition-all"
            required
          />
          <input
            type="number"
            placeholder="Hourly Rate"
            step="0.01"
            min="0"
            value={editSpot.hourlyRate}
            onChange={(e) => setEditSpot({ ...editSpot, hourlyRate: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBB00] focus:border-transparent outline-none transition-all"
            required
          />
          <label className="flex items-center space-x-3 md:col-span-2">
            <input
              type="checkbox"
              checked={editSpot.isAvailable}
              onChange={(e) => setEditSpot({ ...editSpot, isAvailable: e.target.checked })}
              className="w-5 h-5 rounded text-[#FFBB00]"
            />
            <span className="text-gray-700">Available</span>
          </label>
          <button
            type="submit"
            className="md:col-span-2 bg-[#FFBB00] text-white p-4 rounded-lg font-semibold hover:bg-[#E5A800] transition-colors duration-300"
          >
            {isEditing ? 'Save Changes' : 'Add Parking Spot'}
          </button>
        </form>
      </div>

      {/* Parking Spots List */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Existing Parking Spots</h3>
        <div className="space-y-4">
          {parkingSpots.length > 0 ? (
            parkingSpots.map((spot) => (
              <div
                key={spot.id || Math.random()}
                className="flex flex-col md:flex-row md:justify-between md:items-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
                  <span className="font-semibold text-lg">{spot.name || `Spot ${spot.id}`}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">{spot.location || 'Unknown Location'}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">{spot.type || 'Unknown Type'}</span>
                  <span className="text-gray-500">|</span>
                  <span className="font-medium">${spot.hourlyRate ? spot.hourlyRate.toFixed(2) : '0.00'}/hr</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    spot.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {spot.isAvailable ? 'Available' : 'Occupied'}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(spot)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(spot.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No parking spots found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageParkingSpots;
