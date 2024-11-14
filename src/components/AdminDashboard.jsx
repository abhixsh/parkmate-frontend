import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    async function fetchParkingSpots() {
      const response = await fetch("http://localhost:5050/parkingSpots");
      if (response.ok) {
        const data = await response.json();
        setParkingSpots(data);
      }
    }
    fetchParkingSpots();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5050/parkingSpots/${id}`, {
      method: "DELETE",
    });
    setParkingSpots(parkingSpots.filter((spot) => spot._id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
      <Link to="/create" className="text-blue-500">Add New Parking Spot</Link>
      <ul className="mt-4">
        {parkingSpots.map((spot) => (
          <li key={spot._id} className="border-b p-4 flex justify-between">
            <div>Spot {spot.number} - {spot.available ? "Available" : "Reserved"}</div>
            <button onClick={() => handleDelete(spot._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
