const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const secret = process.env.JWT_SECRET;

  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = ({ code: 'missingAuthToken' });
      return next(error);
    }
    const decoded = jwt.verify(token, secret);
    req.user = {
      email: decoded.data.email,
    };
    next();
  } catch (err) {
      return res.status(401).json({
        message: 'Expired or invalid token',
      });
  }
};