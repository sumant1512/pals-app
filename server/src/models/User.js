const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
  },
  timestamp: {
    type: String,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
