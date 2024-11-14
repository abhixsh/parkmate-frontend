// src/components/ManageParkingSpots.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageParkingSpots = () => {
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    // Fetch parking spots from API
    // Replace with your actual API call
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

  return (
    <div className="manage-parking-spots">
      <h2>Manage Parking Spots</h2>
      <div>
        <Link to="/add-parking-spot" className="btn">Add New Parking Spot</Link>
      </div>
      <ul>
        {parkingSpots.map(spot => (
          <li key={spot.id} className="parking-spot">
            <span>{spot.name} - {spot.location}</span>
            <button onClick={() => handleDelete(spot.id)} className="btn-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageParkingSpots;
