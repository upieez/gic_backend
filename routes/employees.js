const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { calculateDaysInCafe } = require("../utils");

router.get("/", function (req, res, next) {
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

router.get("/:id", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const id = req.params.id;

  db.get("SELECT * FROM employee WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    const formatEmployee = {
      id: row.id,
      name: row.name,
      email: row.email_address,
      phoneNumber: row.phone_number,
      gender: row.gender,
      cafeId: row.cafe_id,
    };

    res.json(formatEmployee);
  });
});

router.post("/", function (req, res, next) {
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

router.put("/:id", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const { name, email, phoneNumber, gender, cafeId } = req.body;
  const id = req.params.id;

  db.run(
    "UPDATE employee SET name = ?, email_address = ?, phone_number = ?, gender = ?, cafe_id = ? WHERE id = ?",
    [name, email, phoneNumber, gender, cafeId, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({ message: "success" });
    }
  );
});

router.delete("/:id", function (req, res, next) {
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
