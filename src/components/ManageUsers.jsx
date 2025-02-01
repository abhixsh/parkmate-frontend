import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:8080/parkmate/user';

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Error fetching users: ${response.statusText}`);
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                setError('Invalid response format from server');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to fetch users');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError(`Error deleting user: ${err.message}`);
        }
    };

    return (
        <div className="manage-users bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 md:p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Manage Users</h2>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-r-lg animate-fadeIn">
                    {error}
                </div>
            )}

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-700 mb-6">Existing Users</h3>
                <div className="space-y-4">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user.id}
                                className="flex flex-col md:flex-row md:justify-between md:items-center p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition-all duration-300"
                            >
                                <div className="space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
                                    <span className="font-semibold text-gray-800">{user.fullName}</span>
                                    <span className="text-gray-500">|</span>
                                    <span className="text-gray-600">{user.email}</span>
                                    <span className="text-gray-500">|</span>
                                    <span className="text-gray-600">{user.phoneNumber}</span>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No users available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
