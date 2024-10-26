INSERT INTO cafe (id, name, description, location) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Cafe Mocha', 'A cozy place for coffee lovers', '123 Coffee St.'),
('550e8400-e29b-41d4-a716-446655440001', 'Java House', 'Best espresso in town', '456 Java Ave.'),
('550e8400-e29b-41d4-a716-446655440002', 'Brewed Awakenings', 'Wake up with our fresh brews', '789 Brew Blvd.'),
('550e8400-e29b-41d4-a716-446655440003', 'Cafe Latte', 'Delicious lattes and pastries', '101 Latte Ln.'),
('550e8400-e29b-41d4-a716-446655440004', 'Espresso Express', 'Quick and tasty espresso', '202 Espresso Rd.');

-- Seed data for employee table
INSERT INTO employee (id, name, email_address, phone_number, gender, start_date, cafe_id) VALUES
('UI12345678', 'John Doe', 'john.doe@example.com', '123-456-7890', 'male', '2023-01-01', '550e8400-e29b-41d4-a716-446655440000'),
('UI23456789', 'Jane Smith', 'jane.smith@example.com', '234-567-8901', 'female', '2023-02-01', '550e8400-e29b-41d4-a716-446655440001'),
('UI34567890', 'Alice Johnson', 'alice.johnson@example.com', '345-678-9012', 'female', '2023-03-01', '550e8400-e29b-41d4-a716-446655440002'),
('UI45678901', 'Bob Brown', 'bob.brown@example.com', '456-789-0123', 'male', '2023-04-01', '550e8400-e29b-41d4-a716-446655440003'),
('UI56789012', 'Charlie Davis', 'charlie.davis@example.com', '567-890-1234', 'male', '2023-05-01', '550e8400-e29b-41d4-a716-446655440004');