const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sqlite3 = require("sqlite3").verbose();

const indexRouter = require("./routes/index");

const app = express();
const db = new sqlite3.Database("cafe");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("db", db);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS cafe (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, location TEXT NOT NULL, logo BLOB)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS employee (id TEXT PRIMARY KEY, name TEXT NOT NULL, email_address TEXT NOT NULL, phone_number TEXT NOT NULL, gender TEXT NOT NULL, start_date TEXT NOT NULL, cafe_id INTEGER NOT NULL, FOREIGN KEY (cafe_id) REFERENCES cafe(id))"
  );
});

module.exports = app;
