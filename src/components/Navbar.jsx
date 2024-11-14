import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="p-4">
      <nav className="w-full max-w-[1395px] bg-white rounded shadow flex items-center justify-between px-5 mx-auto">
        <NavLink to="/" className="text-3xl font-bold">Parking</NavLink>
        <div className="flex space-x-8">
          <NavLink to="/create" className="font-bold">Reservation Form</NavLink>
          <NavLink to="/reservations" className="font-bold">Reservations</NavLink>
          <NavLink to="/about" className="font-bold">About Us</NavLink>
        </div>
      </nav>
    </div>
  );
}
