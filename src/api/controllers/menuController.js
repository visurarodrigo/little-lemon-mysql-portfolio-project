/**
 * Menu Items Controller
 * Handles all menu-related operations
 */

const pool = require('../db/connection');

// Get all menu items
const getMenuItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM menu_items';
    const params = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY category, item_name';

    const connection = await pool.getConnection();
    const [items] = await connection.query(query, params);
    connection.release();

    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Get menu item by ID
const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [item] = await connection.query(
      'SELECT * FROM menu_items WHERE item_id = ?',
      [id]
    );
    connection.release();

    if (item.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json(item[0]);
  } catch (error) {
    next(error);
  }
};

// Create new menu item
const createMenuItem = async (req, res, next) => {
  try {
    const { item_name, category, cost, ingredients } = req.body;

    if (!item_name || !category || cost === undefined) {
      return res.status(400).json({ error: 'item_name, category, and cost are required' });
    }

    const validCategories = ['Starter', 'Main', 'Dessert', 'Drink'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: `Invalid category. Must be one of: ${validCategories.join(', ')}` });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO menu_items (item_name, category, cost, ingredients) VALUES (?, ?, ?, ?)',
      [item_name, category, cost, ingredients || null]
    );
    connection.release();

    res.status(201).json({
      item_id: result.insertId,
      item_name,
      category,
      cost,
      ingredients: ingredients || null
    });
  } catch (error) {
    next(error);
  }
};

// Update menu item
const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { item_name, category, cost, ingredients } = req.body;

    if (category && !['Starter', 'Main', 'Dessert', 'Drink'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `UPDATE menu_items
       SET item_name = COALESCE(?, item_name),
           category = COALESCE(?, category),
           cost = COALESCE(?, cost),
           ingredients = COALESCE(?, ingredients)
       WHERE item_id = ?`,
      [item_name, category, cost, ingredients, id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json({ message: 'Menu item updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete menu item
const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'DELETE FROM menu_items WHERE item_id = ?',
      [id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
