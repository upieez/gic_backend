INSERT INTO cafe (id, name, description, location) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Mochato', 'A cozy place for coffee lovers', 'Coffee St'),
('550e8400-e29b-41d4-a716-446655440001', 'Javanese', 'Best espresso in town', 'Java Ave'),
('550e8400-e29b-41d4-a716-446655440002', 'Awakenings', 'Wake up with our fresh brews', 'Brew Blvd'),
('550e8400-e29b-41d4-a716-446655440003', 'Latteie', 'Delicious lattes and pastries', 'Latte Ln'),
('550e8400-e29b-41d4-a716-446655440004', 'Espresso', 'Quick and tasty espresso', 'Espresso Rd');

-- Seed data for employee table
INSERT INTO employee (id, name, email_address, phone_number, gender, start_date, cafe_id) VALUES
('UI12a45b78', 'Johnny', 'john.doe@example.com', '91234567', 'male', '01/01/2024', '550e8400-e29b-41d4-a716-446655440000'),
('UI234b6c89', 'Smithy', 'jane.smith@example.com', '82345678', 'female', '02/02/2024', '550e8400-e29b-41d4-a716-446655440001'),
('UI3c567d90', 'Johnson', 'alice.johnson@example.com', '83457890', 'female', '03/03/2024', '550e8400-e29b-41d4-a716-446655440002'),
('UI456d89e1', 'Brownie', 'bob.brown@example.com', '98123456', 'male', '04/04/2024', '550e8400-e29b-41d4-a716-446655440003'),
('UI567f90e2', 'Charlie', 'charlie.davis@example.com', '88987654', 'male', '05/05/2024', '550e8400-e29b-41d4-a716-446655440004');