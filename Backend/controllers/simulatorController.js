const SensorData = require('../models/sensorModel');

let sensorInterval = null;

exports.startSimulator = (io) => async (req, res) => {
  if (sensorInterval) {
    return res.status(400).json({ message: 'Simulator already running' });
  }

  sensorInterval = setInterval(async () => {
    const temperature = parseFloat((Math.random() * 100).toFixed(2));
    const humidity = parseFloat((Math.random() * 100).toFixed(2));

    const newSensorData = new SensorData({ temperature, humidity });
    await newSensorData.save();

    io.emit('sensorData', {
      temperature,
      humidity,
      timestamp: newSensorData.createdAt || new Date(),
    });
  }, Math.random() * (2000 - 1000) + 1000); // 1–2 second random interval

  res.status(200).json({ message: 'Simulator started' });
};

exports.stopSimulator = async (req, res) => {
  if (!sensorInterval) {
    return res.status(400).json({ message: 'Simulator not running' });
  }

  clearInterval(sensorInterval);
  sensorInterval = null;

  res.status(200).json({ message: 'Simulator stopped' });
};
