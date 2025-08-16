const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    shop: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: null,
    },
    userType: {
      type: String,
      enum: ["Dealer", "Admin", "Painter"],
      default: "Dealer",
    },
    totalCredit: {
      type: Number,
      default: 0,
    },
    totalDebit: {
      type: Number,
      default: 0,
    },
    availableCredit: {
      type: Number,
      default: 0,
    },
    lockedCredit: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: String,
      required: true,
      default: Date.now,
    },
  },
  { collection: "User" }
);

const User = mongoose.model("User", UserSchema);
User.createIndexes();
module.exports = User;
