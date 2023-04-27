const mongoose = require("mongoose");
require("dotenv").config();

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, default: "Agent" },
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = { AdminModel };