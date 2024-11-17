// src/components/Register.jsx
import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState(''); // For Full Name
  const [email, setEmail] = useState(''); // For Email
  const [password, setPassword] = useState(''); // For Password
  const [confirmPassword, setConfirmPassword] = useState(''); // For Confirm Password
  const [role, setRole] = useState('user'); // Default to 'user' role (if needed)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add your registration logic here (e.g., API call for registration)
    console.log('Registered with:', { name, email, password, role });
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg mt-20">
    <div className="grid place-items-center min-h-screen bg-white">
      <div className="register-container w-full max-w-md px-6 sm:px-8">
        <h2 className="text-3xl font-bold text-center text-[#FFBB00] mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#FFBB00] text-white text-lg font-semibold py-3 hover:bg-yellow-600 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#FFBB00] font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  </div>
  );
};

export default Register;
