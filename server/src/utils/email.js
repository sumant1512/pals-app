require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.MAILER_CLIENT_ID;
const CLIENT_SECRET = process.env.MAILER_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // or your own redirect URI
const REFRESH_TOKEN = process.env.MAILER_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Create transporter function (dynamic access token)
async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    auth: {
      type: process.env.MAILER_AUTH_TYPE,
      user: process.env.MAILER_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token, // dynamic token
    },
  });
}

const sendOtpEmail = async (to, subject = "Login OTP - PALS PAINT", otp) => {
  const transporter = await createTransporter();

  const mailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #f5f5f5; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0;">🎨 PALS PAINT</h1>
        <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Adding Colors to Your World</p>
      </div>

      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 15px; color: #333; line-height: 1.6;">
        You are trying to log in to your <strong>PALS PAINT</strong> account.  
        Please use the following One-Time Password (OTP) to complete your login:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; background: #28a745; color: white; font-size: 22px; font-weight: bold; letter-spacing: 2px; padding: 12px 25px; border-radius: 6px;">
          ${otp}
        </div>
      </div>

      <p style="font-size: 14px; color: #666; line-height: 1.6; text-align: center;">
        <strong>Do not share this OTP</strong> with anyone for security reasons.
      </p>

      <p style="font-size: 14px; color: #333; margin-top: 25px;">
        Regards,<br/>
        <strong>Team PALS PAINT</strong>
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
      © 2023 PALS PAINT. All rights reserved.<br/>
        If this login attempt was not made by you, write us at palspaint923@gmail.com.
      </p>
    </div>
  `;

  try {
    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to,
      subject,
      html: mailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw error;
  }
};

const registrationConfirmationEmail = async (to, name) => {
  const transporter = await createTransporter();

  const mailSubject = "Registration Confirmation from PALS PAINT";
  const mailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #f5f5f5; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0;">🎨 PALS PAINT</h1>
        <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Adding Colors to Your World</p>
      </div>

      <p style="font-size: 16px; color: #333;">Hello <strong>${name}</strong>,</p>
      <p style="font-size: 15px; color: #333; line-height: 1.6;">
      You have been registered with <strong>PALS PAINT</strong>. We're excited to have you with us!.
      </p>

      <p style="font-size: 14px; color: #333; margin-top: 25px;">
        Regards,<br/>
        <strong>Team PALS PAINT</strong>
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
      © 2023 PALS PAINT. All rights reserved.<br/>
        If you didn’t request this, write us at palspaint923@gmail.com.
      </p>
    </div>
  `;

  try {
    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to,
      subject: mailSubject,
      html: mailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("❌ Error sending registration email:", error);
    throw error;
  }
};

module.exports = { sendOtpEmail, registrationConfirmationEmail };
