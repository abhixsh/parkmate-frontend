// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/manage-parking-spots">Manage Parking Spots</Link>
        <Link to="/manage-reservations">Manage Reservations</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
