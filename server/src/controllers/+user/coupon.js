const QRCode = require("qrcode");
const Coupon = require("../../models/Coupon");
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

function generateRandomCode() {
  const prefix = "PP";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomPart = "";

  for (let i = 0; i < 8; i++) {
    randomPart += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return prefix + randomPart;
}

const generateCoupons = async (req, res) => {
  try {
    const { amount, count } = req.body;
    const expiresInDays = req.body.expiresInDays || 730; // Default to 2 years if not provided

    if (!amount || isNaN(amount)) {
      return res
        .status(400)
        .json({ message: "Valid amount is required", status: false });
    }

    if (!count || isNaN(count) || count < 1) {
      return res
        .status(400)
        .json({ message: "Valid count is required", status: false });
    }

    const coupons = [];

    for (let i = 0; i < count; i++) {
      const code = generateRandomCode();
      const expiresAt = expiresInDays
        ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
        : null;

      const qrPayload = code;
      const qrImageUrl = await QRCode.toDataURL(qrPayload);

      const coupon = await Coupon.create({
        code,
        amount,
        qr: qrImageUrl,
        expiresAt,
      });

      coupons.push({
        code: coupon.code,
        amount: coupon.amount,
        status: coupon.status,
        expiresAt: coupon.expiresAt,
        qr: qrImageUrl,
      });
    }

    return res.status(200).json({
      message: `${count} coupon(s) generated successfully`,
      coupons,
      status: true,
    });
  } catch (error) {
    console.error("Error generating coupons:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

const scanCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id; // Assuming user is authenticated

    // Find coupon
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res
        .status(404)
        .json({ message: "Coupon not found", status: false });
    }

    if (coupon.status === "redeemed") {
      return res
        .status(400)
        .json({ message: "Coupon already redeemed", status: false });
    }

    if (
      coupon.status === "expired" ||
      (coupon.expiresAt && coupon.expiresAt < Date.now())
    ) {
      // Mark as expired if it's past expiry
      coupon.status = "expired";
      await coupon.save();
      return res.status(400).json({ message: "Coupon expired", status: false });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found", status: false });

    // Update coupon status
    coupon.status = "redeemed";
    coupon.redeemedAt = new Date();
    coupon.redeemedBy = user._id;
    await coupon.save();

    // Update user credit
    user.totalCredit += coupon.amount;
    user.availableCredit += coupon.amount;
    await user.save();

    // Log the transaction
    await Transaction.create({
      userId: user._id,
      type: "credit",
      amount: coupon.amount,
      source: "coupon",
      reference: coupon.code,
      couponId: coupon._id, // linking for traceability
    });

    return res.status(200).json({
      message: "Coupon redeemed successfully",
      coupon: {
        amount: coupon.amount,
      },
      user: {
        availableCredit: user.availableCredit,
        totalCredit: user.totalCredit,
      },
      status: true,
    });
  } catch (error) {
    console.error("Error redeeming coupon:", error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

const redeemPoint = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
        status: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    if (user.availableCredit < amount || amount < 500) {
      return res.status(400).json({
        message: "Insufficient credit or amount below 2000",
        status: false,
      });
    }

    const transaction = await Transaction.create({
      userId: user._id,
      type: "debit",
      amount,
      status: "pending",
      source: "credit note",
      reference: `credit note`,
      createdAt: new Date(),
    });

    user.availableCredit -= amount;
    user.lockedCredit += amount;
    await user.save();

    return res.status(200).json({
      message: "Redeem request submitted successfully",
      transactionId: transaction._id,
      status: true,
    });
  } catch (error) {
    console.error("Error in redeemPointRequest:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

const getRedeemRequest = async (req, res) => {
  try {
    const rawTxns = await Transaction.find({
      type: "debit",
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .populate("userId", "_id name shop address");

    const transactions = rawTxns.map((txn) => ({
      ...txn.toObject(),
      userId: txn.userId?._id,
      name: txn.userId?.name,
      shop: txn.userId?.shop,
      address: txn.userId?.address,
    }));

    if (!transactions || transactions.length === 0) {
      return res.status(200).json({
        message: "No pending transactions found",
        transactions: [],
        status: false,
      });
    }

    return res.status(200).json({
      message: "Pending debit transactions fetched successfully",
      count: transactions.length,
      transactions,
      status: true,
    });
  } catch (error) {
    console.error("Error fetching redeem requests:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT middleware

    const transactions = await Transaction.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Transactions fetched successfully",
      count: transactions.length,
      transactions,
      status: true,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

const getUserTransactionsByAdmin = async (req, res) => {
  try {
    const userId = req.body.userId; // Extracted from JWT middleware

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .populate("approvedBy", "name");

    return res.status(200).json({
      message: "Transactions fetched successfully",
      count: transactions.length,
      transactions,
      status: true,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Coupons fetched successfully",
      count: coupons.length,
      coupons,
      status: true,
    });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

module.exports = {
  getCoupons: getCoupons,
  generateCoupons: generateCoupons,
  scanCoupon: scanCoupon,
  redeemPoint: redeemPoint,
  getRedeemRequest: getRedeemRequest,
  getUserTransactions: getUserTransactions,
  getUserTransactionsByAdmin: getUserTransactionsByAdmin,
};
