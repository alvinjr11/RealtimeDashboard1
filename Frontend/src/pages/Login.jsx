import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // adjust path as needed
import { toast } from 'react-toastify';
import SummaryApi from '../commen';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
  
    try {
      const res = await fetch(SummaryApi.login.url, {
        method: SummaryApi.login.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include', // Important for sending cookies
      });
  
      const data = await res.json();
  
      if (data.success) {
        toast.success(data.message || 'Login successful');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Login error');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;