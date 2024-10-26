CREATE TABLE IF NOT EXISTS cafe (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    logo BLOB
);

CREATE TABLE IF NOT EXISTS employee (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    email_address TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    gender TEXT CHECK( gender IN ('MALE', 'FEMALE') ) NOT NULL,
    start_date TEXT NOT NULL,
    cafe_id INTEGER NOT NULL,
    FOREIGN KEY (cafe_id) REFERENCES cafe(id)
);
