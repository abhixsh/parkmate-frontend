import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: '', 
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            setLoading(false);
            return;
        }

        const adminData = {
            email: formData.email,
            password: formData.password,
            role: formData.role,
        };

        try {
            const response = await fetch('http://localhost:8080/parkmate/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(adminData),
            });

            const responseText = await response.text();

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (err) {
                console.error('Failed to parse response:', responseText);
                throw new Error('Invalid response from server');
            }

            if (response.ok) {
                navigate('/admin/login');
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-lg bg-white rounded-lg shadow-lg mt-10 mb-10">
            <div className="grid place-items-center min-h-screen bg-white">
                <div className="register-container w-full max-w-md px-6 sm:px-8">
                    <h2 className="text-3xl font-bold text-center text-[#FFBB00] mb-6">
                        Create Admin Account
                    </h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Role Input (Dropdown) */}
                        <div>
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="role"
                            >
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            >
                                <option value="">Select a role</option>
                                <option value="Admin">Admin</option>
                                <option value="SuperAdmin">SuperAdmin</option>
                            </select>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={6}
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={6}
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#FFBB00] text-white text-lg font-semibold py-3 rounded-md hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
