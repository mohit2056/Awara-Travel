const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Token nikalo
      token = req.headers.authorization.split(' ')[1];

      // 2. Token verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. User dhoondho
      const user = await User.findById(decoded.id).select('-password');

      // 🛡️ SAFETY CHECK: Agar user delete ho chuka hai, to yahi rok do
      if (!user) {
        return res.status(401).json({ message: 'User not found (Account deleted?)' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };