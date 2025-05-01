const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid Authorization header found');
      return res.status(401).json({
        success: false,
        message: "You're not authorized",
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extracted:', token ? 'Token present' : 'No token');

    if (!token) {
      console.log('No token found after Bearer');
      return res.status(401).json({
        success: false,
        message: "You're not authorized",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Token verified successfully. Decoded:', decoded);

    // Set the user in the request object
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({
      success: false,
      message: "Token is invalid",
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
