// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar
      <div className="w-64 bg-[#1A202C] text-white py-8 px-6">
        <h2 className="text-3xl font-semibold text-center text-[#FFBB00] mb-8">Admin Dashboard</h2>
        <ul>
          <li className="mb-6">
            <Link 
              to="/manage-parking-spots" 
              className="block py-3 px-4 text-lg font-medium text-gray-300 hover:bg-[#FFBB00] hover:text-white rounded-md transition duration-300"
            >
              Manage Parking Spots
            </Link>
          </li>
          <li className="mb-6">
            <Link 
              to="/manage-reservations" 
              className="block py-3 px-4 text-lg font-medium text-gray-300 hover:bg-[#FFBB00] hover:text-white rounded-md transition duration-300"
            >
              Manage Reservations
            </Link>
          </li>
        </ul>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to the Admin Dashboard</h1>
          <p className="text-gray-600 text-lg mb-8">Manage your parking spots and reservations from here.</p>

          {/* Main Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Manage Parking Spots Card */}
            <div className="bg-[#FFBB00] text-white p-8 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4">Manage Parking Spots</h2>
              <Link 
                to="/manage-parking-spots" 
                className="block w-full py-3 text-lg font-medium text-white text-center bg-[#2a2f37] hover:bg-[#1c1c1c] rounded-md transition duration-200"
              >
                Go to Parking Spots
              </Link>
            </div>

            {/* Manage Reservations Card */}
            <div className="bg-[#FFBB00] text-white p-8 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4">Manage Reservations</h2>
              <Link 
                to="/manage-reservations" 
                className="block w-full py-3 text-lg font-medium text-white text-center bg-[#2a2f37] hover:bg-[#1c1c1c] rounded-md transition duration-200"
              >
                Go to Reservations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
