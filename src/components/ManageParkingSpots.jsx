import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageParkingSpots = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSpot, setEditSpot] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/parkmate/parkingspot';

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  const fetchParkingSpots = async () => {
    try {
        const response = await fetch('http://localhost:8080/parkmate/parkingspot', {
            method: 'GET',
            credentials: 'include', // Include credentials
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        setParkingSpots(data); // Update state
    } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to fetch parking spots');
    }
};


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete parking spot');
      }

      setParkingSpots(parkingSpots.filter(spot => spot.id !== id));
      setError(null);
    } catch (err) {
      setError('Error deleting parking spot: ' + err.message);
      console.error('Error:', err);
    }
  };

  const handleEdit = (spot) => {
    setIsEditing(true);
    setEditSpot({
      id: spot.id,
      spotName: spot.spotName,
      location: spot.location,
      spotType: spot.spotType,
      availability: spot.availability,
      hourlyRate: spot.hourlyRate
    });
    setError(null);
  };

  const handleSave = async () => {
    try {
      const spotData = {
        id: editSpot.id,
        spotName: editSpot.spotName,
        location: editSpot.location,
        spotType: editSpot.spotType,
        availability: editSpot.availability,
        hourlyRate: parseFloat(editSpot.hourlyRate)
      };

      const response = await fetch(isEditing ? `${API_BASE_URL}/${editSpot.id}` : API_BASE_URL, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(spotData)
      });

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update parking spot' : 'Failed to create parking spot');
      }

      if (isEditing) {
        setParkingSpots(parkingSpots.map(spot =>
          spot.id === editSpot.id ? spotData : spot
        ));
      } else {
        const newSpot = await response.json();
        setParkingSpots([...parkingSpots, newSpot]);
      }

      setIsEditing(false);
      setEditSpot(null);
      setError(null);
    } catch (err) {
      setError('Error saving parking spot: ' + err.message);
      console.error('Error:', err);
    }
  };

  return (
    <div className="manage-parking-spots bg-gray-100 min-h-screen p-10">
      <h2 className="text-3xl font-semibold text-[#1A202C] mb-6">Manage Parking Spots</h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Add/Edit Parking Spot Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Parking Spot' : 'Add New Parking Spot'}</h3>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSave(); }}
          className="space-y-4"
        >
          <div className="flex justify-between space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Spot Name</label>
              <input
                type="text"
                value={editSpot?.spotName || ''}
                onChange={(e) => setEditSpot({ ...editSpot, spotName: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Location</label>
              <input
                type="text"
                value={editSpot?.location || ''}
                onChange={(e) => setEditSpot({ ...editSpot, location: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00]"
                required
              />
            </div>
          </div>

          <div className="flex justify-between space-x-4">
            <div className="w-1/3">
              <label className="block text-gray-700 font-semibold mb-2">Spot Type</label>
              <select
                value={editSpot?.spotType || ''}
                onChange={(e) => setEditSpot({ ...editSpot, spotType: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00]"
                required
              >
                <option value="">Select Type</option>
                <option value="Standard">Standard</option>
                <option value="Compact">Compact</option>
                <option value="Handicap">Handicap</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="w-1/3">
              <label className="block text-gray-700 font-semibold mb-2">Hourly Rate ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={editSpot?.hourlyRate || ''}
                onChange={(e) => setEditSpot({ ...editSpot, hourlyRate: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00]"
                required
              />
            </div>
            <div className="w-1/3">
              <label className="block text-gray-700 font-semibold mb-2">Available</label>
              <input
                type="checkbox"
                checked={editSpot?.availability || false}
                onChange={(e) => setEditSpot({ ...editSpot, availability: e.target.checked })}
                className="w-6 h-6 focus:ring-2 focus:ring-[#FFBB00]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFBB00] text-white p-3 rounded-lg hover:bg-[#1A202C] hover:text-[#FFBB00] transition duration-300"
          >
            {isEditing ? 'Save Changes' : 'Add Parking Spot'}
          </button>
        </form>
      </div>

      {/* Parking Spots List */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6">Existing Parking Spots</h3>
        <ul className="space-y-4">
          {parkingSpots.map((spot) => (
            <li key={spot.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md hover:bg-[#FFBB00] hover:text-white transition duration-300">
              <div>
                <span className="font-semibold">{spot.spotName}</span>
                <span className="mx-2">-</span>
                <span>{spot.location}</span>
                <span className="mx-2">-</span>
                <span>{spot.spotType}</span>
                <span className="mx-2">-</span>
                <span>${spot.hourlyRate}/hr</span>
                <span className={`ml-4 px-2 py-1 rounded ${spot.availability ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {spot.availability ? 'Available' : 'Occupied'}
                </span>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleEdit(spot)}
                  className="bg-[#1A202C] text-white px-4 py-2 rounded-lg hover:bg-[#FFBB00] transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(spot.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageParkingSpots;