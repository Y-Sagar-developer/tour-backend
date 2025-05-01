const express = require('express');
const { login, register } = require('../controller/authController');

const router = express.Router();

// Test route for connectivity
router.get('/test', (req, res) => {
  try {
    console.log('Test endpoint hit');
    res.json({ 
      success: true, 
      message: 'Auth route is working!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Handle OPTIONS requests for all routes
router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' 
    ? 'https://tour-management-frontend-iota.vercel.app'
    : '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.status(204).end();
});

// Registration route
router.post('/register', async (req, res, next) => {
  try {
    console.log('Register request received:', req.body);
    await register(req, res, next);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed',
      error: error.message 
    });
  }
});

router.post('/login', login);

module.exports = router;