-- task 7

USE little_lemon_portfolio;

SELECT full_name
FROM customers
WHERE customer_id IN (
    SELECT customer_id
    FROM bookings
    WHERE booking_date = '2021-11-11'
);

-- task 8

CREATE OR REPLACE VIEW bookings_view AS
SELECT
  booking_id,
  booking_date,
  number_of_guests
FROM bookings
WHERE booking_date < '2021-11-13'
  AND number_of_guests > 3;
  
  SELECT * FROM bookings_view
ORDER BY booking_date, booking_id;


