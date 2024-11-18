import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user' role

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call for login)
    console.log('Logged in with:', { email, password, role });
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg mt-10 mb-10"> {/* Added mb-24 for bottom margin */}
  <h2 className="text-3xl font-bold text-center text-[#FFBB00] mb-6">
    Welcome to ParkMate
  </h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Email Input */}
    <div>
      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
        Email Address:
      </label>
      <input
        type="email"
        id="email"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    {/* Password Input */}
    <div>
      <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
        Password:
      </label>
      <input
        type="password"
        id="password"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    {/* Login Button */}
    <button
      type="submit"
      className="w-full bg-[#FFBB00] text-white text-lg font-semibold py-3 rounded-md hover:bg-yellow-600 transition"
    >
      Login
    </button>
  </form>

  <p className="mt-6 text-center text-gray-500 text-sm">
    New to ParkMate?{" "}
    <a
      href="/register"
      className="text-[#FFBB00] font-medium hover:underline"
    >
      Sign up
    </a>
  </p>
</div>


  );
};

export default Login;
