const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String, // e.g., 'coupon', 'bank-transfer'
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "scanned"],
      default: "scanned",
    },
    reference: {
      type: String, // e.g., coupon code or transaction note
    },
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    approvedAt: {
      type: Date,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming admin is also stored in User collection
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Transaction" }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
Transaction.createIndexes();
module.exports = Transaction;
