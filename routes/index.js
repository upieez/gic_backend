const express = require("express");
const router = express.Router();
const crypto = require("crypto");

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

router.get("/employees", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const cafeQuery = req.query.cafe;

  db.all("SELECT * FROM employee", cafeQuery, (err, row) => {
    res.json(row);
  });
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

  const { name, email_address, cafeId } = req.body;
  const id = `UI ${crypto.randomBytes(4).toString("hex")}`;

  db.run(
    "INSERT INTO employee (id, name, email_address, cafe_id) VALUES (?, ?, ?, ?)",
    [id, name, email_address, cafeId],
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
