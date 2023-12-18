const route = require("express").Router();
const nodemailer = require("nodemailer");
const Reminder = require("../Models/reminder.module");
const {
  createReminder,
  deleteReminder,
  getReminders,
  updateReminder,
} = require("../controllers/reminder.controller");

route.get("/allreminder", getReminders);
route.post("/addreminder", createReminder);
route.put("/updatereminder/:id", updateReminder);
route.delete("/deletereminder/:id", deleteReminder);
route.get("/email", (req, res) => {
  res.send("hello");
})

module.exports = route;
