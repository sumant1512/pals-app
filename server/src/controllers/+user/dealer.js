const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

const getDealersLedger = async (req, res) => {
  try {
    const dealers = await User.find({ userType: "Dealer" }).select(
      "-otp -timestamp"
    );
    if (!dealers || dealers.length === 0) {
      return res.status(404).json({
        message: "No dealers found",
        status: false,
      });
    }

    return res.status(200).json({
      message: `Dealers ledger fetched successfully`,
      dealers: dealers,
      status: true,
    });
  } catch (error) {
    console.error("Error generating coupons:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

const decideRedeemRequest = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { decision } = req.body;
    const adminId = req.user.id;

    if (!["approve", "reject"].includes(decision)) {
      return res.status(400).json({
        success: false,
        message: "Invalid decision. Use 'approve' or 'reject'",
      });
    }

    const txn = await Transaction.findById(transactionId);
    if (!txn || txn.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Transaction not found or already processed",
      });
    }

    const user = await User.findById(txn.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (decision === "approve") {
      if (user.availableCredit < txn.amount) {
        return res.status(400).json({
          success: false,
          message: "User has insufficient available credit",
        });
      }

      user.availableCredit -= txn.amount;
      user.totalDebit += txn.amount;
      txn.status = "approved";
    } else {
      txn.status = "rejected";
    }

    txn.approvedAt = new Date();
    txn.approvedBy = adminId;

    await Promise.all([txn.save(), user.save()]);

    return res.status(200).json({
      success: true,
      message: `Redeem request ${decision}d successfully`,
    });
  } catch (error) {
    console.error("Error in redeem request decision:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getDealersLedger: getDealersLedger,
  decideRedeemRequest: decideRedeemRequest,
};
