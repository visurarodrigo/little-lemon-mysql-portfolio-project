-- task 4

USE little_lemon_portfolio;

UPDATE menu_items
SET cost = 1500.00
WHERE item_name = 'Chicken Kottu';

SELECT item_name, cost
FROM menu_items
WHERE item_name = 'Chicken Kottu';

-- task 5

INSERT INTO delivery_addresses (address, address_type, customer_id) VALUES
('No. 12, Galle Road, Colombo 03', 'Home', 1),
('No. 90, Nawam Mawatha, Colombo 02', 'Work', 2),
('No. 5, Temple Road, Dehiwala', 'Other', 1);

SELECT * FROM delivery_addresses;

SHOW COLUMNS FROM delivery_addresses;

-- task 6

ALTER TABLE menu_items
ADD COLUMN is_available BOOLEAN NOT NULL DEFAULT TRUE;

SHOW COLUMNS FROM menu_items;



