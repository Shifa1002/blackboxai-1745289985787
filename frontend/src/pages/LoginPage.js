import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLockAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Invoice Manager Login</h2>
        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 flex items-center">
              <FaUserAlt className="mr-2 text-blue-600" /> Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 flex items-center">
              <FaLockAlt className="mr-2 text-blue-600" /> Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
