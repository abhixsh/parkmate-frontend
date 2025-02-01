import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome, Admin</h1>
          <p className="text-gray-600 mt-2">Here's what's happening today</p>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Parking Management</h2>
              <p className="text-gray-600 mb-6">Add, edit, or remove parking spots</p>
              <Link 
                to="/manage-parking-spots" 
                className="inline-block px-6 py-3 bg-[#FFBB00] text-white rounded-lg hover:bg-[#E5A800] transition-colors duration-300"
              >
                Manage Spots
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reservation Control</h2>
              <p className="text-gray-600 mb-6">View and manage current reservations</p>
              <Link 
                to="/manage-reservations" 
                className="inline-block px-6 py-3 bg-[#FFBB00] text-white rounded-lg hover:bg-[#E5A800] transition-colors duration-300"
              >
                View Reservations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
