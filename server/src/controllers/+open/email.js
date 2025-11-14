const { sendContactUsEmail } = require("./../../utils/email");

const contactUs = async (req, res, next) => {
  const { name, email, phone, message } = req.body;
  console.log(req.body);

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required.", status: false });
  }

  try {
    await sendContactUsEmail(
      "Customer wants to connect - PALS PAINT",
      message +
        "<br/> Contact Details: <br/> Name: " +
        name +
        "<br/> Email: " +
        email +
        "<br/> Phone: " +
        phone
    );
    return res.json({
      message: "Our team will get back to you in 24 hours.",
      status: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  contactUs: contactUs,
};
