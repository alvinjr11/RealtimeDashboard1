require('dotenv').config();
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authroutes');
const simulatorRoutes = require('./routes/simulatorRoutes');
const connectDB = require('./config/db');
const flowRoutes = require('./routes/flowRoutes');

const app = express();
const server = http.createServer(app); // Needed for socket.io
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}))
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/simulator', simulatorRoutes(io)); // Pass io to simulator routes
app.use('/flow', flowRoutes);

// Connect to DB and start server
const PORT = 5000;
connectDB().then(() => {
  server.listen(PORT, () => { // 👈 Use server.listen here
    console.log("Connected to DB");
    console.log("Server is running on port " + PORT);
  });
});