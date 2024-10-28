const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { calculateDaysInCafe } = require("../utils");

router.get("/", function (req, res, next) {
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

router.get("/:id", function (req, res, next) {
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

router.post("/", function (req, res, next) {
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

router.put("/:id", function (req, res, next) {
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

router.delete("/:id", function (req, res, next) {
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

module.exports = router;
