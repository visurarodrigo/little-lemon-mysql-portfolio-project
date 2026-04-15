/**
 * Bookings Controller
 * Handles all booking/reservation operations
 */

const pool = require('../db/connection');

// Get all bookings
const getBookings = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const [bookings] = await connection.query(
      `SELECT b.*, c.full_name, c.phone, dt.seating_capacity
       FROM bookings b
       JOIN customers c ON b.customer_id = c.customer_id
       JOIN dining_tables dt ON b.table_number = dt.table_number
       ORDER BY b.booking_date DESC, b.booking_time DESC`
    );
    connection.release();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// Get booking by ID
const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [booking] = await connection.query(
      `SELECT b.*, c.full_name, c.phone, dt.seating_capacity
       FROM bookings b
       JOIN customers c ON b.customer_id = c.customer_id
       JOIN dining_tables dt ON b.table_number = dt.table_number
       WHERE b.booking_id = ?`,
      [id]
    );
    connection.release();

    if (booking.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking[0]);
  } catch (error) {
    next(error);
  }
};

// Create new booking
const createBooking = async (req, res, next) => {
  try {
    const { booking_date, booking_time, table_number, number_of_guests, customer_id } = req.body;

    if (!booking_date || !booking_time || !table_number || !number_of_guests || !customer_id) {
      return res.status(400).json({ error: 'All booking fields are required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO bookings (booking_date, booking_time, table_number, number_of_guests, customer_id)
       VALUES (?, ?, ?, ?, ?)`,
      [booking_date, booking_time, table_number, number_of_guests, customer_id]
    );
    connection.release();

    res.status(201).json({
      booking_id: result.insertId,
      booking_date,
      booking_time,
      table_number,
      number_of_guests,
      customer_id
    });
  } catch (error) {
    next(error);
  }
};

// Update booking
const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { booking_date, booking_time, table_number, number_of_guests } = req.body;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `UPDATE bookings
       SET booking_date = COALESCE(?, booking_date),
           booking_time = COALESCE(?, booking_time),
           table_number = COALESCE(?, table_number),
           number_of_guests = COALESCE(?, number_of_guests)
       WHERE booking_id = ?`,
      [booking_date, booking_time, table_number, number_of_guests, id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete booking
const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'DELETE FROM bookings WHERE booking_id = ?',
      [id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};
