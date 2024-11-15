// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full h-[76px] bg-white shadow-md">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-[#ffbb00] text-[24px] sm:text-[32px] font-extrabold font-poppins">
            Park
          </span>
          <span className="text-black text-[24px] sm:text-[32px] font-bold font-poppins">
            Mate
          </span>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-[#494949] focus:outline-none"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Navigation Links for Desktop */}
        <div className="hidden sm:flex items-center space-x-8">
          <Link
            to="/reserve-spot"
            className="text-[#2f3a3b] text-[17px] font-semibold hover:text-[#ffbb00] transition"
          >
            Reserve a Spot
          </Link>
          <Link
            to="/my-reservations"
            className="text-[#2f3a3b] text-[17px] font-normal hover:text-[#ffbb00] transition"
          >
            My Reservations
          </Link>
          <Link
            to="/about"
            className="text-[#2f3a3b] text-[17px] font-normal hover:text-[#ffbb00] transition"
          >
            About ParkMate
          </Link>
        </div>

        {/* Authentication Buttons for Desktop */}
        <div className="hidden sm:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-[#494949] text-[17px] font-normal hover:text-[#ffbb00] transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="w-[108px] h-[48px] flex items-center justify-center rounded-[10px] border border-[#ffbb00] text-[#ffbb00] text-[17px] font-semibold hover:bg-[#ffbb00] hover:text-white transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg">
          <div className="flex flex-col items-start px-6 py-4 space-y-2">
            <Link
              to="/reserve-spot"
              className="text-[#2f3a3b] text-[17px] font-semibold hover:text-[#ffbb00] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Reserve a Spot
            </Link>
            <Link
              to="/my-reservations"
              className="text-[#2f3a3b] text-[17px] font-normal hover:text-[#ffbb00] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              My Reservations
            </Link>
            <Link
              to="/about"
              className="text-[#2f3a3b] text-[17px] font-normal hover:text-[#ffbb00] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About ParkMate
            </Link>
            <Link
              to="/login"
              className="text-[#494949] text-[17px] font-normal hover:text-[#ffbb00] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="w-full flex items-center justify-center rounded-[10px] border border-[#ffbb00] text-[#ffbb00] text-[17px] font-semibold hover:bg-[#ffbb00] hover:text-white transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
