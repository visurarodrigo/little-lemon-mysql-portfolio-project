-- task 9

USE little_lemon_portfolio;

DROP PROCEDURE IF EXISTS GetBookingsData;

DELIMITER $$

CREATE PROCEDURE GetBookingsData(IN InputDate DATE)
BEGIN
  SELECT *
  FROM bookings
  WHERE booking_date = InputDate
  ORDER BY booking_time;
END $$

DELIMITER ;

CALL GetBookingsData('2021-11-11');

-- task 10

SELECT
  CONCAT(
    'ID: ', booking_id,
    ', Date: ', booking_date,
    ', Number of guests: ', number_of_guests
  ) AS `Booking Details`
FROM bookings
ORDER BY booking_date, booking_time;

