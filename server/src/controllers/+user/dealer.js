const User = require("../../models/User");

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

module.exports = {
  getDealersLedger: getDealersLedger,
};
