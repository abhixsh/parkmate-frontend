import { useEffect, useState } from "react";

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      const response = await fetch("http://localhost:5050/reservations");
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    }
    fetchReservations();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">My Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id} className="border-b p-4">
            Spot {reservation.spotNumber}, Reserved on {reservation.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
