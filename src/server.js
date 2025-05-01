const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const tourRoutes = require('./routes/tourRoutes');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');

// Load environment variables
dotenv.config();

// Set environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key123456789';

console.log('Current environment:', process.env.NODE_ENV);
console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('Server will run on port:', process.env.PORT || 4000);

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tour-frontend-snowy.vercel.app']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'X-CSRF-Token'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Add cookie parser before routes
app.use(cookieParser());
app.use(express.json());

// Extra logging for all requests
app.use((req, res, next) => {
  console.log('Request:', {
    method: req.method,
    path: req.path,
    body: req.body,
    cookies: req.cookies,
    headers: req.headers,
    environment: process.env.NODE_ENV
  });
  next();
});

// Mount routes with /api/v1 prefix
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: err.message 
  });
});

// 404 handler - must be after all routes
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.path);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tour-management';
    console.log('Attempting to connect to MongoDB at:', mongoURI);
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Don't exit the process, just log the error
    console.log('Server will continue running without MongoDB connection');
  }
};

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test endpoint available at: http://localhost:${PORT}/api/v1/auth/test`);
  
  // Connect to MongoDB after server starts
  connectDB();
}); 