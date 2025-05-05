const express = require('express');
const router = express.Router();

// Import the controller functions
const { saveFlow, getFlow, addNode, deleteNode } = require('../controllers/flowController');

// Middleware for authentication (if needed)
// const authToken = require('../middleware/authToken');

// Save or Update Flow
router.post('/save', saveFlow);

// Get Flow
router.get('/:userId', getFlow);

// Add a new node to the flow
router.post('/add-node', addNode);

// Delete a node from the flow
router.post('/delete-node', deleteNode);

module.exports = router;
