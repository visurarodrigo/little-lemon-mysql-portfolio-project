-- 01_schema.sql
USE little_lemon_portfolio;

-- Customers
CREATE TABLE customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name   VARCHAR(100) NOT NULL,
  phone       VARCHAR(15)  NOT NULL UNIQUE
);

-- Tables in the restaurant 
CREATE TABLE dining_tables (
  table_number INT PRIMARY KEY,
  seating_capacity INT NOT NULL CHECK (seating_capacity > 0)
);

-- Bookings (reservation)
CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  table_number INT NOT NULL,
  number_of_guests INT NOT NULL CHECK (number_of_guests > 0),
  customer_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_bookings_customer
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT fk_bookings_table
    FOREIGN KEY (table_number) REFERENCES dining_tables(table_number)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Courses / Menu items
CREATE TABLE menu_items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL UNIQUE,
  category ENUM('Starter','Main','Dessert','Drink') NOT NULL,
  cost DECIMAL(6,2) NOT NULL CHECK (cost >= 0),
  ingredients VARCHAR(255) NULL
);

-- Delivery addresses 
CREATE TABLE delivery_addresses (
  address_id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(255) NOT NULL,
  address_type ENUM('Home','Work','Other') NOT NULL,
  customer_id INT NOT NULL,

  CONSTRAINT fk_delivery_customer
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

-- Audit table for deleted bookings
CREATE TABLE booking_audit (
    audit_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    booking_date DATE,
    booking_time TIME,
    table_number INT,
    number_of_guests INT,
    customer_id INT,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Helpful indexes for performance
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
