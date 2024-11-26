// middleware.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  //const token = req.headers['authorization']?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    console.log("Token verified, userId:", req.userId);
    next();  // Proceed to the next route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
/*const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: 'Invalid token' });
      }
      req.userId = decoded.id; // Attach user ID from the token to the request
      next();
  });
};*/

module.exports = verifyToken;
