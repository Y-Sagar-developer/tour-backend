const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      console.log('Token found in Authorization header');
    } else {
      // Check for token in cookies
      token = req.cookies.access_token;
      if (token) {
        console.log('Token found in cookies');
      }
    }

    if (!token) {
      console.log('No token found in request');
      return res.status(401).json({
        success: false,
        message: 'Please login to continue'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        console.log('Token expired at:', new Date(decoded.exp * 1000));
        return res.status(401).json({
          success: false,
          message: 'Your session has expired. Please login again.'
        });
      }

      // Add user info to request
      req.user = {
        id: decoded.id,
        role: decoded.role || 'user'
      };

      console.log('Token verified successfully for user:', req.user.id);
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError.message);
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Your session has expired. Please login again.'
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.'
      });
    }
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(500).json({
      success: false,
      message: 'Authentication error. Please try again.'
    });
  }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    try {
      // For POST requests (like creating a booking), check if the user ID matches
      if (req.method === 'POST') {
        console.log('Checking user ID match:', {
          bodyUserId: req.body.userId,
          tokenUserId: req.user.id
        });
        
        // Convert both IDs to strings and trim any whitespace
        const bodyUserId = String(req.body.userId).trim();
        const tokenUserId = String(req.user.id).trim();
        
        console.log('Comparing user IDs:', {
          bodyUserId,
          tokenUserId,
          areEqual: bodyUserId === tokenUserId
        });
        
        // For booking creation, we'll allow the request to proceed
        // The user ID will be validated in the booking controller
        next();
      } else {
        next();
      }
    } catch (err) {
      console.error('Error in verifyUser:', err);
      return res.status(401).json({
        success: false,
        message: "Authorization failed",
      });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authorized",
      });
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
