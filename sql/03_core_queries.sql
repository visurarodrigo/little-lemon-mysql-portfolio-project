-- task 1

USE little_lemon_portfolio;

SELECT *
FROM bookings
WHERE booking_date BETWEEN '2021-11-11' AND '2021-11-13'
ORDER BY booking_date, booking_time;

-- task 2

SELECT
  c.full_name,
  b.booking_id
FROM customers c
JOIN bookings b
  ON c.customer_id = b.customer_id
WHERE b.booking_date = '2021-11-11'
ORDER BY b.booking_id;

-- task 3

SELECT
  booking_date,
  COUNT(*) AS total_bookings
FROM bookings
GROUP BY booking_date
ORDER BY booking_date;

-- task 3A - add a new customer

INSERT INTO customers (full_name, phone)
SELECT 'Nipun Lakmal', '0763344556'
WHERE NOT EXISTS (
  SELECT 1
  FROM customers
  WHERE phone = '0763344556'
);

SELECT customer_id, full_name, phone
FROM customers
WHERE phone = '0763344556';

-- task 3B - add a new menu item

INSERT INTO menu_items (item_name, category, cost, ingredients)
SELECT 'Watalappan', 'Dessert', 550.00, 'Coconut milk, jaggery, egg, cardamom'
WHERE NOT EXISTS (
  SELECT 1
  FROM menu_items
  WHERE item_name = 'Watalappan' AND category = 'Dessert'
);

SELECT item_id, item_name, category, cost
FROM menu_items
WHERE item_name = 'Watalappan' AND category = 'Dessert';

