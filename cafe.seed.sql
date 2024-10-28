INSERT INTO cafe (id, name, description, location) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Cafe Mocha', 'A cozy place for coffee lovers', '123 Coffee St.'),
('550e8400-e29b-41d4-a716-446655440001', 'Java House', 'Best espresso in town', '456 Java Ave.'),
('550e8400-e29b-41d4-a716-446655440002', 'Brewed Awakenings', 'Wake up with our fresh brews', '789 Brew Blvd.'),
('550e8400-e29b-41d4-a716-446655440003', 'Cafe Latte', 'Delicious lattes and pastries', '101 Latte Ln.'),
('550e8400-e29b-41d4-a716-446655440004', 'Espresso Express', 'Quick and tasty espresso', '202 Espresso Rd.');

-- Seed data for employee table
INSERT INTO employee (id, name, email_address, phone_number, gender, start_date, cafe_id) VALUES
('UI12a45b78', 'John Doe', 'john.doe@example.com', '123-456-7890', 'male', '01/01/2024', '550e8400-e29b-41d4-a716-446655440000'),
('UI234b6c89', 'Jane Smith', 'jane.smith@example.com', '234-567-8901', 'female', '02/02/2024', '550e8400-e29b-41d4-a716-446655440001'),
('UI3c567d90', 'Alice Johnson', 'alice.johnson@example.com', '345-678-9012', 'female', '03/03/2024', '550e8400-e29b-41d4-a716-446655440002'),
('UI456d89e1', 'Bob Brown', 'bob.brown@example.com', '456-789-0123', 'male', '04/04/2024', '550e8400-e29b-41d4-a716-446655440003'),
('UI567f90e2', 'Charlie Davis', 'charlie.davis@example.com', '567-890-1234', 'male', '05/05/2024', '550e8400-e29b-41d4-a716-446655440004');