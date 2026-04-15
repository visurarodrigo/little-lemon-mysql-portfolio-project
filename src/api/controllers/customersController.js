/**
 * Customers Controller
 * Handles all customer-related operations
 */

const pool = require('../db/connection');

// Get all customers
const getCustomers = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const [customers] = await connection.query('SELECT * FROM customers');
    connection.release();
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

// Get customer by ID
const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [customer] = await connection.query(
      'SELECT * FROM customers WHERE customer_id = ?',
      [id]
    );
    connection.release();

    if (customer.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer[0]);
  } catch (error) {
    next(error);
  }
};

// Create new customer
const createCustomer = async (req, res, next) => {
  try {
    const { full_name, phone } = req.body;

    if (!full_name || !phone) {
      return res.status(400).json({ error: 'full_name and phone are required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO customers (full_name, phone) VALUES (?, ?)',
      [full_name, phone]
    );
    connection.release();

    res.status(201).json({
      customer_id: result.insertId,
      full_name,
      phone
    });
  } catch (error) {
    next(error);
  }
};

// Update customer
const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, phone } = req.body;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE customers SET full_name = COALESCE(?, full_name), phone = COALESCE(?, phone) WHERE customer_id = ?',
      [full_name, phone, id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete customer
const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'DELETE FROM customers WHERE customer_id = ?',
      [id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
