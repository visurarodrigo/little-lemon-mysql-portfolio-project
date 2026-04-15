/**
 * Little Lemon REST API Server
 * Main entry point for the Express application
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import middleware
const errorHandler = require('./api/middleware/errorHandler');

// Import routes
const customersRoutes = require('./api/routes/customers');
const bookingsRoutes = require('./api/routes/bookings');
const menuRoutes = require('./api/routes/menu');

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running ✓' });
});

// API Routes
app.use('/api/customers', customersRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/menu', menuRoutes);

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Little Lemon Restaurant API',
    version: '1.0.0',
    endpoints: {
      customers: '/api/customers',
      bookings: '/api/bookings',
      menu: '/api/menu',
      health: '/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║  Little Lemon Restaurant API Server   ║`);
  console.log(`║  Running on: http://localhost:${PORT}      ║`);
  console.log(`║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(32)} ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
});

module.exports = app;
