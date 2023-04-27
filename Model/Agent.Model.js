const mongoose = require("mongoose");
require("dotenv").config();

const AgentModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {type: Number,
    // unique: [true, 'Phone number already exists']
    // index: true,
    // min: 1000000000,
    // max: 9999999999,
    // required: true,
  },
  userType: { type: String, required: true, default: "Agent" },
});

const AgentModel = mongoose.model("Agent", AgentModelSchema);

module.exports = { AgentModel };