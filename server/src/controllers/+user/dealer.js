const { registrationConfirmationEmail } = require("./../../utils/email");
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");
const generateOTP = require("../../utils/otp-generator");

const addDealer = async (req, res, next) => {
  const { userType, name, mobile, email, shop, address, pin, city, state } =
    req.body;
  const otp = generateOTP(6);
  const userId = req.user.id;

  if (!mobile || !name || !userId) {
    return res
      .status(400)
      .json({ message: "Mobile number and Name is required.", status: false });
  }

  try {
    // Searching user permissions
    const user = await User.findOne({ _id: userId });
    if (!user || user.userType !== "Admin") {
      return res.status(400).send({
        message: "You do not have the necessary permissions to add a dealer.",
        status: false,
      });
    }

    // Searching if user already exists
    const userForRegistration = await User.findOne({ mobile });
    if (userForRegistration) {
      return res.status(400).send({
        message: "User already registerd with this mobile number.",
        status: false,
      });
    }

    // Creating user in mongodb
    User.create({
      userType,
      name,
      mobile,
      email,
      shop,
      address,
      pin,
      city,
      state,
      otp,
    })
      .then(async (user) => {
        try {
          await registrationConfirmationEmail(email, name);
          return res.status(200).send({
            message: "User added successfully.",
            status: true,
          });
        } catch (err) {
          console.error(err);
          await User.findByIdAndDelete(user._id);

          if (err.code === "EAUTH") {
            return res
              .status(401)
              .json({ success: false, error: "Authentication failed" });
          }
          if (err.code === "ECONNECTION") {
            return res
              .status(503)
              .json({ success: false, error: "SMTP connection failed" });
          }
          return res.status(500).json({ success: false, error: error.message });
        }
      }) // returning repsonse
      .catch((err) => {
        console.log(err);
        return res.status(502).send({ message: err.toString(), status: false });
      }); // returning db error
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: ERROR_500, status: false });
  }
};

const getDealers = async (req, res) => {
  try {
    const dealers = await User.find({ userType: "Dealer" })
      .select("-otp") // exclude the OTP field
      .sort({ createdAt: -1 }); // optional: sort by latest first

    return res.status(200).json({
      message: "Dealer list fetched successfully.",
      status: true,
      count: dealers.length,
      dealers,
    });
  } catch (error) {
    console.error("Error fetching dealers:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching dealers.",
      status: false,
    });
  }
};

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
      if (user.lockedCredit < txn.amount) {
        return res.status(400).json({
          success: false,
          message: "User has insufficient available credit",
        });
      }

      user.totalDebit += txn.amount;
      user.lockedCredit -= txn.amount;
      txn.status = "approved";
    } else {
      user.availableCredit += txn.amount;
      user.lockedCredit -= txn.amount;
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
  addDealer: addDealer,
  getDealers: getDealers,
  getDealersLedger: getDealersLedger,
  decideRedeemRequest: decideRedeemRequest,
};
