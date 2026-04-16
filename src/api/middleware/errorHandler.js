/**
 * Error Handling Middleware
 * Catches and formats errors for consistent API responses
 */

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // MySQL specific errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'Duplicate entry - resource already exists' });
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ error: 'Foreign key constraint violation' });
  }

  if (err.code === 'ER_NO_REFERENCED_ROW') {
    return res.status(404).json({ error: 'Referenced resource not found' });
  }

  // Trigger SIGNAL from SQLSTATE '45000' (e.g., duplicate booking rule)
  if (err.code === 'ER_SIGNAL_EXCEPTION' || err.sqlState === '45000') {
    return res.status(409).json({
      error: err.sqlMessage || err.message || 'Database business rule violation'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;
