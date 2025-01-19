import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageParkingSpots = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSpot, setEditSpot] = useState({
    id: '',
    spotName: '',
    location: '',
    spotType: '',
    availability: true,
  });

  // Fetch parking spots from the API
  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await fetch('http://localhost:8080/parkmate/parking-spots');  // Ensure this API path is correct
        if (response.ok) {
          const data = await response.json();
          setParkingSpots(data);
        } else {
          alert('Failed to fetch parking spots.');
        }
      } catch (error) {
        console.error('Error fetching parking spots:', error);
        alert('Error fetching parking spots.');
      }
    };

    fetchParkingSpots();
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/parkmate/parking-spots/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setParkingSpots(parkingSpots.filter(spot => spot.id !== id)); // Remove deleted spot from the state
      } else {
        alert('Failed to delete parking spot.');
      }
    } catch (error) {
      console.error('Error deleting parking spot:', error);
      alert('Error deleting parking spot.');
    }
  };

  // Handle edit functionality
  const handleEdit = (spot) => {
    setIsEditing(true);
    setEditSpot({ ...spot });
  };

  // Handle update parking spot
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/parkmate/parking-spots/${editSpot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSpot),
      });

      if (response.ok) {
        const updatedSpots = parkingSpots.map((spot) =>
          spot.id === editSpot.id ? editSpot : spot
        );
        setParkingSpots(updatedSpots); // Update the state with the edited spot
        setIsEditing(false);
        setEditSpot({
          id: '',
          spotName: '',
          location: '',
          spotType: '',
          availability: true,
        });
      } else {
        alert('Failed to update parking spot.');
      }
    } catch (error) {
      console.error('Error updating parking spot:', error);
      alert('Error updating parking spot.');
    }
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditSpot({ ...editSpot, [name]: value });
  };

  return (
    <div>
      <h1>Manage Parking Spots</h1>
      <Link to="/add-parking-spot">
        <button>Add Parking Spot</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Spot Name</th>
            <th>Location</th>
            <th>Spot Type</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parkingSpots.map(spot => (
            <tr key={spot.id}>
              <td>{spot.spotName}</td>
              <td>{spot.location}</td>
              <td>{spot.spotType}</td>
              <td>{spot.availability ? 'Available' : 'Not Available'}</td>
              <td>
                <button onClick={() => handleEdit(spot)}>Edit</button>
                <button onClick={() => handleDelete(spot.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div>
          <h2>Edit Parking Spot</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Spot Name:</label>
              <input
                type="text"
                name="spotName"
                value={editSpot.spotName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={editSpot.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Spot Type:</label>
              <input
                type="text"
                name="spotType"
                value={editSpot.spotType}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Availability:</label>
              <select
                name="availability"
                value={editSpot.availability}
                onChange={handleInputChange}
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </select>
            </div>
            <button type="submit">Update Spot</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageParkingSpots;
