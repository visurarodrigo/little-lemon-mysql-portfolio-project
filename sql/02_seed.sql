USE little_lemon_portfolio;

INSERT INTO customers (full_name, phone) VALUES
('Vanessa McCarthy', '0757536378'),
('Marcos Romero', '0757536379'),
('Hiroki Yamane', '0757536376'),
('Anna Iversen', '0757536375'),
('Diana Pinto', '0757536374'),
('Altay Ayhan', '0757636378'),
('Jane Murphy', '0753536379'),
('Laurina Delgado', '0754536376'),
('Mike Edwards', '0757236375');

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

('2021-11-11', '18:00:00', 2, 5, 5),
('2021-11-11', '19:00:00', 5, 2, 6),
('2021-11-11', '20:00:00', 3, 2, 7),
('2021-11-11', '21:00:00', 3, 5, 1);

INSERT INTO menu_items (item_name, category, cost, ingredients) VALUES
('Greek salad', 'Starter', 15.50, 'Tomato, cucumber, feta, olives'),
('Bean soup', 'Starter', 12.25, 'Beans, herbs, stock'),
('Pizza', 'Main', 15.00, 'Dough, tomato sauce, cheese'),
('Carbonara', 'Main', 12.50, 'Pasta, egg, cheese, pepper'),
('Kabasa', 'Main', 17.00, 'Sausage, spices'),
('Shwarma', 'Main', 11.30, 'Chicken, garlic sauce, pita');




