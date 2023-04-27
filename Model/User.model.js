const mongoose = require("mongoose");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lname: { type: String, required: true },
  userType: { type: String, required: true, default: "user" },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };