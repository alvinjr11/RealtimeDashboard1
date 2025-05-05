import React from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const SimulatorControl = () => {
  const start = async () => {
    try {
      await api.post('/simulator/start');
      toast.success('Simulator started');
    } catch (err) {
      toast.error('Failed to start simulator');
    }
  };

  const stop = async () => {
    try {
      await api.post('/simulator/stop');
      toast.success('Simulator stopped');
    } catch (err) {
      toast.error('Failed to stop simulator');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 ">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Real-Time Sensor Control</h2>

    <div className="flex space-x-6">
      <button
        onClick={start}
        className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-7 py-3.5 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300"

      >
        <span className="font-semibold">Start Simulator</span>
      </button>
      
      <button
        onClick={stop}
       className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white px-7 py-3.5 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <span className="font-semibold">Stop Simulator</span>
      </button>
    </div>

    <div className="mt-8 text-sm text-gray-600">
      <p>Control the sensor simulation and view live data on the charts. Press 'Start' to begin streaming data.</p>
    </div>
  </div>
  );
};

export default SimulatorControl;
