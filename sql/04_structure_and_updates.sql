-- task 4

USE little_lemon_portfolio;

UPDATE menu_items
SET cost = 20.50
WHERE item_name = 'Kabasa';

SELECT item_name, cost
FROM menu_items
WHERE item_name = 'Kabasa';

-- task 5

INSERT INTO delivery_addresses (address, address_type, customer_id) VALUES
('12 Lake Shore Dr, Chicago, IL', 'Home', 1),
('90 W Madison St, Chicago, IL', 'Work', 2),
('5 River North Ave, Chicago, IL', 'Other', 1);

SELECT * FROM delivery_addresses;

SHOW COLUMNS FROM delivery_addresses;

-- task 6

ALTER TABLE menu_items
ADD COLUMN is_available BOOLEAN NOT NULL DEFAULT TRUE;

SHOW COLUMNS FROM menu_items;



