import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddParkingSpot() {
  const [form, setForm] = useState({ number: "", availability: "Available" });
  const navigate = useNavigate();

  const updateForm = (value) => setForm({ ...form, ...value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5050/parkingSpots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/reservations");
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg mt-20">
      <h3 className="text-2xl font-semibold text-center mb-6">Add a New Parking Spot</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg">Spot Number</label>
          <input
            type="text"
            value={form.number}
            onChange={(e) => updateForm({ number: e.target.value })}
            required
            className="p-3 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md">Add Spot</button>
      </form>
    </div>
  );
}
