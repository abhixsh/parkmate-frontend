import React, { useState } from 'react';

const AddParkingSpot = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/parking-spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location }),
    });
    if (response.ok) {

      console.log('Parking Spot Added');
    } else {
      console.error('Failed to add parking spot');
    }
  };

  return (
    <div className="add-parking-spot">
      <h2>Add Parking Spot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Parking Spot Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Spot</button>
      </form>
    </div>
  );
};

export default AddParkingSpot;
