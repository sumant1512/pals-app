const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "redeemed", "expired"],
      default: "active",
    },
    qr: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    redeemedAt: { type: Date },
    redeemedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "Coupon" }
);

const Coupon = mongoose.model("Coupon", CouponSchema);
Coupon.createIndexes();
module.exports = Coupon;
