const jwt = require('jsonwebtoken');
const secretKey = 'Sidharth'


const jwtauth = (req, res, next) => {
    const token = req.query.auth;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }
      req.user = user;
      next();
    });
}

module.exports = jwtauth;