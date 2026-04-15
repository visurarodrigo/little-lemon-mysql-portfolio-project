/**
 * Database Connection Module
 * Establishes and exports a MySQL connection pool using environment variables
 */

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'lemon_user',
  password: process.env.MYSQL_PASSWORD || 'lemon_pass',
  database: process.env.MYSQL_DATABASE || 'little_lemon_portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✓ MySQL connection pool established');
    connection.release();
  } catch (error) {
    console.error('✗ Failed to connect to MySQL:', error.message);
    process.exit(1);
  }
})();

module.exports = pool;
