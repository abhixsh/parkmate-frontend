import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="w-full h-[76px] bg-white shadow-md relative z-50">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-[#ffbb00] text-[24px] sm:text-[32px] font-extrabold font-poppins">
            Park
          </span>
          <span className="text-black text-[24px] sm:text-[32px] font-extrabold font-poppins">
            Mate
          </span>
        </Link>

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

        <div className="hidden sm:flex items-center space-x-8">
          <Link
            to="/reservation"
            className="text-[#2f3a3b] text-[17px] font-normal hover:text-[#ffbb00] transition"
          >
            Reserve a Spot
          </Link>
          <Link
            to="/info"
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

        <div className="hidden sm:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-[#494949] text-[17px] font-normal">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="w-[108px] h-[48px] flex items-center justify-center rounded-[10px] border border-[#ffbb00] text-[#ffbb00] text-[17px] font-semibold hover:bg-[#ffbb00] hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#494949] text-[17px] font-normal hover:text-[#ffbb00] transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="w-[108px] h-[48px] flex items-center justify-center rounded-[10px] border border-[#ffbb00] text-[#ffbb00] text-[17px] font-semibold hover:bg-[#ffbb00] hover:text-white transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-[76px] left-0 w-full bg-white shadow-lg z-50">
          <div className="flex flex-col items-start px-6 py-4 space-y-2">
            <Link
              to="/reservation"
              className="block w-full py-2 px-3 text-[#2f3a3b] text-[17px] font-semibold hover:text-[#ffbb00] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Reserve a Spot
            </Link>
            <Link
              to="/info"
              className="block w-full py-2 px-3 text-[#2f3a3b] text-[17px] font-normal hover:text-[#ffbb00] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              My Reservations
            </Link>
            <Link
              to="/about"
              className="block w-full py-2 px-3 text-[#2f3a3b] text-[17px] font-normal hover:text-[#ffbb00] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About ParkMate
            </Link>
            {user ? (
              <>
                <span
                  className="block w-full py-2 px-3 text-[#494949] text-[17px] font-normal"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="block w-full py-2 px-3 text-[#ffbb00] text-[17px] font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full py-2 px-3 text-[#494949] text-[17px] font-normal hover:text-[#ffbb00] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block w-full py-2 px-3 text-[#ffbb00] text-[17px] font-semibold border border-[#ffbb00] rounded-md hover:text-white hover:bg-[#ffbb00] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
