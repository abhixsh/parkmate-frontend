// src/components/ManageParkingSpots.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageParkingSpots = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSpot, setEditSpot] = useState(null);

  useEffect(() => {
    // Fetch parking spots from API (this is an example, update with real API call)
    const fetchParkingSpots = async () => {
      const response = await fetch('/api/parking-spots');
      const data = await response.json();
      setParkingSpots(data);
    };

    fetchParkingSpots();
  }, []);

  const handleDelete = async (id) => {
    // Call API to delete parking spot
    const response = await fetch(`/api/parking-spots/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setParkingSpots(parkingSpots.filter(spot => spot.id !== id));
    }
  };

  const handleEdit = (spot) => {
    setIsEditing(true);
    setEditSpot(spot);
  };

  const handleSave = async () => {
    if (isEditing) {
      // Update parking spot API call
      const response = await fetch(`/api/parking-spots/${editSpot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSpot),
      });
      if (response.ok) {
        setParkingSpots(parkingSpots.map(spot =>
          spot.id === editSpot.id ? editSpot : spot
        ));
        setIsEditing(false);
        setEditSpot(null);
      }
    } else {
      // Add new parking spot API call
      const response = await fetch('/api/parking-spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSpot),
      });
      if (response.ok) {
        const newSpot = await response.json();
        setParkingSpots([...parkingSpots, newSpot]);
        setEditSpot(null);
      }
    }
  };

  return (
    <div className="manage-parking-spots bg-gray-100 min-h-screen p-10">
      <h2 className="text-3xl font-semibold text-[#1A202C] mb-6">Manage Parking Spots</h2>

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
                value={editSpot?.name || ''}
                onChange={(e) => setEditSpot({ ...editSpot, name: e.target.value })}
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
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Spot Type</label>
              <input
                type="text"
                value={editSpot?.type || ''}
                onChange={(e) => setEditSpot({ ...editSpot, type: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Available</label>
              <input
                type="checkbox"
                checked={editSpot?.available || false}
                onChange={(e) => setEditSpot({ ...editSpot, available: e.target.checked })}
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
              <span>{spot.name} - {spot.location} ({spot.type})</span>
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
