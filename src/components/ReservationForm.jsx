import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReservationForm() {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [form, setForm] = useState({ spotNumber: "", date: "", time: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAvailableSpots() {
      const response = await fetch("http://localhost:5050/parkingSpots");
      if (response.ok) {
        const data = await response.json();
        setParkingSpots(data.filter((spot) => spot.available));
      }
    }
    fetchAvailableSpots();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5050/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/reservations");
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg mt-20">
      <h3 className="text-2xl font-semibold text-center mb-6">Reserve a Parking Spot</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg">Select Parking Spot</label>
          <select
            value={form.spotNumber}
            onChange={(e) => setForm({ ...form, spotNumber: e.target.value })}
            required
            className="p-3 border rounded-md"
          >
            <option value="" disabled>Select a spot</option>
            {parkingSpots.map((spot) => (
              <option key={spot._id} value={spot.number}>
                Spot {spot.number}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="p-3 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md">Reserve</button>
      </form>
    </div>
  );
}
