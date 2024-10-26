const express = require("express");
const router = express.Router();
const crypto = require("crypto");

router.get("/cafes", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const locationQuery = req.query.location;

  db.get("SELECT * FROM cafe", locationQuery, (err, row) => {
    res.json({ testing: "wow", location: locationQuery });
  });
});

router.get("/employees", function (req, res, next) {
  /** @type {(import("sqlite3").Database)} */
  const db = req.app.get("db");

  const cafeQuery = req.query.cafe;

  db.get("SELECT * FROM employee", locationQuery, (err, row) => {
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
