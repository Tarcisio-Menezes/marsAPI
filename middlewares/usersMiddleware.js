module.exports = (err, _req, res, next) => {
  if (err.isJoi) return res.status(400).json({ message: err.details[0].message });

  if (err.code === 'conflict') {
    return res.status(409).json({ message: 'User already registered' });
  }

  if (err.code === 'invalidEmail') {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (err.code === 'invalidPass') {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  
  return next(err);
};
