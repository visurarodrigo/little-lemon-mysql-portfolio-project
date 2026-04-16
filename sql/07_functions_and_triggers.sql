-- task 11

DELIMITER $$

CREATE FUNCTION GetCustomerBookingCount(p_customer_id INT)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE total_bookings INT;

    SELECT COUNT(*)
    INTO total_bookings
    FROM bookings
    WHERE customer_id = p_customer_id;

    RETURN total_bookings;
END $$

DELIMITER ;

SELECT GetCustomerBookingCount(1) AS total_bookings;

-- task 12

DELIMITER $$

CREATE FUNCTION GetBookingsByDateCount(p_booking_date DATE)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE total_bookings INT;

    SELECT COUNT(*)
    INTO total_bookings
    FROM bookings
    WHERE booking_date = p_booking_date;

    RETURN total_bookings;
END $$

DELIMITER ;

SELECT GetBookingsByDateCount('2021-11-11') AS bookings_on_date;

-- task 13

DELIMITER $$

CREATE TRIGGER trg_after_delete_booking
AFTER DELETE ON bookings
FOR EACH ROW
BEGIN
    INSERT INTO booking_audit (
        booking_id,
        booking_date,
        booking_time,
        table_number,
        number_of_guests,
        customer_id
    )
    VALUES (
        OLD.booking_id,
        OLD.booking_date,
        OLD.booking_time,
        OLD.table_number,
        OLD.number_of_guests,
        OLD.customer_id
    );
END $$

DELIMITER ;

DELETE FROM bookings
WHERE booking_id = 1;

SELECT * FROM booking_audit;

-- task 14

DELIMITER $$

CREATE TRIGGER trg_prevent_duplicate_booking
BEFORE INSERT ON bookings
FOR EACH ROW
BEGIN
    DECLARE booking_exists INT;

    SELECT COUNT(*)
    INTO booking_exists
    FROM bookings
    WHERE booking_date = NEW.booking_date
      AND booking_time = NEW.booking_time
      AND table_number = NEW.table_number;

    IF booking_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'This table is already booked for the selected date and time.';
    END IF;
END $$

DELIMITER ;

INSERT INTO bookings (booking_date, booking_time, table_number, number_of_guests, customer_id)
VALUES ('2021-11-11', '18:00:00', 2, 4, 1);