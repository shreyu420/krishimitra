function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
}

module.exports = { notFoundHandler, errorHandler };
