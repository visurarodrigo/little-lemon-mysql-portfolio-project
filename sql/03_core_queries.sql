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

