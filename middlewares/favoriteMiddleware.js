module.exports = (err, _req, res, _next) => {
  if (err.isJoi) return res.status(400).json({ message: err.details[0].message });

  if (err.code === 'missingAuthToken') {
    return res.status(401).json({ message: 'Token not found' });
  }

  if (err.code === 'Unauthorized') {
    return res.status(401).json({ message: 'User not corresponding' });
  }

  return res.status(500).json({ message: 'Critical Error :(' });
};
