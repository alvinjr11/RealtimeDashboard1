// routes/simulatorRoutes.js
const express = require('express');
const router = express.Router();
const simulatorController = require('../controllers/simulatorController');

module.exports = (io) => {
  router.post('/start', simulatorController.startSimulator(io));
  router.post('/stop', simulatorController.stopSimulator);
  return router;
};