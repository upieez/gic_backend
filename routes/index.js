const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { calculateDaysInCafe } = require("../utils");

router.get("/cafes", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const locationQuery = req.query.location;

  db.all(
    `
    SELECT cafe.*, employee.id AS employee_id, employee.name AS employee_name, employee.email_address 
    FROM cafe 
    LEFT JOIN employee ON cafe.id = employee.cafe_id
  `,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const cafes = {};
      rows.forEach((row) => {
        if (!cafes[row.id]) {
          cafes[row.id] = {
            id: row.id,
            name: row.name,
            description: row.description,
            location: row.location,
            logo: row.logo,
            employees: [],
          };
        }
        if (row.employee_id) {
          cafes[row.id].employees.push({
            id: row.employee_id,
            name: row.employee_name,
            email_address: row.email_address,
          });
        }
      });

      res.json(Object.values(cafes));
    }
  );
});

router.get("/cafes/:id", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const id = req.params.id;

  db.get("SELECT * FROM cafe WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Cafe not found" });
      return;
    }

    res.json(row);
  });
});

router.get("/employees", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const cafeQuery = req.query.cafe;

  db.all(
    `
    SELECT employee.*, cafe.name AS cafe_name
    FROM employee
    LEFT JOIN cafe ON employee.cafe_id = cafe.id
  `,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const transformRows = rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email_address,
        phoneNumber: row.phone_number,
        gender: row.gender,
        startDate: row.start_date,
        daysInCafe: calculateDaysInCafe(row.start_date),
        cafeId: row.cafe_id,
        cafeName: row.cafe_name,
      }));

      res.json(transformRows);
    }
  );
});

router.post("/cafe", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const { name, description, location, logo } = req.body;
  const id = crypto.randomUUID();

  db.run(
    "INSERT INTO cafe (id, name, description, location) VALUES (?, ?, ?, ?)",
    [id, name, description, location],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({ message: "success" });
    }
  );
});

router.post("/employee", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const { name, email, phoneNumber, gender, cafeId } = req.body;
  const startDate = new Date().toLocaleDateString();
  const id = `UI${crypto.randomBytes(4).toString("hex")}`;

  db.run(
    "INSERT INTO employee (id, name, email_address, phone_number, gender, start_date, cafe_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, name, email, phoneNumber, gender, startDate, cafeId],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({ message: "success" });
    }
  );
});

router.put("/cafe/:id", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const { name, description, location, logo } = req.body;
  const id = req.params.id;

  db.run(
    "UPDATE cafe SET name = ?, description = ?, location = ? WHERE id = ?",
    [name, description, location, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({ message: "success" });
    }
  );
});

router.put("/employee/:id", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const { name, email_address, cafeId } = req.body;
  const id = req.params.id;

  db.run(
    "UPDATE employee SET name = ?, email_address = ?, cafe_id = ? WHERE id = ?",
    [name, email_address, cafeId, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({ message: "success" });
    }
  );
});

router.delete("/cafe/:id", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const id = req.params.id;

  db.run("DELETE FROM cafe WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({ message: "success" });
  });
});

router.delete("/employee/:id", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const id = req.params.id;

  db.run("DELETE FROM employee WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({ message: "success" });
  });
});

module.exports = router;
