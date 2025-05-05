import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api'; // adjust path based on your project structure
import SummaryApi from '../commen';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location?.state?.email || '');
  const [otp, setOTP] = useState('');

  useEffect(() => {
    if (!email) {
      toast.warning('Please signup first.');
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error('Please enter OTP');
  
    try {
      const res = await fetch(SummaryApi.verifyotp.url, {
        method: SummaryApi.verifyotp.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
        credentials: 'include', // send cookies if necessary
      });
  
      const data = await res.json();
  
      if (data.success) {
        toast.success(data.message || 'OTP verified');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(data.message || 'OTP verification failed');
      }
    } catch (err) {
      toast.error('OTP verification error');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center  text-indigo-600">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full   bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;