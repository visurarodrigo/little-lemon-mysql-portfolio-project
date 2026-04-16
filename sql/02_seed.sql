USE little_lemon_portfolio;

INSERT INTO customers (full_name, phone) VALUES
('Nadeesha Perera', '0712345678'),
('Kasun Fernando', '0723456789'),
('Ishara Wijesinghe', '0774567890'),
('Tharushi Jayawardena', '0765678901'),
('Dilan Senanayake', '0756789012'),
('Malithi Gunawardena', '0747890123'),
('Ravindu Karunaratne', '0788901234'),
('Sashini Abeysekara', '0709012345'),
('Chamath de Silva', '0711122233');

INSERT INTO dining_tables (table_number, seating_capacity) VALUES
(1, 2),
(2, 4),
(3, 4),
(4, 6),
(5, 2),
(6, 4),
(7, 6);

INSERT INTO bookings (booking_date, booking_time, table_number, number_of_guests, customer_id) VALUES
('2021-11-10', '18:00:00', 7, 5, 1),
('2021-11-10', '19:00:00', 5, 2, 2),
('2021-11-10', '20:00:00', 3, 2, 4),

('2021-11-11', '18:00:00', 2, 4, 5),
('2021-11-11', '19:00:00', 5, 2, 6),
('2021-11-11', '20:00:00', 3, 2, 7),
('2021-11-11', '21:00:00', 4, 5, 1);

INSERT INTO menu_items (item_name, category, cost, ingredients) VALUES
('Pol Sambol Salad', 'Starter', 50.00, 'Coconut, chili, lime, onion'),
('Parippu Soup', 'Starter', 60.00, 'Red lentils, garlic, curry leaves'),
('String Hopper Kottu', 'Main', 750.00, 'String hoppers, vegetables, egg, spices'),
('Seafood Rice & Curry', 'Main', 1150.00, 'Rice, fish curry, dhal, mallung'),
('Chicken Kottu', 'Main', 950.00, 'Godamba roti, chicken, vegetables, spices'),
('Chicken Shawarma', 'Main', 700.00, 'Chicken, garlic sauce, pita bread');




