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

  // Fetch all parking spots
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
    <div className="manage-parking-spots bg-gray-100 min-h-screen p-10">
      <h2 className="text-3xl font-semibold text-[#1A202C] mb-6">Manage Parking Spots</h2>

      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">{error}</div>}

      {/* Add or Edit Parking Spot Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Parking Spot' : 'Add New Parking Spot'}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <input type="text" placeholder="Spot Name" value={editSpot.name} onChange={(e) => setEditSpot({ ...editSpot, name: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="text" placeholder="Location" value={editSpot.location} onChange={(e) => setEditSpot({ ...editSpot, location: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="text" placeholder="Type" value={editSpot.type} onChange={(e) => setEditSpot({ ...editSpot, type: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <input type="number" placeholder="Hourly Rate" step="0.01" min="0" value={editSpot.hourlyRate} onChange={(e) => setEditSpot({ ...editSpot, hourlyRate: e.target.value })} className="w-full p-3 border rounded-lg" required />
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={editSpot.isAvailable} onChange={(e) => setEditSpot({ ...editSpot, isAvailable: e.target.checked })} />
            <span>Available</span>
          </label>
          <button type="submit" className="w-full bg-[#FFBB00] text-white p-3 rounded-lg">{isEditing ? 'Save Changes' : 'Add Parking Spot'}</button>
        </form>
      </div>

      {/* Parking Spots List */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6">Existing Parking Spots</h3>
        <ul className="space-y-4">
          {parkingSpots.length > 0 ? (
            parkingSpots.map((spot) => (
              <li key={spot.id || Math.random()} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md">
                <span className="font-semibold">{spot.name || `Spot ${spot.id}`}</span>
                <span className="mx-2">-</span>
                <span>{spot.location || 'Unknown Location'}</span>
                <span className="mx-2">-</span>
                <span>{spot.type || 'Unknown Type'}</span>
                <span className="mx-2">-</span>
                <span>${spot.hourlyRate ? spot.hourlyRate.toFixed(2) : '0.00'}/hr</span>
                <span className={`ml-4 px-2 py-1 rounded ${spot.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {spot.isAvailable ? 'Available' : 'Occupied'}
                </span>
                <div className="space-x-4">
                  <button onClick={() => handleEdit(spot)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>
                  <button onClick={() => handleDelete(spot.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No parking spots available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageParkingSpots;
