import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
});

const SensorChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('sensorData', (sensorData) => {
      setData((prev) => [...prev.slice(-19), sensorData]); // keep latest 20 points
    });

    return () => {
      socket.off('sensorData');
    };
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-gray-200 to-gray-400 rounded-3xl shadow-2xl max-w-6xl mx-auto mt-12 border border-gray-200">
    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">
      📡 Live Sensor Dashboard
    </h2>
    <p className="text-center text-gray-500 mb-8">
      Real-time temperature and humidity readings updated every few seconds.
    </p>
  
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            tick={{ fill: '#555', fontSize: 12 }}
          />
          <YAxis tick={{ fill: '#555', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: 'white', borderRadius: 10, borderColor: '#ccc' }}
            labelFormatter={(label) =>
              `Time: ${new Date(label).toLocaleTimeString()}`
            }
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ef4444"
            strokeWidth={3}
            name="🌡️ Temperature (°C)"
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#3b82f6"
            strokeWidth={3}
            name="💧 Humidity (%)"
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
};

export default SensorChart;
