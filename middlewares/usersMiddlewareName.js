module.exports = (err, _req, res, _next) => {
  if (err.code === 'invalidName') {
    return res.status(400).json({ message: '"name" length must be at least 8 characters long' });
  }

  return res.status(500).json({ message: 'Critcal Error :(' });
};
