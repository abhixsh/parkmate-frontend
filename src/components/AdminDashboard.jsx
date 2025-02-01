import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('admin'));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    } else {
      navigate('/admin/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  if (!admin) {
    return null; 
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Info</h2>
        <div className="text-gray-600 mb-6">
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Role:</strong> {admin.role}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome, {admin.role}</h1>
        </header>

        <div className="grid grid-cols-2 gap-8">
          {admin.role === 'SuperAdmin' && (
            <>
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
            </>
          )}

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

          {/* User Management Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Management</h2>
              <p className="text-gray-600 mb-6">View and manage current system users</p>
              <Link 
                to="/manage-users" 
                className="inline-block px-6 py-3 bg-[#FFBB00] text-white rounded-lg hover:bg-[#E5A800] transition-colors duration-300"
              >
                Manage Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
