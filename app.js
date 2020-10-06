const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");
const fileRouter = require("./routes/file");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", fileRouter);

module.exports = app;