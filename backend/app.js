const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/db");
const routes = require("./routes/staticRoutes");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
